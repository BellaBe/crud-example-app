import mongoose from "mongoose";
import { app } from "./app";
import dotenv from "dotenv";

const start = async () => {
    dotenv.config();
    try {
        await mongoose.connect(process.env.MONGO_URI!, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });
        console.log("Connected to MongoDB")
    } catch (error) {
        console.error(error);
    }

    app.listen(3000, () => {
        console.log("Listening on port 3000");
    });
}

start();

