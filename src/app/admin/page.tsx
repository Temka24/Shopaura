'use client'
import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import Image from 'next/image';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { UserDataType } from '@/types/userTypes';
import { IOrderPopulated, IOrderItemPopulated } from '@/model/OrderModel';

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import LogoutIcon from '@mui/icons-material/Logout';
import CheckIcon from '@mui/icons-material/Check';
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Divider from '@mui/material/Divider';

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});



const Admin: React.FC = () => {

    const [userData, setUserData] = useState<UserDataType | null>(null)
    const [orders, setOrders] = useState<IOrderPopulated[] | null>(null)

    const [productName, setProductName] = useState<string>('')
    const [productPrice, setProductPrice] = useState('')
    const [description, setDescription] = useState<string>('')
    const [productImage, setProducImage] = useState<File | null>(null)

    const [previewImage, setPreviewImage] = useState<string | null>('')
    const [isLoading, setIsloading] = useState<boolean>(false)

    const router = useRouter()


    useEffect(() => {
        if (!localStorage.getItem('token')) {
            toast.error('Token is invalid')
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

        if (userData.isAdmin !== "true") {
            router.push("/account")
        }

    }, [userData, router])

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const res = await axios.get("/api/product/getOrderByAdmin")

                if (res.data.status) {
                    setOrders(res.data.orders)
                    toast.success(res.data.msg)
                }
                else if (!res.data.status) {
                    toast.error(res.data.msg)
                    console.log(res)
                }

            } catch (err: unknown) {
                if (err instanceof Error) {
                    toast.error(`catch err ${err.message}`)
                    console.error(err)
                } else {
                    toast.error("Unknown error occurred")
                    console.error("Unknown error:", err)
                }
            }
        }

        fetchOrders()
    }, [])

    const handleLogOut = () => {
        toast.success(
            <div>
                <h2 className='text-[18px]'>Would you like to log out</h2>
                <div className='flex justify-center items-center mt-[20px] gap-[10px]'>
                    <Button
                        variant="contained"
                        endIcon={<CheckIcon />}
                        sx={{
                            borderRadius: '20px',
                            padding: '10px 30px', // py-[10px] ба px-[30px]
                            fontWeight: 'bold',
                            boxShadow: 'none',
                            backgroundColor: '#d946ef',
                            fontSize: '13px',
                        }}
                        onClick={() => {
                            localStorage.clear();
                            router.push("/account")
                        }}
                    />
                </div>
            </div>
        )
    }

    const handleAddProduct = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsloading(true)

        const formData = new FormData()
        formData.append('productName', productName);
        formData.append('productPrice', productPrice);
        formData.append('description', description);
        if (productImage) {
            formData.append('productImage', productImage)
        }

        const response = await axios.post(`/api/product/addProduct`, formData)
        const data = response.data;
        setIsloading(false)

        if (data.status) {
            setProductName("")
            setProducImage(null)
            setProductPrice("")
            setDescription("")
            setPreviewImage(null)
            toast.success(data.msg)
        }
        else if (!data.status) {
            toast.error(data.msg)
        }
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setProducImage(e.target.files[0])
            const imageUrl = URL.createObjectURL(e.target.files[0])
            setPreviewImage(imageUrl)
        }
    }


    return (
        <>
            <div>
                <div className='flex justify-center items-center gap-[40px] flex-row'>
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
                            sx={{
                                borderRadius: '20px',
                                padding: '10px 30px', // py-[10px] ба px-[30px]
                                fontWeight: 'bold',
                                boxShadow: 'none',
                                backgroundColor: '#d946ef',
                                fontSize: '13px',
                            }}
                        >
                            Log out
                        </Button>
                    </div>

                    <div className='flex flex-col justify-center items-center gap-[30px]'>
                        <h2>Add a product</h2>
                        <form onSubmit={handleAddProduct} className='flex flex-col justify-center items-center gap-[6px] border border-black rounded-[10px] p-[20px]'>
                            <TextField
                                value={productName}
                                onChange={(e) => setProductName(e.target.value)}
                                label="ProductName" size="small" type="text"
                                required
                                sx={{
                                    '& .MuiFormLabel-asterisk': { display: 'none' },
                                    '& .MuiOutlinedInput-root': {
                                        '&.Mui-focused fieldset': {
                                            borderColor: 'purple',
                                        },
                                    },
                                    '& .MuiInputLabel-root.Mui-focused': {
                                        color: 'purple',
                                    },
                                    width: "200px",
                                }}
                            />
                            <TextField
                                value={productPrice}
                                onChange={(e) => setProductPrice(e.target.value)}
                                label="Price in USD" size="small" type="number"
                                required
                                sx={{
                                    '& .MuiFormLabel-asterisk': { display: 'none' },
                                    '& .MuiOutlinedInput-root': {
                                        '&.Mui-focused fieldset': {
                                            borderColor: 'purple',
                                        },
                                    },
                                    '& .MuiInputLabel-root.Mui-focused': {
                                        color: 'purple',
                                    },
                                    width: "200px",

                                }}
                            />
                            <textarea
                                cols={20}
                                onChange={(e) => setDescription(e.target.value)}
                                value={description}
                                className='bg-transparent border border-black rounded-[7px] focus:outline-none w-[200px] min-h-[140px] font-normal px-[10px] py-[5px] placeholder:text-center'
                                placeholder='Description'
                            />
                            {previewImage && (
                                <div className="mt-4">
                                    <Image
                                        src={previewImage}
                                        alt='preview'
                                        className='w-[30px] h-[30px] object-cover rounded-[50%]'
                                    />
                                </div>
                            )}
                            <Button
                                component="label"
                                role={undefined}
                                variant="contained"
                                tabIndex={-1}
                                startIcon={<CloudUploadIcon />}
                                sx={{
                                    borderRadius: '20px',
                                    padding: '10px 30px', // py-[10px] ба px-[30px]
                                    fontWeight: 'bold',
                                    boxShadow: 'none',
                                    backgroundColor: '#d946ef',
                                    fontSize: '13px',
                                }}
                            >
                                Image
                                <VisuallyHiddenInput
                                    type="file"
                                    onChange={handleFileChange}
                                    required
                                    multiple
                                />
                            </Button>
                            <Button
                                variant="contained"
                                type="submit"
                                sx={{
                                    borderRadius: '20px',
                                    padding: '10px 30px', // py-[10px] ба px-[30px]
                                    fontWeight: 'bold',
                                    boxShadow: 'none',
                                    backgroundColor: '#d946ef',
                                    fontSize: '13px',
                                }}
                                loading={isLoading}
                            >
                                Add product
                            </Button>
                        </form>
                    </div>
                </div>
                <Divider className='mt-[30px] px-[10vw] mb-[50px]' />
                <div className='flex flex-col items-center justify-center gap-[50px] mb-[100px]'>
                    <h1 className='text-[30px]'>Admin your delivery</h1>
                    {
                        (!orders) ? (
                            <Image
                                src="/vectorPos-removebg-preview.png"
                                alt='Not found'
                                height={300}
                                width={300}
                            />
                        ) : (
                            orders.map((order: IOrderPopulated, index: number) =>
                                <div className='relative h-auto py-[40px] w-[70vw] rounded-[30px] shadow-[0_0_10px] shadow-sky-300 flex flex-row items-center justify-center gap-[10vw]' key={index}>
                                    <div className='flex flex-col items-start justify-center gap-[6px]'>
                                        <div>Country: <span className='font-normal'>{order.delivery.country}</span></div>
                                        <div>State: <span className='font-normal'>{order.delivery.state}</span></div>
                                        <div>City: <span className='font-normal'>{order.delivery.city}</span></div>
                                        <div>Address: <span className='font-normal'>{order.delivery.address}</span></div>
                                        <div>PostalCode: <span className='font-normal'>{order.delivery.postalCode}</span></div>
                                    </div>
                                    <div className='flex flex-col items-start justify-center gap-[10px]'>
                                        {
                                            order?.items?.map((item: IOrderItemPopulated, index: number) =>
                                                
                                                <div key={index} className='flex flex-row items-center justify-center gap-[4vw]'>
                                                    <Image
                                                        src={item.product.productImage || "/vectorPos-removebg-preview.png"}
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

export default Admin;