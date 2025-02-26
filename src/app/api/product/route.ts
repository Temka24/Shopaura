import { NextResponse, NextRequest } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Product from "@/model/ProductModel";

export async function GET(req: NextRequest) {

    try {
        await connectToDatabase()
        const products = await Product.find()
        if (!products) {
            return NextResponse.json({ msg: "Product not find", status: false, products: [] })
        }
        return NextResponse.json({ msg: "Success product fetched", status: true, products: products })

    }
    catch (err: any) {
        console.log(err)
        return NextResponse.json({ msg: `Catch error ${err.message}`, status: false })
    }
}