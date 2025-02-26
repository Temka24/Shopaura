import { NextResponse, NextRequest } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Order from "@/model/OrderModel";

export async function GET(req: NextRequest) {

    try {
        await connectToDatabase()

        const currentOrders = await Order.find().populate({
            path: "items.product"
        })

        if (!currentOrders) {
            return NextResponse.json({ msg: "Order not found ", status: true, orders: [] })
        }

        return NextResponse.json({ msg: "Success to find all orders", orders: currentOrders, status: true })

    }
    catch (err: any) {
        console.error(err)
        return NextResponse.json({ msg: `catch error ${err.message}`, status: false })
    }
}