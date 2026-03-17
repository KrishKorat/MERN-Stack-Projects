import express from "express";
import dotenv from "dotenv";
import cors from "cors";


import connectDB from "./config/db.js";
import blogRoute from "./routes/blogRoute.js";


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;


app.use(
    cors({
        origin: "http://localhost:5173",
    })
);
app.use(express.json());
app.use("/api/blogs", blogRoute);


connectDB().then(() => {
    app.listen(PORT, () => {
        console.log("Server connected to the PORT: ", PORT);
    });
});