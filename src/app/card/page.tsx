"use client"
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import axios from "axios";
import toast from "react-hot-toast";
import { useCard } from "@/components/cardContext";
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { UserDataType } from "@/types/userTypes";
import { CardType } from "@/types/userTypes";


const Card: React.FC = () => {

    const router = useRouter()
    const { card, removeFromCard, incrementQuantity, decrementQuantity } = useCard()
    const [removeBtnLoading, setRemoveBtnLoading] = useState<boolean>(false)

    const [cardItems, setCardItems] = useState<CardType[] | null>(null)
    const [userData, setUserData] = useState<UserDataType | null>(null)
    const [overAllPrice, setOverAllPrice] = useState<number>(0)

    useEffect(() => {
        if (!localStorage.getItem('token')) {
            toast.error('Token is invalid')
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
        if (card) {
            setCardItems(card)
            console.log(card)
        }
    }, [card])

    useEffect(() => {
        const newTotalPrice = cardItems?.reduce((acc, item) => acc + (item.product.price * item.quantity) as number, 0)
        setOverAllPrice(newTotalPrice as number)

    }, [cardItems])

    const handleIncrement = async (productId: string) => {

        try {
            const response = await axios.post("/api/user/card/incAndDec",
                { productId },
                {
                    params: {
                        userId: userData?.id,
                        isType: "inc"
                    }
                }
            )

            if (response.data.status) {
                toast.success(response.data.msg)
                incrementQuantity(productId)
            }
            else if (!response.data.status) {
                toast.error(response.data.msg)
            }
        }
        catch (err: unknown) {
            if (err instanceof Error) {
                toast.error(`catch err ${err.message}`)
                console.error(err)
            } else {
                toast.error("Unknown error occurred")
                console.error("Unknown error:", err)
            }
        }
    }

    const handleDecremet = async (productId: string) => {

        try {
            const response = await axios.post("/api/user/card/incAndDec",
                { productId },
                {
                    params: {
                        userId: userData?.id,
                        isType: "dec"
                    }
                }
            )

            if (response.data.status) {
                toast.success(response.data.msg)
                decrementQuantity(productId)
            }
            else if (!response.data.status) {
                toast.error(response.data.msg)
            }
        }
        catch (err: unknown) {
            if (err instanceof Error) {
                toast.error(`catch err ${err.message}`)
                console.error(err)
            } else {
                toast.error("Unknown error occurred")
                console.error("Unknown error:", err)
            }
        }

    }

    const handleRemove = async (productId: string) => {

        setRemoveBtnLoading(true)

        try {
            const res = await axios.post(`/api/user/card/addAndDeleteToCard`,
                { productId },
                {
                    params: {
                        userId: userData?.id,
                        isType: "delete"
                    }
                }
            )
            if (res.data.status) {
                toast.success(res.data.msg)
            }
            else if (!res.data.status) {
                toast.error(res.data.msg)
            }
        }
        catch (err: unknown) {
            if (err instanceof Error) {
                toast.error(`catch err ${err.message}`)
                console.error(err)
            } else {
                toast.error("Unknown error occurred")
                console.error("Unknown error:", err)
            }
        }

        removeFromCard(productId)
        setRemoveBtnLoading(false)

    }


    return (
        <>
            <div className="min-h-[100vh]">
                <h1 className="text-[40px] text-center mt-[40px] font-black mb-[60px]">Card</h1>
                <div className="flex flex-col items-center justify-center gap-[40px]">
                    {
                        (!cardItems || cardItems.length === 0) ? (
                            <div className="flex flex-col items-center justify-center">
                                <Image
                                    src="/vectorPos-removebg-preview.png"
                                    alt="Card illustrator"
                                    height={400}
                                    width={400}
                                />
                                <div className="text-[25px] mt-[20px] font-medium">
                                    Items not found
                                </div>
                                <Button
                                    variant="contained"
                                    sx={{
                                        borderRadius: '20px',
                                        padding: '10px 30px', // py-[10px] ба px-[30px]
                                        fontWeight: 'bold',
                                        boxShadow: 'none',
                                        backgroundColor: '#d946ef',
                                        fontSize: '13px',
                                    }}
                                    onClick={() => router.push("/shop")}
                                >
                                    Go to Shop
                                </Button>
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center gap-[40px]">
                                {
                                    cardItems.map((item: CardType, index) =>
                                        <div key={index} className="flex flex-row items-center justify-start gap-[10vw] rounded-[20px] py-[30px] px-[4vw] shadow-[0_0_10px] shadow-sky-300">
                                            <Image
                                                src={item.product.productImage}
                                                alt="cardItem"
                                                height={200}
                                                width={200}
                                                className="rounded-[50%] object-center aspect-square object-cover ml-[100px]"
                                            />
                                            <div className="flex flex-col items-start justify-center gap-[30px]">
                                                <div>Name: {item.product.name}</div>
                                                <div>Price: {item.product.price}$</div>
                                                <Button
                                                    variant="contained"
                                                    sx={{
                                                        borderRadius: '20px',
                                                        padding: '10px 30px', // py-[10px] ба px-[30px]
                                                        fontWeight: 'bold',
                                                        boxShadow: 'none',
                                                        backgroundColor: '#d946ef',
                                                        fontSize: '13px',
                                                    }}
                                                    onClick={() => handleRemove(item.product._id as string)}
                                                    loading={removeBtnLoading}
                                                >
                                                    Remove
                                                </Button>
                                            </div>
                                            <div>
                                                <div>Total price: {item.product.price * item.quantity}$</div>
                                                <div className="flex flex-row justify-center items-center gap-[20px] mt-[30px]">
                                                    <span onClick={() => handleIncrement(item.product._id as string)} className="cursor-pointer">
                                                        <AddIcon sx={{ fontSize: 40 }} />
                                                    </span>
                                                    <span className="bg-purple-600 text-center px-[15px] py-[6px] text-[25px] rounded-[10px]">{item.quantity}</span>
                                                    <span onClick={() => handleDecremet(item.product._id as string)}
                                                        className="cursor-pointer">
                                                        <RemoveIcon sx={{ fontSize: 40 }} />
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                }
                                <div className="ml-[60vw] rounded-[20px] py-[10px] px-[20px] bg-violet-500 shadow-[0_0_4px] shadow-sky-300"><span className="font-normal">OverAll: </span>{overAllPrice}$</div>
                                <Button
                                    variant="contained"
                                    sx={{
                                        borderRadius: '20px',
                                        padding: '10px 30px', // py-[10px] ба px-[30px]
                                        fontWeight: 'bold',
                                        boxShadow: 'none',
                                        backgroundColor: '#d946ef',
                                        fontSize: '13px',
                                    }}
                                    onClick={() => router.push("/card/checkout")}
                                >
                                    Buy
                                </Button>
                            </div>
                        )
                    }
                </div>
            </div >
        </>
    )
}

export default Card;