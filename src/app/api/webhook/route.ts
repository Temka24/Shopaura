import { NextResponse, NextRequest } from "next/server";
import Stripe from "stripe";
import connectToDatabase from "@/lib/mongodb";
import Order from "@/model/OrderModel";
import User from "@/model/UserModel";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: "2025-01-27.acacia",
});

export async function POST(req: NextRequest) {
    const sig = req.headers.get("stripe-signature") as string;
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET as string;

    let event;

    try {
        const rawBody = await req.text();
        event = stripe.webhooks.constructEvent(rawBody, sig, webhookSecret);
    } 
    catch (err: unknown) {
        if (err instanceof Error) {
            console.error("Webhook signature verification failed.", err.message);
            return NextResponse.json({ msg: `It's catch error ${err}`, status: false })
        } else {
            console.log(err)
            return NextResponse.json({ msg: `It's unknown error ${err}`, status: false })
        }
    }

    if (event.type === "checkout.session.completed" || event.type === "payment_intent.succeeded") {
        const session = event.data.object as Stripe.Checkout.Session;

        if (!session.metadata) {
            console.error("Error metadata not found bro")
            return;
        }
        if (!session.metadata.orderId || !session.metadata.userId) {
            console.error("orderId or userId not found")
            return;
        }

        const orderId = session.metadata.orderId;
        const userId = session.metadata.userId;
        try {
            await connectToDatabase()

            const buyerOrder = await Order.findById(orderId)
            const currentUser = await User.findById(userId)

            currentUser.cardItems = [];
            await currentUser.save()

            buyerOrder.status = "success"
            await buyerOrder.save();

            console.log("Success Bro")
        }
        catch (err: unknown) {
            if (err instanceof Error) {
                console.error("Webhook failed.", err.message);
                return NextResponse.json({ msg: `It's catch error ${err}`, status: false })
            } else {
                console.log(err)
                return NextResponse.json({ msg: `It's unknown error ${err}`, status: false })
            }
        }
    }

    return NextResponse.json("Success", { status: 200 });
}
