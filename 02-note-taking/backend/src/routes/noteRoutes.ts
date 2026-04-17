import express from "express";
import { 
    createNote,
    getNotes,
    getNote,
    updateNote,
    deleteNote,
    getCategories
} from "../controllers/noteController";
import { protect } from "../middleware/authMiddleware";

const router = express.Router();

router.use(protect);


router.get("/categories", getCategories);

router.post("/", createNote);
router.get("/", getNotes);
router.get("/:id", getNote);
router.put("/:id", updateNote);
router.delete("/:id", deleteNote);


export default router;