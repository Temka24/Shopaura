import nodemailer from 'nodemailer'
import { NextRequest, NextResponse } from 'next/server'


export async function POST(req: NextRequest) {

    try{
        const {name, email, message} = await req.json();

        if(!name || !email || !message){
            return NextResponse.json({mes: 'name email message is undefined'})
        }

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL, // Таны Gmail
                pass: process.env.EMAIL_PASSWORD // App Password (2FA идэвхтэй бол)
            }
        });

        const mailOptions = {
            from: email,
            to: process.env.EMAIL, // Өөрийн хүлээн авах имэйл
            subject: `Contact Us - ${name}`,
            text: `From: ${name} (${email})\n\nMessage:\n${message}`
        };

        await transporter.sendMail(mailOptions);
        return NextResponse.json({ mes: 'Email sent successfully!' })
    }catch(err){
        console.error(err)
        return NextResponse.json({mes: 'error bro '})
    }
}