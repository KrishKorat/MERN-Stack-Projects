const Comment = require("../models/Comment");
const Item = require("../models/Item");



exports.addComment = async (req, res) => {
    try {
        const { content } = req.body;
        const item = await Item.findById(req.params.itemId);

        if(!item) {
            return res.status(404).json({ message: "Item not found" });
        }

        if(!item.isActive) {
            return res.status(400).json({ message: "Auction closed" });
        }

        if (!content || !content.trim()) {
            return res.status(400).json({ message: "Comment cannot be empty" });
        }

        const comment = await Comment.create({
            content, 
            user: req.user.id,
            item: item._id
        });

        const populatedComment = await comment.populate("user", "username");

        res.status(201).json(populatedComment);
    }
    catch(err) {
        res.status(500).json({ message: "Failed to add comment" });
    }
}