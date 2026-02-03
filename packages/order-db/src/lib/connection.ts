import mongoose from "mongoose";

let isConnected = false;

export const connectToDB = () => {
    if (isConnected) {
        console.log("Already connected to MongoDB");
        return;
    }
    if (!process.env.MONGODB_URL) {
        throw new Error("Please provide MONGODB_URL in the env file!");
    }
    try {
        mongoose.connect(process.env.MONGODB_URL);
        isConnected = true;
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Failed to connect to MongoDB:", error);
    }
};