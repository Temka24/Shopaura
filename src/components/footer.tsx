"use client"
import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import FacebookIcon from '@mui/icons-material/Facebook';
import YouTubeIcon from '@mui/icons-material/YouTube';
import InstagramIcon from '@mui/icons-material/Instagram';
import XIcon from '@mui/icons-material/X';


const Footer: React.FC = () => {

    const router = useRouter()

    return (
        <>
            <div className="flex items-center justify-center lg:gap-[20vw] cu:gap-[13vw] pb-[50px] pt-0 backdrop-blur-lg bg-opacity-25 bg-black p-0 cu:px-[100px]">
                <div className="flex flex-col items-center justify-center gap-[20px] cu:scale-[0.7] lg:scale-[1]">
                    <Image
                        src="/logog.png"
                        alt="Logo"
                        height={100}
                        width={100}
                    />
                    <p className="text-[30px] text-slate-800">Shopaura</p>
                    <div className="flex gap-[10px] items-center justify-center">
                        <FacebookIcon />
                        <YouTubeIcon />
                        <InstagramIcon />
                        <XIcon />
                    </div>
                </div>
                <div className="flex flex-col items-start justify-center gap-[17px]">
                    <h1 className="text-[20px]">Quick Links</h1>
                    <div className="flex flex-col items-start justify-center gap-[10px] cursor-pointer font-normal text-[15px]">
                        <div onClick={() => router.push("/")}>Home</div>
                        <p onClick={() => router.push("/shop")}>Shop</p>
                        <p onClick={() => router.push("/about")}>About</p>
                        <p onClick={() => router.push("/contact")}>Contact</p>
                    </div>
                </div>
                <div className="flex flex-col items-center justify-center gap-[10px] font-normal cu:scale-[0.7] lg:scale-[1] lg:ml-[6vw] cu:ml-[-20vw]">
                    <h1 className="cu:text-[15px] text-nowrap">Powered by <span className="font-bold">Shopaura</span></h1>
                    <div className="text-nowrap">Copyright © 2025 Shopaura</div>
                </div>
            </div>
        </>
    )
}

export default Footer;