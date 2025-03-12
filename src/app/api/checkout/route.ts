import { NextResponse, NextRequest } from "next/server";
import Stripe from "stripe";
import connectToDatabase from "@/lib/mongodb";
import Order from "@/model/OrderModel";
import { CardType } from "@/types/userTypes";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: "2025-01-27.acacia",
});

export async function POST(req: NextRequest) {
    const { userId, cardItems, delivery } = await req.json();

    if (!userId || !cardItems || !delivery) {
        throw new Error("input is failed")
    }
    try {
        await connectToDatabase()

        const newOrder = new Order({
            items: cardItems.map((item: CardType) => {
                return {
                    product: item.product._id,
                    quantity: item.quantity
                }
            }),
            delivery: {
                buyer: userId,
                country: delivery.country,
                state: delivery.state,
                city: delivery.city,
                address: delivery.address,
                postalCode: delivery.postalCode
            }
        })

        await newOrder.save()

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            mode: "payment",
            success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success`,
            cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/cancel`,
            metadata: {
                orderId: String(newOrder._id),
                userId: String(userId)
            },
            line_items: cardItems.map((item: CardType) => ({
                price_data: {
                    currency: "usd",
                    product_data: {
                        name: item.product.name,
                    },
                    unit_amount: item.product.price * 100,
                },
                quantity: item.quantity,
            })),
        });

        return NextResponse.json({ url: session.url });
    } catch (error) {
        console.error("Error creating Stripe session:", error);
        return new NextResponse("Error", { status: 500 });
    }
}

