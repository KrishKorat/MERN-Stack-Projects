const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");

const { 
    getAllItems, 
    getItemById, 
    createItem, 
    updateItem, 
    deleteItem,
    closeAuction,
    getCategories,
    getItemsByCategory,
    getActiveItems
} = require("../controllers/itemController");




router.get("/", getAllItems);

router.get("/categories/all", getCategories);
router.get("/category/:category", getItemsByCategory);

router.get("/active/all", getActiveItems);

router.get("/:id", getItemById);
router.delete("/:id", protect, deleteItem);
router.patch("/:id/close", protect, closeAuction);

router.post("/", protect, createItem);

router.put("/:id", protect, updateItem);




module.exports = router;