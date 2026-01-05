import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";


dotenv.config();

const app = express();

app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true
    })
);
app.use(express.json());



import authRoute from "./routes/authRoute.js";
import recipeRoute from "./routes/recipeRoute.js";


app.use("/api/auth", authRoute);
app.use("/api/recipes", recipeRoute);



const PORT = process.env.PORT || 5000;

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    })
})