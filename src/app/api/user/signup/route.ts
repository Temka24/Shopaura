import { NextRequest, NextResponse } from "next/server";
import User from "@/model/UserModel";
import connectToDatabase from "@/lib/mongodb";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs'
import path from "path";
import fs from 'fs'


export async function POST(req: NextRequest) {

    try {
        await connectToDatabase();

        const formData = await req.formData();
        const name = formData.get('name') as string;
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;
        const file = formData.get('image') as File;

        if (!name || !email || !password || !file) {
            return NextResponse.json({ msg: "All input required", status: false })
        }

        const existUser = await User.findOne({ email })
        if (existUser) {
            return NextResponse.json({ msg: "Already exist bro", status: false })
        }

        const hashedPassword = await bcrypt.hash(password, 10)
        const SecretKey = process.env.JWT_SECRET

        if (!SecretKey) {
            return NextResponse.json({ msg: "JWT SECRET Cannot find", status: false })
        }

        // Generate a unique filename and save path
        const fileName = `${Date.now()}-${file.name}`;
        const uploadPath = path.join(process.cwd(), 'public/profileImage', fileName);

        // Convert file to buffer
        const buffer = Buffer.from(await file.arrayBuffer());

        // Create directory if it doesn't exist
        const dir = path.dirname(uploadPath);
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }

        // Save the image file
        await fs.promises.writeFile(uploadPath, buffer);

        // Save product info in MongoDB
        const imageUrl = `/profileImage/${fileName}`;

        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            imageUrl: imageUrl
        })
        await newUser.save()

        const token = jwt.sign({ id: newUser._id }, SecretKey, { expiresIn: '1d' })
        return NextResponse.json({ msg: "Success signed up", user: { id: newUser._id, name: name, email: email, imageUrl: imageUrl }, token: token, status: true })
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