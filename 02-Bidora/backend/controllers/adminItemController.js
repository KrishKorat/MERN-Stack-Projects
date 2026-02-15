const Item = require("../models/Item");


exports.getAllItemsAdmin = async (req, res) => {
    const items = await Item.find()
        .populate("owner", "username")
        .sort({ createdAt: -1 });

    res.json(items);
}



exports.updateItemAdmin = async (req, res) => {
    const item = await Item.findById(req.params.id);

    if (!item) {
        return res.status(404).json({ message: "Item not found" });
    }

    const { title, description, category, isActive, image } = req.body;

    if (typeof image === "string" && image.startsWith("http")) {
        item.image = image;
    }

    item.title = title ?? item.title;
    item.description = description ?? item.description;
    item.category = category ?? item.category;
    item.isActive = isActive ?? item.isActive;

    await item.save();
    res.json(item);
};



exports.deleteItemAdmin = async (req, res) => {
    const item = await Item.findById(req.params.id);

    if (!item) {
        return res.status(404).json({ message: "Item not found" });
    }

    await item.deleteOne();
    res.json({ message: "Item deleted by admin" });
};