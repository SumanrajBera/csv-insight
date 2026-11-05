import * as z from 'zod'
import { Types } from 'mongoose'

export const userSchema = z.object({
    firstname: z.string().trim().min(1),
    lastname: z.string().trim().min(1),
    email: z.email().trim().toLowerCase(),
    username: z.string().trim().toLowerCase().min(5).max(20).regex(/^[a-z0-9_]+$/),
    password: z.string().trim().min(6).regex(/^\S+$/)
})

export const loginSchema = z.object({
    identifier: z.string().trim().toLowerCase().min(1).regex(/^\S+$/),
    password: z.string().trim().min(6).regex(/^\S+$/)
})

export type IUser = z.infer<typeof userSchema>

export interface IUserDocument extends IUser, Document {
    _id: Types.ObjectId;
}