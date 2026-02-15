const express = require("express");
const router = express.Router();
const { placeBid } = require("../controllers/bidController");
const { protect } = require("../middleware/authMiddleware");


router.post("/:itemId", protect, placeBid);

module.exports = router;