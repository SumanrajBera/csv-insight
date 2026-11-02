import mongoose from "mongoose";
import bcrypt from 'bcrypt'
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

userSchema.pre("save", async function () {
    if (!this.isModified('password')) return;

    this.password = await bcrypt.hash(this.password, 10)
})

export const userModel = mongoose.model<IUser>("User", userSchema)