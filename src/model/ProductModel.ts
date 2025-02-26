import mongoose, { model, models, Document, Schema } from "mongoose";

export interface IProduct extends Document {
    name: string;
    price: number;
    description: string;
    productImage: string;
    createdAt?: Date;
    updatedAt?: Date;
}

const productSchema: Schema = new Schema({
    name: {
        type: String
    },
    price: {
        type: Number
    },
    description: {
        type: String
    },
    productImage: {
        type: String
    }
}, { timestamps: true })

export default models.Product || mongoose.model<IProduct>("Product", productSchema)