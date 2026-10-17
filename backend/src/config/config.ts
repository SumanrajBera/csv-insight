if (!process.env.MONGO_URI) {
    throw new Error("There is no MONGO_URI in the environment variables")
}

interface Config {
    MONGO_URI: string
}

export const config: Config = {
    MONGO_URI: process.env.MONGO_URI
} 