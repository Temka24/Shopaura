import mongoose, { Schema, model, models, Document } from "mongoose";
import { IProduct } from "./ProductModel";

export interface IOrderItem {
    product: mongoose.Types.ObjectId;
    quantity: number;
}

export interface IOrderItemPopulated {
    product: IProduct;
    quantity: number;
}

export interface IOrder extends Document {
    items: IOrderItem[];
    delivery: {
        buyer: mongoose.Types.ObjectId;
        country: string;
        state: string;
        city: string;
        address: string;
        postalCode: string;
    };
    status: string;
}

export interface IOrderPopulated extends Document{
    items: IOrderItemPopulated[];
    delivery: {
        buyer: mongoose.Types.ObjectId;
        country: string;
        state: string;
        city: string;
        address: string;
        postalCode: string;
    };
    status: string;
}


const orderSchema = new Schema<IOrder>({
    items: [{
        product: {
            type: Schema.Types.ObjectId,
            ref: "Product"
        },
        quantity: {
            type: Number,
            default: 1
        }
    }],
    delivery: {
        buyer: {
            type: Schema.Types.ObjectId,
            ref: "User"
        },
        country: {
            type: String,
            required: true
        },
        state: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        address: {
            type: String,
            required: true
        },
        postalCode: {
            type: String,
            required: true
        }
    },
    status: {
        type: String,
        default: "failed"
    }
}, { timestamps: true });

export default models.Order || model<IOrder>("Order", orderSchema);

