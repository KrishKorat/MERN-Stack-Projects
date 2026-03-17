const mongoose = require("mongoose");

const bidSchema = new mongoose.Schema(
    {
        amount: {
            type: Number,
            required: true
        },
        bidder: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        item: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Item",
            required: true
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Bid", bidSchema);