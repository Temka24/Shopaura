import { NextRequest, NextResponse } from "next/server";
import User from "@/model/UserModel";
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
    } catch (err: unknown) {
        if (err instanceof Error) {
            console.log(err)
            return NextResponse.json({ msg: `It's catch error ${err}`, status: false })
        } else {
            console.log(err)
            return NextResponse.json({ msg: `It's unknown error ${err}`, status: false })
        }
    }
}

