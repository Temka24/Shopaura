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

        if (isType == "add") {
            const exist = await currentUser.cardItems.find((item: ICardItems) => item.product.toString() === productId)
            if (exist) {
                return NextResponse.json({ msg: "Already existing", status: false })
            }

            const newProduct = { product: productId }
            currentUser.cardItems.push(newProduct)
            await currentUser.save()
            return NextResponse.json({ msg: "Success added", status: true })
        }
        else if (isType == "delete") {
            currentUser.cardItems = currentUser.cardItems.filter(
                (item: ICardItems) => item.product.toString() !== productId
            )
            await currentUser.save()
            return NextResponse.json({ msg: "Success deleted", status: true })
        }
    }
    catch (err: any) {
        return NextResponse.json({ msg: `Catch err in server ${err}` })
    }
}