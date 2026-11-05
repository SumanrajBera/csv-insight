import { userModel } from '../models/user.model.js'
import { loginSchema, userSchema, type IUserDocument } from '../types/user.types.js'
import { AppError } from '../utils/AppError.js'
import { type Request, type Response, type NextFunction } from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { config } from '../config/config.js'

export const signupController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const request = userSchema.safeParse(req.body)

        if (!request.success) throw new AppError(400, "Please provide the proper details")

        const user = await userModel.findOne({
            $or: [
                {
                    username: request.data.username
                },
                {
                    email: request.data.email
                }
            ]
        })

        // Comment this line for checking duplicate key error
        if (user) throw new AppError(409, "User with such email or username already exists")

        await userModel.create(request.data)

        return res.status(201).json("Your account was created.")

    } catch (error) {
        if (
            error &&
            typeof error === "object" &&
            "code" in error &&
            error.code === 11000
        ) {
            return next(
                new AppError(409, "Username or email already exists")
            );
        }

        next(error)
    }
}

export const loginController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const request = loginSchema.safeParse(req.body)

        if (!request.success) throw new AppError(400, "Please provide proper details")

        const userData: IUserDocument | null = await userModel.findOne({
            $or: [
                { username: request.data.identifier },
                { email: request.data.identifier }
            ]
        }).select('+password')


        if (!userData) throw new AppError(401, "Invalid Credentials")

        let isPasswordValid = await bcrypt.compare(request.data.password, userData.password)

        if (!isPasswordValid) throw new AppError(401, "Invalid Credentials")

        const token = jwt.sign({
            email: userData.email,
            username: userData.username,
            id: userData._id
        }, config.JWT_SECRET_KEY, { expiresIn: '7d' })

        res.cookie("token", token, {
            httpOnly: true,
            secure: config.NODE_ENV === "production",
            sameSite: config.NODE_ENV === "production" ? "strict" : "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

        return res.status(200).json({ message: "Login successful" })
    } catch (error) {
        next(error)
    }
}