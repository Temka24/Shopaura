import { IProduct } from "@/model/ProductModel";

export interface UserDataType{
    email: string;
    id: string;
    imageUrl: string;
    isAdmin: string;
    name: string;
}

export interface CardType{
    product: IProduct;
    quantity: number;
}