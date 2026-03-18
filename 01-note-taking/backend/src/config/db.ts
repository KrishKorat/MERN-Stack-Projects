import mongoose from "mongoose";


export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI as string);
        console.log("MongoDB connected...");
    }
    catch(err) {
        console.error("Error occured while connecting to mongoDB: ", err);
    }
}