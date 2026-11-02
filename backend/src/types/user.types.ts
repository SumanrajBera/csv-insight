import * as z from 'zod'

export const userSchema = z.object({
    firstname: z.string().trim().min(1),
    lastname: z.string().trim().min(1),
    email: z.email(),
    username: z.string().trim().min(5),
    password: z.string().trim().min(6)
})

export type IUser = z.infer<typeof userSchema>