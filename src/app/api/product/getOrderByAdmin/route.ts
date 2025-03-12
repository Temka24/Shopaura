import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Order from "@/model/OrderModel";

export async function GET() {

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