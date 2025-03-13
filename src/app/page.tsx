"use client"
import React from "react";
import Image from "next/image";
import Button from '@mui/material/Button';
import Tilt from "react-parallax-tilt";
import HomeRepairServiceIcon from '@mui/icons-material/HomeRepairService';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import CachedIcon from '@mui/icons-material/Cached';
import CallIcon from '@mui/icons-material/Call';
import { green } from '@mui/material/colors';
import { useRouter } from "next/navigation";

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import { EffectCoverflow, Pagination } from 'swiper/modules';


const Home: React.FC = () => {

  const router = useRouter()

  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <div className="h-[500px] w-[100vw] rounded-b-[80px] backdrop-blur-sm bg-opacity-[0.10] bg-black flex flex-col gap-[35px] items-start pl-[8vw]">
          <div className="mt-[40px] text-[20px]">Best Quality Sneakers</div>
          <div className="flex flex-col text-[45px]">
            <p>Amazing Variety</p><p>Of Sneakers Starting</p><p>Just $50</p>
          </div>
          <Button
            variant="contained"
            onClick={() => router.push("/shop")}
            sx={{
              borderRadius: '20px',
              padding: '10px 30px', // py-[10px] ба px-[30px]
              fontWeight: 'bold',
              boxShadow: 'none',
              backgroundColor: '#d946ef',
              fontSize: '13px',
            }}
          >
            shop now
          </Button>
          <Tilt className="absolute right-[11vw] lg:mt-[-200px]" tiltMaxAngleX={10} tiltMaxAngleY={10} transitionSpeed={200} >
            <div className="cu:w-[40vw] lg:w-[35vw] cu:mt-[240px] lg:mt-[100px]">
              <Image
                src="/huhuh.png"
                alt="sneaker"
                height={300}
                width={300}
                className="w-full object-cover lg:mt-[250px] max-w-[400px]"
              />
            </div>
          </Tilt>
        </div>

        <div className="flex flex-row items-center justify-center gap-[5vw] mt-[70px] cu:px-[3vw]">
          <div className="flex flex-row items-center gap-[10px] justify-center">
            <HomeRepairServiceIcon sx={{ color: green[600], fontSize: 45 }} />
            <div className="flex flex-col items-center justify-center gap-[5px]">
              <span>Sneaker collection</span>
            </div>
          </div>
          <div className="flex flex-row items-center gap-[10px] justify-center">
            <LocalShippingIcon sx={{ color: green[600], fontSize: 45 }} />
            <div className="flex flex-col items-center justify-center gap-[5px]">
              <span>Free shipping</span>
            </div>
          </div>
          <div className="flex flex-row items-center gap-[10px] justify-center">
            <CachedIcon sx={{ color: green[600], fontSize: 45 }} />
            <div className="flex flex-col items-center justify-center gap-[5px]">
              <span>100% money back</span>
            </div>
          </div>
        </div>

        <div className="mt-[40px]">
          <Swiper
            effect={'coverflow'}
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={'auto'}
            coverflowEffect={{
              rotate: 50,
              stretch: 0,
              depth: 100,
              modifier: 1,
              slideShadows: true,
            }}
            pagination={true}
            modules={[EffectCoverflow, Pagination]}
            className="border border-violet-400 border-[20px] rounded-[20px] p-[20px]"
          >
            <SwiperSlide className="w-full">
              <div className="w-full w-[40vw]">
                <Image
                  src="/PosterImages/caVW.jpg"
                  alt="first"
                  height={200}
                  width={200}
                  className="object-center object-cover w-full"
                />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="w-full w-[40vw]">
                <Image
                  src="/PosterImages/images23.jpg"
                  alt="first"
                  height={200}
                  width={200}
                  className="object-center object-cover w-full h-auto"
                />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="w-full w-[40vw]">
                <Image
                  src="/PosterImages/kojo.jpg"
                  alt="first"
                  height={200}
                  width={200}
                  className="object-center object-cover w-full h-auto"
                />
              </div>
            </SwiperSlide>
          </Swiper>
        </div>

        <div className="mt-[50px] flex flex-col items-center justify-center gap-[20px] border-none rounded-[30px] p-[30px] mx-[15vw] shadow-[0_0_10px] shadow-sky-300 mb-[40px]">
          <div className="text-[30px]">Interested? This Shop Sneaker </div>
          <div className="text-[30px]">Collection</div>
          <p className="font-normal px-[15vw] text-center">
            I appreciate SpectaStyle commitment to sustainability. Their shoes are not only stylish but also environmentally friendly.
            It is great to support a brand that cares about the planet.
          </p>
          <Button
            variant="contained"
            onClick={() => router.push("/shop")}
            sx={{
              borderRadius: '20px',
              padding: '10px 30px', // py-[10px] ба px-[30px]
              fontWeight: 'bold',
              boxShadow: 'none',
              backgroundColor: '#d946ef',
              fontSize: '13px',
            }}
          >
            shop now
          </Button>
        </div>

        <div className="flex flex-row items-center justify-center gap-[10vw] px-[10vw] my-[100px]">
          <div className="flex flex-col items-start min-w-[15vw] gap-[20px]">
            <p>Need help in choosing the right plants?</p>
            <p className="text-pink-800 cursor-pointer" onClick={() => router.push("/contact")}><CallIcon /> Ask for help</p>
          </div>
          <div className="flex flex-col items-start ">
            <p className="font-normal mb-[10px] text-[15px]">Commodo sociosqu venenatis cras dolor sagittis integer luctus sem primis eget maecenas sedurna malesuada consectetuer.</p>
            <p className="font-normal text-[15px]">
              Ornare integer commodo mauris et ligula purus, praesent cubilia laboriosam viverra. Mattis id rhoncus. Integer lacus eu volutpat fusce.
              Elit etiam phasellus suscipit suscipit dapibus,
              condimentum tempor quis, turpis luctus dolor sapien vivamus.
            </p>
          </div>
        </div>

      </div>
    </>
  )
}

export default Home;