const Item = require("../models/Item");
const Bid = require("../models/Bid");


exports.placeBid = async (req, res) => {
    try {
        
console.log("Item model:", Item);

        // 🔒 1. Auth guard (CRITICAL)
        if (!req.user || !req.user.id) {
        return res.status(401).json({ message: "Not authenticated" });
        }

        // 🔢 2. Validate amount
        const amount = Number(req.body.amount);
        if (!amount || isNaN(amount)) {
        return res.status(400).json({ message: "Invalid bid amount" });
        }

        const item = await Item.findById(req.params.itemId);

        if (!item) {
        return res.status(404).json({ message: "Item not found" });
        }

        if (!item.isActive) {
        return res.status(400).json({ message: "Auction is closed" });
        }

        // Owner cannot bid
        if (item.owner.toString() === req.user.id) {
        return res.status(403).json({ message: "Owner cannot bid on own item" });
        }

        if (amount <= item.currentPrice) {
        return res.status(400).json({
            message: `Bid must be higher than ${item.currentPrice}`,
        });
        }

        // Create bid
        const bid = await Bid.create({
        amount,
        bidder: req.user.id,
        item: item._id,
        });

        // Update item safely
        item.currentPrice = amount;
        item.winner = req.user.id;
        await item.save();

        res.status(201).json(bid);
    } catch (err) {
        // 🔥 LOG REAL ERROR (Render-friendly)
        console.error("PLACE BID ERROR:", err.message);
        console.error(err.stack);

        res.status(500).json({
        message: "Failed to place bid",
        });
    }
};
