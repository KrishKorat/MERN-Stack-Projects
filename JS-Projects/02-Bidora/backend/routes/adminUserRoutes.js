const express = require("express");
const router = express.Router();


const { protect } = require("../middleware/authMiddleware");
const { adminOnly } = require("../middleware/adminMiddleware");


const {
    getAllUsersAdmin,
    updateUserAdmin,
    deleteUserAdmin
} = require("../controllers/adminUserController");


router.get("/users", protect, adminOnly, getAllUsersAdmin);
router.put("/users/:id", protect, adminOnly, updateUserAdmin);
router.delete("/users/:id", protect, adminOnly, deleteUserAdmin);


module.exports = router;