import mongoose, { model, models, Document, Schema } from "mongoose";

export interface ICardItems {
    product: mongoose.Types.ObjectId,
    quantity: number
}

interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    imageUrl?: string;
    cardItems: ICardItems[];
    isAdmin: string;
}

const userSchema: Schema = new Schema({
    name: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    imageUrl: {
        type: String
    },
    cardItems: [{
        product: {
            type: Schema.Types.ObjectId,
            ref: "Product"
        },
        quantity: {
            type: Number,
            default: 1
        }
    }],
    isAdmin: {
        type: String,
        default: "false"
    }
})

export default models.User || model<IUser>('User', userSchema)