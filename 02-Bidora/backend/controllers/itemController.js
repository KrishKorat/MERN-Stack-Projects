const Item = require("../models/Item");
const Bid = require("../models/Bid");
const Comment = require("../models/Comment");






exports.getAllItems = async (req, res) => {
    try {
        const items = await Item.find()
            .populate("owner", "username")
            .sort({ isActive: -1, createdAt: -1 })

        res.json(items);
    }
    catch(err) {
        res.status(500).json({ message: "Failed to fetch items" });
    }
};





exports.getItemById = async (req, res) => {
    try {
        const item = await Item.findById(req.params.id)
            .populate("owner", "username")
            .populate("winner", "username");

        if(!item) {
            return res.status(404).json({ message: "Item not found" });
        }

        const bids = await Bid.find({ item: item._id })
            .populate("bidder", "username")
            .sort({ amount: -1 });
        
        const comments = await Comment.find({ item: item._id })
            .populate("user", "username")
            .sort({ createdAt: -1 });
        
        res.json({ item, bids, comments });
    }
    catch(err) {
        res.status(500).json({ message: "Server error" });
    }
};





exports.createItem = async (req, res) => {
    try {
        const { title, description, startingPrice, category, image } = req.body;


        if (!title || !description || !startingPrice || !category) {
            return res.status(400).json({ message: "All feilds are required" });
        }


        let imageUrl = "";
        if (typeof image === "string" && image.startsWith("http")) {
            imageUrl = image;
        }

        const item = await Item.create({
            title,
            description,
            startingPrice,
            currentPrice: startingPrice,
            category,
            owner: req.user.id,
            image: imageUrl
        });

        res.status(201).json(item);
    }
    catch(err) {
        console.error("CREATE ITEM ERROR:", err);
        res.status(500).json({ message: "Failed to create item" });
    }
};





exports.updateItem = async (req, res) => {
    try {
        const item = await Item.findById(req.params.id);

        if (!item) {
            return res.status(404).json({ message: "Item not found" });
        }

        // Owner authorization
        if (item.owner.toString() !== req.user.id) {
            return res.status(403).json({ message: "Not authorized" });
        }

        const { title, description, category, image } = req.body;

        if (typeof image === "string" && image.startsWith("http")) {
            item.image == image;
        }

        item.title = title || item.title;
        item.description = description || item.description;
        item.category = category || item.category;

        await item.save();
        res.json(item);
    }
    catch (err) {
        return res.status(500).json({
            message: err.message || "Failed to update item"
        });
    }
}





exports.deleteItem = async (req, res) => {
    try {
        const item = await Item.findById(req.params.id);

        if (!item) {
            return res.status(404).json({ message: "Item not found" });
        }

        // Owner authrozation
        if (item.owner.toString() !== req.user.id) {
            return res.status(403).json({ message: "Not authorized" });
        }

        await item.deleteOne();
        res.json({ message: "Item deleted successfully" });
    }
    catch(err) {
        res.status(500).json({ message: "Failed to delete item" });
    }
}





exports.closeAuction = async (req, res) => {
    try {
        const item = await Item.findById(req.params.id);

        if (!item) {
            return res.status(404).json({ message: "Item not found" });
        }

        // Owner authorization
        if (item.owner.toString() !== req.user.id) {
            return res.status(403).json({ message: "Not authorized" });
        }

        if (!item.isActive) {
            return res.status(400).json({ message: "Auction already closed" });
        }

        const highestBid = await Bid.findOne({ item: item._id })
            .sort({ amount: -1 })
            .populate("bidder");

        item.isActive = false;
        item.winner = highestBid ? highestBid.bidder._id : null;

        await item.save();

        res.json({
            message: "Auction closed successfully",
            winner: highestBid
                ?   {
                        username: highestBid.bidder.username,
                        amount: highestBid.amount
                    }
                : null
        });
    }
    catch(err) {
        res.status(500).json({ message: "Failed to close auction" });
    }
};





exports.getCategories = async (req, res) => {
    try {
        const categories = await Item.distinct("category");
        res.json(categories);
    }
    catch(err) {
        res.status(500).json({ message: "Failed to fetch categories" });
    }
};



exports.getItemsByCategory = async (req, res) => {
    try {
        const items = await Item.find({
            category: req.params.category
        })
            .populate("owner", "username")
            .sort({ isActive: -1, createdAt: -1  });
        
        res.json(items);
    }
    catch(err) {
        res.status(500).json({ message: "Failed to fetch items" });
    }
};





exports.getActiveItems = async (req, res) => {
    try {
        const items = await Item.find({ isActive: true })
            .populate("owner", "username")
            .sort({ createdAt: -1 });

        res.json(items);
    }
    catch(err) {
        res.status(500).json({ message: "Failed to fetch active items" });
    }
};