import * as z from 'zod'
import { Types } from 'mongoose'

export const userSchema = z.object({
    firstname: z.string().trim().min(1),
    lastname: z.string().trim().min(1),
    email: z.email(),
    username: z.string().trim().min(5),
    password: z.string().trim().min(6)
})

export const loginSchema = z.object({
    identifier: z.string().trim().min(1),
    password: z.string().trim().min(6)
})

export type IUser = z.infer<typeof userSchema>

export interface IUserDocument extends IUser, Document {
    _id: Types.ObjectId;
}