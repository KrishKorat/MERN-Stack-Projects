const mongoose = require("mongoose");

const itemSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        description : {
            type: String,
            required: true
        },
        startingPrice: {
            type: Number,
            required: true
        },
        currentPrice: {
            type: Number,
            required: true
        },
        category: {
            type: String,
            enum: [
                "Art",
                "Jewelry",
                "Fashion",
                "Electronics",
                "Antiques",
                "Collectibles",
                "Watches",
                "Vehicles",
                "Real Estate",
                "Books",
                "Sports Memorabilia",
                "Others"
            ],
            required: true
        },
        isActive: {
            type: Boolean,
            default: true
        },
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        winner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            default: null
        }, 
        image: {
            type: String,
            default: ""
        },
    },
    { timestamps: true }
); 

module.exports = mongoose.model("Item", itemSchema);