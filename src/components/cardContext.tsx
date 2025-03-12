'use client'
import React, { useState, useContext, createContext } from 'react'
import toast from 'react-hot-toast'
import { CardType } from '@/types/userTypes'
import { IProduct } from '@/model/ProductModel'

const CardContext = createContext<{
    card: CardType[],
    setCard: React.Dispatch<React.SetStateAction<CardType[]>>,
    addToCard: (product: IProduct) => void,
    removeFromCard: (productId: string) => void,
    incrementQuantity: (productId: string) => void,
    decrementQuantity: (productId: string) => void
}>({
    card: [],
    setCard: () => { },
    addToCard: () => { },
    removeFromCard: () => { },
    incrementQuantity: () => { },
    decrementQuantity: () => { }
})


const CardProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
    const [card, setCard] = useState<CardType[]>([]);

    const addToCard = (product: IProduct) => {
        const exist = card.find((item) => item.product._id == product._id)
        if (exist) {
            toast.error("Already exist")
            return;
        }
        setCard([...card, { product, quantity: 1 }])
    }
    const removeFromCard = (productId: string) => {
        setCard(card.filter((item) => item.product._id != productId))
        toast.success("Remove")
    }
    const incrementQuantity = (productId: string) => {
        setCard(card.map((item) => item.product._id == productId ? { ...item, quantity: item.quantity + 1 } : item ))
        toast.success("IncContext")
    }
    const decrementQuantity = (productId: string) => {
        setCard(card.map((item) => (item.product._id == productId && item.quantity > 1) ? { ...item, quantity: item.quantity - 1 } : item))
        toast.success("DecContext")
    }

    return (
        <>
            <CardContext.Provider
                value={{
                    card,
                    setCard,
                    addToCard,
                    removeFromCard,
                    incrementQuantity,
                    decrementQuantity
                }}
            >
                {children}
            </CardContext.Provider>
        </>
    )
}

export { CardProvider };

export const useCard = () => {
    return useContext(CardContext)
}