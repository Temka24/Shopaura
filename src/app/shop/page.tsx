"use client"
import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Image from "next/image";
import { useCard } from "@/components/cardContext";

import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import { Slider } from "@mui/material";
import Button from '@mui/material/Button';


const Shop: React.FC = () => {

    const { addToCard, card, setCard } = useCard()

    const [products, setProducts] = useState<any[]>([])
    const [userData, setUserData] = useState<any>(null)
    const [slectedProduct, setSlectedProduct] = useState<any>(null)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [cardButtonLoading, setCardButtonLoading] = useState<boolean>(false)


    const [maxPrice, setMaxPrice] = useState<any>(null)
    const [minPrice, setMinPrice] = useState<any>(null)
    const [rangeVal, setRangeVal] = useState<number[]>([0, 10])
    const [sortPrice, setSortPrice] = useState<string>("")
    const [sortDate, setSortDate] = useState<string>("")
    const [searchText, setSearchText] = useState<string>("")



    useEffect(() => {
        const fetchProduct = async () => {
            setIsLoading(true)
            try {
                const response = await axios.get("/api/product")

                if (response.data.status) {
                    setProducts(response.data.products)
                    toast.success(response.data.msg)
                }
                else if (!response.data.status) {
                    toast.error(response.data.msg)
                }
            }
            catch (err: any) {
                toast.error(`Catch error ${err.message}`)
            }

            setIsLoading(false)
        }

        fetchProduct()
    }, [])

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
    
        if (!userData) {
            return;
        }
    
        const fillCard = async () => {
            try {
                const response = await axios.get(`/api/user/card?userId=${userData.id}`);
                if (response.data.status) {
                    toast.success(response.data.msg)
                    setCard(response.data.items)
                }
                else if (!response.data.status) {
                    toast.error(response.data.msg)
                    console.error(response.data)
                }
    
            } catch (err: any) {
                console.error(err)
            }
        }
    
        fillCard()
    
    }, [userData])

    useEffect(() => {
        if (!products) { return }

        var Allprices: any[] = [];
        products.forEach((product) => Allprices.push(product.price))

        var newMax = Math.max(...Allprices as number[])
        var newMin = Math.min(...Allprices as number[])

        setMinPrice(newMin)
        setMaxPrice(newMax)
        setRangeVal([newMin, newMax])
        
        console.log(card)

    }, [products])

    const handleChangeRange = (event: Event, newValue: number | number[]) => {
        setRangeVal(newValue as number[])
    }

    const filterProducts = () => {

        var filtered = products.filter((product) => (product.price >= rangeVal[0] && product.price <= rangeVal[1]));

        if (searchText) {
            filtered = filtered.filter((item) => item.name?.toLowerCase().includes(searchText.toLowerCase()))
        }

        if (sortDate) {
            filtered = filtered.sort((a, b) => {
                if (sortDate === "Oldest to Newest") {
                    return Number(new Date(a.createdAt)) - Number(new Date(b.createdAt))
                }
                else if (sortDate === "Newest to Oldest") {
                    return Number(new Date(b.createdAt)) - Number(new Date(a.createdAt))
                }
                return 0;
            })
        }

        if (sortPrice) {
            filtered = filtered.sort((a, b) => {
                if (sortPrice === "High to Low") {
                    return b.price - a.price
                }
                else if (sortPrice === "Low to High") {
                    return a.price - b.price
                }
                return 0;
            })
        }

        return filtered;
    }

    const handleAddToCard = async () => {
        setCardButtonLoading(true)
        try {
            const res = await axios.post(`/api/user/card/addAndDeleteToCard`,
                { productId: slectedProduct._id },
                {
                    params: {
                        userId: userData.id,
                        isType: "add"
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
        catch (err: any) {
            toast.error(`Catch error ${err.message}`)
            console.log(err)
        }
        setCardButtonLoading(false)

        addToCard(slectedProduct)
        setSlectedProduct(null)
    }



    return (
        <>
            <div className="flex flex-col items-center justify-center pb-[100px]">
                <h1 className="text-[35px] mt-[40px]">Products</h1>
                <div className="flex flex-row items-center justify-center mt-[30px] gap-[5vw] cu:scale-[0.7] lg:scale-[1] cu:gap-[2vw]">
                    <div className="flex flex-col mt-[20px]">
                        <h1 className="text-center font-[500]">Price range</h1>
                        <Slider
                            value={rangeVal}
                            onChange={handleChangeRange}
                            valueLabelDisplay="auto"
                            min={minPrice}
                            max={maxPrice}
                            sx={{
                                width: "300px"
                            }}
                            className="lg:scale-[1] cu:scale-[0.7]"
                        />
                        <div className="flex flex-row items-center justify-center gap-[278px] ml-[-5px]"><p>{minPrice}$</p><p>{maxPrice}$</p></div>
                    </div>
                    <SearchIcon className="absolute lg:ml-[120px] mt-[3px] cu:ml-[80px]"/>
                    <input
                        type="search"
                        className="focus:outline-none border border-black bg-transparent rounded-[10px] h-[30px] w-[300px] px-[5px] py-[4px] pl-[40px] placeholder:text-gray-600"
                        placeholder="Search..."
                        onChange={(e) => setSearchText(e.target.value)}
                    />
                </div>
                <div>
                    <FormControl variant="filled" sx={{ m: 1, minWidth: 220 }}>
                        <InputLabel id="demo-simple-select-filled-label">Sort by Price</InputLabel>
                        <Select
                            labelId="demo-simple-select-filled-label"
                            id="demo-simple-select-filled"
                            value={sortPrice}
                            onChange={(e) => setSortPrice(e.target.value)}
                        >
                            <MenuItem value="" className="bg-transparent">
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value={"High to Low"}>High to Low</MenuItem>
                            <MenuItem value={"Low to High"}>Low to High</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl variant="filled" sx={{ m: 1, minWidth: 220 }}>
                        <InputLabel id="demo-simple-select-filled-label">Sort by Publish Date</InputLabel>
                        <Select
                            labelId="demo-simple-select-filled-label"
                            id="demo-simple-select-filled"
                            value={sortDate}
                            onChange={(e) => setSortDate(e.target.value)}
                        >
                            <MenuItem value="" className="bg-transparent">
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value={"Oldest to Newest"}>Oldest to Newest</MenuItem>
                            <MenuItem value={"Newest to Oldest"}>Newest to Oldest</MenuItem>
                        </Select>
                    </FormControl>
                </div>
                <div className="grid lg:grid-cols-4 lg:gap-[30px] cu:gap-[10px] mt-[40px] cu:grid-cols-2 cu:px-[2vw] lg:scale-[1] cu:scale-[0.9]">
                    {
                        (!isLoading) ? (
                            filterProducts().map((product: any, index: any) =>
                                <div key={index} onClick={() => setSlectedProduct(product)} className="flex flex-col justify-center items-start gap-[30px] rounded-[10px] p-[20px] bg-fuchsia-500">
                                    <div className="flex flex-col justify-center items-start ">
                                        <Image
                                            src={product.productImage}
                                            alt="Product"
                                            width={250}
                                            height={250}
                                            className="rounded-[10px]"
                                        />
                                        <div>{product.name}</div>
                                    </div>
                                    <div>{product.price} $</div>
                                </div>
                            )
                        ) : (
                            <Image
                                src="/loader.gif"
                                alt="Loading..."
                                height={400}
                                width={400}
                                className="ml-[40vw]"
                            />
                        )
                    }
                </div>
                {
                    slectedProduct && (
                        <div className="fixed w-[80vw] h-[80vh] backdrop-blur-lg bg-opacity-25 bg-black top-[100px] z-[10] rounded-[10px] flex flex-row items-center justify-center gap-[14vw] cu:scale-[0.8]">
                            <div>
                                <Image
                                    src={slectedProduct.productImage}
                                    alt="SlectedProduct"
                                    height={300}
                                    width={300}
                                    className="rounded-[10px]"
                                />
                            </div>
                            <div className="flex flex-col items-start justify-center gap-[30px] text-[25px] relative">
                                <div className="font-extrabold text-[30px]">Name: {slectedProduct.name}</div>
                                <div><span className="font-[1000]">Product ID:</span> {slectedProduct._id}</div>
                                <div>Price: {slectedProduct.price} $</div>
                                <div>Description: {slectedProduct.description}</div>
                                <div>Date: {slectedProduct.createdAt}</div>
                                <Button
                                    variant="contained"
                                    className="rounded-[20px] px-[30px] py-[10px] font-bold shadow-none bg-fuchsia-500 text-[13px] w-[80%]"
                                    onClick={handleAddToCard}
                                    loading={cardButtonLoading}
                                >
                                    Add to Card
                                </Button>
                            </div>
                            <span className="absolute top-[20px] right-[20px] cursor-pointer" onClick={() => setSlectedProduct(null)}>
                                <CloseIcon sx={{ fontSize: 40 }} />
                            </span>

                        </div>
                    )
                }
            </div>
        </>
    )
}

export default Shop;