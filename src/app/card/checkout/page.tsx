'use client'
import React, { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import axios from "axios";
import toast from "react-hot-toast";
import { UserDataType, CardType } from "@/types/userTypes";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string);

const Checkout: React.FC = () => {

    const [delivery, setDelivery] = useState<{ country: string, state: string; city: string, address: string; postalCode: string }>({ country: "", state: "", city: "", address: "", postalCode: "" })
    const [userData, setUserData] = useState<UserDataType | null>(null)
    const [cardItems, setCardItems] = useState<CardType[] | null>(null)
    const [btnLoading, setBtnLoading] = useState<boolean>(false)

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
        const fetchData = async () => {
            try {
                if (!userData) { return }
                const response = await axios.get(`/api/user/card?userId=${userData.id}`);
                if (!response) {
                    toast.error("Error to fetch")
                }
                if (response.data.status) {
                    setCardItems(response.data.items)
                    toast.success(response.data.msg)
                    console.log(response.data)
                }
                else if (!response.data.status) {
                    toast.error(response.data.msg)
                    console.log(response)
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

        fetchData()
    }, [userData])


    const handleCheckout = async (e: React.FormEvent) => {
        e.preventDefault()

        setBtnLoading(true)
        try {
            // Төлбөрийн мэдээлэл (cardItems болон address)-ийг сервер руу илгээж, session үүсгэх

            const res = await axios.post("/api/checkout", { userId: userData?.id, cardItems, delivery });

            // Stripe-ийг ачаалахад алдаа гарах магадлалтай, заавал ачаалагдсан эсэхийг шалгах
            const stripe = await stripePromise;
            if (!stripe) {
                toast.error("This is no stripe")
            }

            // Stripe checkout руу шилжих
            if (!res.data.url) {
                toast.error("Stripe session.url is empty")
            }

            setBtnLoading(false)
            window.location.href = res.data.url;

        } catch (err: unknown) {
            if (err instanceof Error) {
                toast.error(`catch err ${err.message}`)
                console.error(err)
            } else {
                toast.error("Unknown error occurred")
                console.error("Unknown error:", err)
            }
        }
        finally {
            setBtnLoading(false)
        }
    };


    return (
        <>
            <div className="flex items-center justify-center flex-col">
                <h1 className="text-[30px] mt-[20px]">Place order and checkout</h1>
                <form onSubmit={handleCheckout} className="backdrop-blur-sm bg-opacity-25 bg-black flex flex-col items-center justify-center p-[40px] gap-[20px] rounded-[20px] my-[40px]">
                    <TextField
                        value={delivery.country}
                        onChange={(e) => setDelivery({ ...delivery, country: e.target.value })}
                        label="Country" size="small"
                        required
                        sx={{ '& .MuiFormLabel-asterisk': { display: 'none' }, width: "30vw" }}
                    />
                    <TextField
                        value={delivery.state}
                        onChange={(e) => setDelivery({ ...delivery, state: e.target.value })}
                        label="State" size="small"
                        required
                        sx={{ '& .MuiFormLabel-asterisk': { display: 'none' }, width: "30vw" }}
                    />
                    <TextField
                        value={delivery.city}
                        onChange={(e) => setDelivery({ ...delivery, city: e.target.value })}
                        label="City" size="small"
                        required
                        sx={{ '& .MuiFormLabel-asterisk': { display: 'none' }, width: "30vw" }}
                    />
                    <TextField
                        value={delivery.address}
                        onChange={(e) => setDelivery({ ...delivery, address: e.target.value })}
                        label="Address" size="small"
                        required
                        sx={{ '& .MuiFormLabel-asterisk': { display: 'none' }, width: "30vw" }}
                    />
                    <TextField
                        value={delivery.postalCode}
                        onChange={(e) => setDelivery({ ...delivery, postalCode: e.target.value })}
                        label="PostalCode" size="small" type="number"
                        required
                        sx={{ '& .MuiFormLabel-asterisk': { display: 'none' }, width: "30vw" }}
                    />
                    <Button
                        variant="contained"
                        className="rounded-[20px] px-[30px] py-[10px] font-bold shadow-none bg-fuchsia-500 text-[13px] w-[170px] mt-[10px]"
                        type="submit"
                        loading={btnLoading}
                    >
                        Checkout
                    </Button>
                </form>
            </div>
        </>
    )
}

export default Checkout;