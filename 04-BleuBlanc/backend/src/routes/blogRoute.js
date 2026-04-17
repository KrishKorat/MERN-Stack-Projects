import express from "express";
const router = express.Router();

import {
    getAllBlogs,
    getBlogById,
    addBlog,
    updateBlog,
    deleteBlog
} from "../controllers/blogController.js";

router.get("/", getAllBlogs);
router.get("/:id", getBlogById);
router.post("/", addBlog);
router.put("/:id", updateBlog);
router.delete("/:id", deleteBlog);

export default router;