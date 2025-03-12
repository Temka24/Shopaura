import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Product from "@/model/ProductModel";

export async function GET() {

    try {
        await connectToDatabase()
        const products = await Product.find()
        if (!products) {
            return NextResponse.json({ msg: "Product not find", status: false, products: [] })
        }
        return NextResponse.json({ msg: "Success product fetched", status: true, products: products })

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