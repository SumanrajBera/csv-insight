import 'dotenv/config'
import { app } from './app.js'
import { connectToDB } from './config/database.js';

const PORT = process.env.PORT || 3000

async function startServer() {
    try {
        await connectToDB();
        app.listen(PORT, () => {
            console.log("Server is running on PORT:", PORT)
        })
    } catch (err: any) {
        if (err instanceof Error) {
            console.error(
                "Error occurred while starting the server:",
                err.message
            );
        } else {
            console.error("Unknown error occurred while starting the server:", err);
        }

        process.exit(1)
    }
}

startServer()