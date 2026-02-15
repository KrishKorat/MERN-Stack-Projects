const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const { adminOnly } = require("../middleware/adminMiddleware");


const {
    getAllItemsAdmin,
    updateItemAdmin,
    deleteItemAdmin
} = require("../controllers/adminItemController");


router.get("/items", protect, adminOnly, getAllItemsAdmin);
router.delete("/items/:id", protect, adminOnly, deleteItemAdmin);

router.put("/items/:id", protect, adminOnly, updateItemAdmin);

module.exports = router;