import { NextRequest, NextResponse } from "next/server";
import User from "@/model/UserModel";
import Product from "@/model/ProductModel";
import connectToDatabase from "@/lib/mongodb";

export async function GET(req: NextRequest) {

    try {
        await connectToDatabase();
        const url = new URL(req.url);
        const userId = url.searchParams.get("userId") as string
        if (!userId) {
            return NextResponse.json({ msg: "UserID not found", status: false })
        }

        const currentUser = await User.findById(userId).populate({
            path: "cardItems.product"
        })

        if (!currentUser) {
            return NextResponse.json({ msg: "User not found", status: false })
        }
        const items = currentUser.cardItems;
        if (!items) {
            return NextResponse.json({ msg: "Item not found", status: false })
        }

        return NextResponse.json({ msg: 'Success', status: true, items: items })
    } catch (err: any) {
        console.log(err)
        return NextResponse.json({ msg: `Catch err ${err}` })
    }
}

