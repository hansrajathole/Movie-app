import mongoose from "mongoose";
import config from "../config/config.js";

const connectDB = () => {

    mongoose.connect(config.MONGODB_URI)
    .then(() => {
        console.log("MongoDB connected");
    })
    .catch((error) => {
        console.error("MongoDB connection error:", error);
        process.exit(1); // Exit the process with failure
    });

}

export default connectDB;