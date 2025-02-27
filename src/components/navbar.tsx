'use client'
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCard } from './cardContext';
import Badge from '@mui/material/Badge';
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';
import StorefrontIcon from '@mui/icons-material/Storefront';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

const Navbar: React.FC = () => {

    const { card } = useCard()
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)
    const [isLargeWidth, setIsLargeWidth] = useState<boolean>(false)

    const checkSize = () => {
        if (window.innerWidth >= 1024) {
            setIsLargeWidth(true)
            setIsMenuOpen(true)
        }
        else {
            setIsLargeWidth(false)
        }
    }

    useEffect(() => {

        checkSize()

        window.addEventListener('resize', checkSize)

        return () => {
            window.removeEventListener('resize', checkSize)
        }

    }, [])

    return (
        <>

            <div>
                {
                    (isLargeWidth) ? (<></>) : (
                        (isMenuOpen) ? (
                            <span className=' fixed right-[-4vw] top-[-2vw] cursor-pointer z-[11]' onClick={() => setIsMenuOpen(!isMenuOpen)}><CloseIcon sx={{ fontSize: 40 }} className='absolute right-[50px] top-[30px] cursor-pointer' /></span>
                        ) : (
                            <span className=' fixed right-[-4vw] top-[-2vw] cursor-pointer z-[11]' onClick={() => setIsMenuOpen(!isMenuOpen)}><MenuIcon sx={{ fontSize: 40 }} className='absolute right-[50px] top-[30px] cursor-pointer' /></span>
                        )
                    )
                }
            </div>

            <div className={`flex lg:flex-row lg:h-[70px] flex-col items-center lg:gap-[10vw] gap-[20px] pt-[10px] backdrop-blur-lg bg-opacity-25 bg-black z-[10] fixed w-[100vw] top-0 ${(!isMenuOpen && !isLargeWidth) && ('ml-[100vw]')} duration-300 pb-[40px] lg:pb-0`}>

                <Link href="/" onClick={() => setIsMenuOpen(false)} className='flex flex-row ml-[10vw] items-center translate-x-[-4vw]'>
                    <Image
                        src='/logog.png'
                        height={70}
                        width={70}
                        alt='logo'
                    />
                    <span className='text-[18px] lg:font-bold font-normal'>Shopaura</span>
                </Link>
                <div className='flex lg:flex-row flex-col lg:gap-[5vw] gap-[10px] text-[16px] lg:items-center items-start'>
                    <Link href="/" onClick={() => setIsMenuOpen(false)}>Home</Link>
                    <Link href="/shop" onClick={() => setIsMenuOpen(false)}>Shop<StorefrontIcon color='secondary' /> </Link>
                    <Link href="/about" onClick={() => setIsMenuOpen(false)}>About us</Link>
                    <Link href="/contact" onClick={() => setIsMenuOpen(false)}>Contact us</Link>
                    <Link href='/account' onClick={() => setIsMenuOpen(false)}>My account</Link>
                    <Link href="/card" onClick={() => setIsMenuOpen(false)}>
                        <Badge badgeContent={card.length} color="primary">
                            <LocalGroceryStoreIcon color="secondary" />
                        </Badge>
                    </Link>
                </div>
            </div>
        </>
    )
}

export default Navbar;