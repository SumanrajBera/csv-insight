import { Router } from 'express'
import { userSchema, type IUser } from '../types/user.types.js'
import { AppError } from '../utils/AppError.js'

const router = Router()

router.post("/signup", (req, res, next) => {
    try {
        const request = userSchema.safeParse(req.body)

        if (!request.success) throw new AppError(400, "Please provide the proper details")

    } catch (error) {
        next(error)
    }
})

router.post("/login", (req, res) => {
    res.status(200).json("Working route")
})

export default router