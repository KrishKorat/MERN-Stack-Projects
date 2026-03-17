const Item = require("../models/Item");
const User = require("../models/User");

exports.getDashboard = async (req, res) => {
    try {
        const items = await Item.find().sort({ createdAt: -1 });
        const users = await User.find();

        res.json({
        items,
        users,
        user: req.user
        });
    } catch (err) {
        console.error("ADMIN DASHBOARD ERROR:", err);
        res.status(500).json({ message: "Failed to load dashboard data" });
    }
};
