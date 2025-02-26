'use client'
import React, { useState, useContext, createContext } from 'react'
import toast from 'react-hot-toast'

const CardContext = createContext<{
    card: any[],
    setCard: React.Dispatch<React.SetStateAction<any[]>>,
    addToCard: (product: any) => void,
    removeFromCard: (productId: any) => void,
    incrementQuantity: (productId: any) => void,
    decrementQuantity: (productId: any) => void
}>({
    card: [],
    setCard: () => { },
    addToCard: () => { },
    removeFromCard: () => { },
    incrementQuantity: () => { },
    decrementQuantity: () => { }
})


const CardProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
    const [card, setCard] = useState<any[]>([]);

    const addToCard = (product: any) => {
        const exist = card.find((item) => item.product._id == product._id)
        if (exist) {
            toast.error("Already exist")
            return;
        }
        setCard([...card, { product, quantity: 1 }])
    }
    const removeFromCard = (productId: any) => {
        setCard(card.filter((item) => item.product._id != productId))
        toast.success("Remove")
    }
    const incrementQuantity = (productId: any) => {
        setCard(card.map((item) => item.product._id == productId ? { ...item, quantity: item.quantity + 1 } : item ))
        toast.success("IncContext")
    }
    const decrementQuantity = (productId: any) => {
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