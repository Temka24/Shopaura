import { NextRequest, NextResponse } from "next/server";
import User from "@/model/UserModel";
import connectToDatabase from "@/lib/mongodb";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

export async function POST(req: NextRequest) {

    try {
        await connectToDatabase()
        const { email, password } = await req.json()

        if (!email || !password) {
            return NextResponse.json({ msg: "Email or pass envalid", status: false })
        }

        const currentUser = await User.findOne({ email });
        if (!currentUser) {
            return NextResponse.json({ msg: "User is not registered", status: false })
        }
        const isCorrect = await bcrypt.compare(password, currentUser.password)

        if (isCorrect) {
            const SecretKey = process.env.JWT_SECRET
            if (!SecretKey) {
                return NextResponse.json({ msg: "JWT secret cannt find", status: false })
            }
            const token = jwt.sign({ id: currentUser._id }, SecretKey, { expiresIn: '1d' })

            return NextResponse.json({ token: token, msg: "Login success", user: { id: currentUser._id, name: currentUser.name, email: currentUser.email, imageUrl: currentUser.imageUrl, isAdmin: currentUser.isAdmin }, status: true })
        }
        if (!isCorrect) {
            return NextResponse.json({ msg: "Password is not correct !", status: false })
        }
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