import { userModel } from '../models/user.model.js'
import { userSchema } from '../types/user.types.js'
import { AppError } from '../utils/AppError.js'
import { type Request, type Response, type NextFunction } from 'express'

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