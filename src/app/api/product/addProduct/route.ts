import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Product from "@/model/ProductModel";
import path from "path";
import fs from "fs";

export async function POST(req: NextRequest) {

    try {
        await connectToDatabase();
        const formData = await req.formData();

        if (!formData) {
            return NextResponse.json({ msg: 'userId is required', status: false })
        }

        const productName = formData.get("productName") as string;
        const productPrice = parseFloat(formData.get("productPrice") as string);
        const description = formData.get("description") as string;
        const file = formData.get("productImage") as File;

        if (!productName || !productPrice || !description || !file) {
            return NextResponse.json({ msg: "All input required", status: false })
        }

        // Generate a unique filename and save path
        const fileName = `${Date.now()}-${file.name}`;
        const uploadPath = path.join(process.cwd(), 'public/productImage', fileName);

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
        const imageUrl = `/productImage/${fileName}`;

        const newProduct = new Product({
            name: productName,
            price: productPrice,
            description: description,
            productImage: imageUrl,
        })

        await newProduct.save();
        return NextResponse.json({ msg: 'Product saved success ', status: true})
    }
    catch (err: any) {
        console.log(err)
        return NextResponse.json({ msg: `It's catch error ${err}`, status: false })
    }

}