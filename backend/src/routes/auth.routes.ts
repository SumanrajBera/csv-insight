import { Router } from 'express'
import { userSchema, type IUser } from '../types/user.types.js'

const router = Router()

router.post("/signup", (req, res) => {
    const request = userSchema.safeParse(req.body)
})

router.post("/login", (req, res) => {
    res.status(200).json("Working route")
})

export default router