if (!process.env.MONGO_URI) {
    throw new Error("There is no MONGO_URI in the environment variables")
}

if (!process.env.JWT_SECRET_KEY) {
    throw new Error("There is no JWT_SECRET_KEY in the environment variables")
}

if (!process.env.NODE_ENV) {
    throw new Error("There is no NODE_ENV in the environment variables")
}


interface Config {
    MONGO_URI: string,
    JWT_SECRET_KEY: string,
    NODE_ENV: string
}

export const config: Config = {
    MONGO_URI: process.env.MONGO_URI,
    JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
    NODE_ENV: process.env.NODE_ENV
} 