import { Router } from "express";
import {
    createNote,
    getAllNotes,
    getNote,
    updateNote,
    deleteNote
} from "../controllers/note.controller";

const router = Router();

router.post("/", createNote);
router.get("/", getAllNotes);
router.get("/:id", getNote);
router.put("/:id", updateNote);
router.delete("/:id", deleteNote);


export default router;