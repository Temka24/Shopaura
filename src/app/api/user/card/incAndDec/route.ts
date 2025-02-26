import { NextResponse, NextRequest } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import User from "@/model/UserModel";
import { ICardItems } from "@/model/UserModel";


export async function POST(req: NextRequest) {

    try {
        await connectToDatabase()
        const url = new URL(req.url)
        const userId = url.searchParams.get("userId") as string;
        const isType = url.searchParams.get("isType") as string;
        const { productId } = await req.json()
        if (!userId || !isType || !productId) {
            return NextResponse.json({ msg: "Params undefined", status: false })
        }

        const currentUser = await User.findById(userId)
        if (!currentUser) {
            return NextResponse.json({ msg: "User not find", status: false })
        }

        if (isType === "inc") {
            currentUser.cardItems.forEach((item: ICardItems) => {
                if (item.product.toString() === productId) {
                    item.quantity += 1;
                }
            })
            await currentUser.save()
            return NextResponse.json({ msg: "Success to increase", status: true })
        }
        else if (isType === "dec") {
            currentUser.cardItems.forEach((item: ICardItems) => {
                if (item.product.toString() === productId && item.quantity > 1) {
                    item.quantity -= 1;
                }
            })
            await currentUser.save()
            return NextResponse.json({ msg: "Success to decrease", status: true })
        }

    }
    catch (err: any) {
        return NextResponse.json({ msg: `Catch error ${err.message}`, status: false })
    }
}