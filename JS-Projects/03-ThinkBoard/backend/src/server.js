import express from "express";
import dotenv from "dotenv";
import cors from "cors";


import notesRoutes from "./routes/notesRoutes.js";
import { connectDB } from "./config/db.js"; 
import rateLimit from "./middleware/rateLimit.js";


dotenv.config();


const app = express();
const PORT = process.env.PORT || 5000;


// Middleware
app.use(
    cors({
        origin: "http://localhost:5173",
    })
);
app.use(express.json());
app.use(rateLimit);


app.use("/api/notes", notesRoutes);


connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server started on PORT: `, PORT);
    });
});