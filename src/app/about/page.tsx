"use client"
import React from "react";
import Image from "next/image";
import Button from '@mui/material/Button';
import { useRouter } from "next/navigation";

const About: React.FC = () => {

    const router = useRouter()

    return (
        <>
            <div>
                <div className="w-[100vw] h-[300px] backdrop-blur-sm bg-opacity-[0.10] bg-black rounded-b-[80px] pt-[100px] relative">
                    <div className="text-[60px] ml-[15vw] mt-[50px]">About Us</div>
                    <div className="w-[50vw] max-w-[500px] max-h-[500px]">
                        <Image
                            src="/shop_as-removebg-preview.png"
                            height={400}
                            width={500}
                            alt="notebook"
                            className="lg:absolute lg:right-0 top-[-250px] left-[60vw] cu:ml-[-20vw] w-full h-auto object-cover cu:relative"
                        />
                    </div>
                </div>

                <div className="flex flex-row gap-[4vw] items-start justify-center px-[10vw] pt-[80px]">
                    <div className="text-[28px] min-w-[25vw] cu:text-[24px]">We Work Hard To Provide You The Best Quality Sneakers</div>
                    <div className="flex flex-col gap-[30px] items-center">
                        <div className="text-[15px] font-normal">
                            Welcome to our premium e-commerce shoe haven! Discover stylish and comfortable footwear,
                            showcasing the latest trends and timeless classics. From casual kicks to elegant heels,
                            find your perfect pair and step into fashion-forward confidence with us.
                        </div>
                        <Button onClick={() => router.push("/contact")} variant="contained" className="rounded-[20px] px-[30px] py-[10px] font-bold shadow-none bg-fuchsia-500 text-[13px]">
                            contact us
                        </Button>
                    </div>
                </div>

                <div className="pt-[100px] flex flex-col items-center justify-center gap-[30px]">
                    <div className="text-[30px] text-center">Our Company</div>
                    <div className="w-[45vw] font-normal text-[15px]">
                        I am text block. Click edit button to change this text. Lorem ipsum dolor sit amet,
                        consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar
                        dapibus leo, when an unknown printer took a galley.
                    </div>
                    <Image
                        src="/bg4-free-img.jpg"
                        alt="happy"
                        width={1000}
                        height={600}
                        className="my-[30px] rounded-[30px] w-[80vw] h-auto"
                    />
                </div>

                <div className="flex flex-col gap-[30px] items-center justify-center my-[70px] ">
                    <div className="text-center text-[25px]">
                        Interested? Shop This Sneakers <br /> Collection!
                    </div>
                    <div className="w-[60vw] font-normal">
                        Our commitment to excellence drives us to innovate continuously, ensuring every pair of shoes we offer is a testament to quality,
                        style, and durability.
                        Join us on our remarkable shoe journey as we strive to make every step you take a stylish and comfortable one
                    </div>
                    <Button onClick={() => router.push("/shop")} variant="contained" className="rounded-[20px] px-[30px] py-[10px] font-bold shadow-none bg-fuchsia-500 text-[13px]">
                        shop now
                    </Button>
                </div>
            </div>
        </>
    )
}

export default About;