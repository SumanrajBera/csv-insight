import mongoose from "mongoose";
import type { IUser } from "../types/user.types.js";

const userSchema = new mongoose.Schema<IUser>({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    username: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true,
        select: false
    }
})

export const userModel = mongoose.model<IUser>("User", userSchema)
