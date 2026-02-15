const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config();


const connectDB = require("./config/db");


const app = express();


app.use("/uploads", express.static(path.join(__dirname, "uploads")));



const allowedOrigins = [
    "http://localhost:5173",
    "https://bidora1.netlify.app"
];

app.use(
    cors({
        origin: function (origin, callback) {
            // allow requests with no origin (Postman, curl)
            if (!origin) return callback(null, true);

            if (allowedOrigins.includes(origin)) {
                callback(null, true);
            } else {
                callback(new Error("Not allowed by CORS"));
            }
        },
        credentials: true
    })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



const authRoutes = require("./routes/authRoutes");
const itemRoutes = require("./routes/itemRoutes");
const bidRoutes = require("./routes/bidRoutes");
const commentRoutes = require("./routes/commentRoute");
const adminRoutes = require("./routes/adminRoutes");
const adminItemRoutes = require("./routes/adminItemRoutes");
const adminUserRoutes = require("./routes/adminUserRoutes");


app.use("/api/auth", authRoutes);
app.use("/api/items", itemRoutes);
app.use("/api/bids", bidRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/admin", adminItemRoutes);
app.use("/api/admin", adminUserRoutes);


const PORT = process.env.PORT || 5000;


connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running of port ${PORT}`);
});
});


app.use((err, req, res, next) => {
    // Multer-specific errors
    if (err instanceof multer.MulterError) {
        return res.status(400).json({ message: err.message });
    }

    // Custom errors (like fileFilter)
    if (err) {
        console.error("GLOBAL ERROR:", err);
        return res.status(400).json({ message: err.message || "Server error" });
    }

    next();
});