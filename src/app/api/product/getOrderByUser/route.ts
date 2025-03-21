import { NextResponse, NextRequest } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Order from "@/model/OrderModel";
import mongoose from "mongoose";

export async function GET(req: NextRequest) {

    try {
        await connectToDatabase()
        const url = new URL(req.url)
        const userId = url.searchParams.get("userId") as string;

        if (!userId) {
            return NextResponse.json({ msg: "Params undefined", status: false })
        }

        const currentOrders = await Order.find({ "delivery.buyer": new mongoose.Types.ObjectId(userId), status: "success" }).populate({
            path: "items.product"
        });
 
        if (!currentOrders) {
            return NextResponse.json({ msg: "Order not found ", status: true, orders: [] })
        }

        return NextResponse.json({ msg: "success", orders: currentOrders, status: true })

    }
    catch (err: unknown) {
        if (err instanceof Error) {
            console.log(err)
            return NextResponse.json({ msg: `It's catch error ${err}`, status: false })
        } else {
            console.log(err)
            return NextResponse.json({ msg: `It's unknown error ${err}`, status: false })
        }
    }
}