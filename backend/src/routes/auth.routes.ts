import { Router } from 'express'
import { signupController } from '../controllers/auth.controller.js'


const router = Router()

router.post("/signup", signupController)

router.post("/login", (req, res) => {
    res.status(200).json("Working route")
})

export default router