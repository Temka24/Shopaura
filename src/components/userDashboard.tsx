'use client'
import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import Image from 'next/image';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { UserDataType } from '@/types/userTypes';
import { IOrder } from '@/model/OrderModel';

import Button from '@mui/material/Button';
import LogoutIcon from '@mui/icons-material/Logout';
import CheckIcon from '@mui/icons-material/Check';
import Divider from '@mui/material/Divider';

interface MyProps {
    setIsAuthed: React.Dispatch<React.SetStateAction<boolean>>
}


const Dashboard: React.FC<MyProps> = ({ setIsAuthed }) => {

    const [userData, setUserData] = useState<UserDataType | null>(null)
    const [orders, setOrders] = useState<IOrder[] | null>(null)

    const router = useRouter()

    useEffect(() => {
        if (!localStorage.getItem('token')) {
            toast.error('Token is invalid')
            setIsAuthed(false)
            return;
        }
        const localFromData = localStorage.getItem("userData")

        if (localFromData) {
            setUserData(JSON.parse(localFromData))
        }
        else if (!localFromData) {
            toast.error("userdata connet find")
        }

    }, [])

    useEffect(() => {
        if (!userData) { return };

        const fetchOrders = async () => {
            try {
                const res = await axios.get(`/api/product/getOrderByUser?userId=${userData.id}`)

                console.log(res.data.orders)

                if (res.data.status) {
                    setOrders(res.data.orders)
                    toast.success(res.data.msg)
                }
                else if (!res.data.status) {
                    toast.error(res.data.msg)
                    console.log(res)
                }

            } catch (err: any) {
                toast.error(err.message)
            }
        }

        fetchOrders()

    }, [userData])

    useEffect(() => {
        if (!userData) { return };

        if (userData.isAdmin === "true") {
            router.push("/admin")
        }

    }, [userData, router])



    const handleLogOut = () => {
        toast.success(
            <div>
                <h2 className='text-[18px]'>Would you like to log out</h2>
                <div className='flex justify-center items-center mt-[20px] gap-[10px]'>
                    <Button
                        variant="contained"
                        endIcon={<CheckIcon />}
                        className='bg-blue-500 rounded-[20px]'
                        onClick={() => {
                            localStorage.clear();
                            setIsAuthed(false)
                        }}
                    />
                </div>
            </div>
        )
    }

    return (
        <>
            <div>
                <div className='flex justify-center items-center gap-[40px] flex-row mb-[50px]'>
                    <div className='w-[500px] flex justify-center items-center flex-col mt-[100px] gap-[10px]'>
                        <Image
                            height={200}
                            width={200}
                            alt='Okey'
                            src={userData?.imageUrl ? userData.imageUrl : "/logog.png"}
                            className='rounded-[50%] object-center aspect-square object-cover'
                        />
                        <h1 className='text-[20px]'>Username: {userData?.name}</h1>
                        <h1 className='text-[20px]'>Email: {userData?.email}</h1>
                        <Button
                            onClick={handleLogOut}
                            type='submit'
                            variant="contained"
                            endIcon={<LogoutIcon />}
                            className='bg-fuchsia-500 rounded-[20px] mt-[50px] px-[30px] py-[10px]'
                        >
                            Log out
                        </Button>
                    </div>
                </div>
                <Divider />
                <div className='flex flex-col items-center justify-center gap-[50px] mb-[100px]'>
                    <h1 className='text-[30px]'>Your Orders</h1>
                    {
                        (!orders) ? (
                            <Image
                                src="/vectorPos-removebg-preview.png"
                                alt='Not found'
                                height={300}
                                width={300}
                            />
                        ) : (
                            orders.map((order: any, index: any) =>
                                <div className='relative h-auto py-[40px] lg:w-[70vw] rounded-[30px] shadow-[0_0_10px] shadow-sky-300 flex flex-row items-center justify-center lg:gap-[10vw] cu:gap-[2vw] cu:p-[10px] lg:p-0 lg:py-[30px] cu:scale-[0.7] lg:scale-[1] cu:110vw' key={index}>
                                    <div className='flex flex-col items-start justify-center gap-[6px]'>
                                        <div>Country: <span className='font-normal'>{order.delivery.country}</span></div>
                                        <div>State: <span className='font-normal'>{order.delivery.state}</span></div>
                                        <div>City: <span className='font-normal'>{order.delivery.city}</span></div>
                                        <div>Address: <span className='font-normal'>{order.delivery.address}</span></div>
                                        <div>PostalCode: <span className='font-normal'>{order.delivery.postalCode}</span></div>
                                    </div>
                                    <div className='flex flex-col items-start justify-center gap-[10px]'>
                                        {
                                            order?.items?.map((item: any, index: any) =>
                                                <div key={index} className='flex flex-row items-center justify-center gap-[4vw]'>
                                                    <Image
                                                        src={item.product.productImage}
                                                        alt='product'
                                                        height={60}
                                                        width={60}
                                                        className="rounded-[50%] object-center aspect-square object-cover"
                                                    />
                                                    <div className='flex flex-col items-start justify-center gap-[5px]'>
                                                        <div>Name: {item.product.name}</div>
                                                        <div>Price: {item.product.price}$</div>
                                                    </div>
                                                    <div className='right-[5vw] absolute'>Quantity: {item.quantity}</div>
                                                </div>
                                            )
                                        }
                                    </div>
                                </div>
                            )
                        )
                    }
                </div>
            </div>
        </>
    )
}

export default Dashboard;