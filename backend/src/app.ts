import express, { type Request, type Response, type NextFunction } from "express";
import authRouter from './routes/auth.routes.js'
import { AppError } from "./utils/AppError.js";
import cookieParser from 'cookie-parser'

export const app = express()

app.use(express.json())
app.use(cookieParser())

app.use("/api/auth", authRouter)

app.use((err: unknown, req: Request, res: Response, next: NextFunction) => {
    const statusCode = err instanceof AppError ? err.statusCode : 500;

    console.error(err);

    const message = err instanceof Error
        ? err.message
        : "Internal server error";

    return res.status(statusCode).json({ message });
});