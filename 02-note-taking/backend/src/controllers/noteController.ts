import mongoose from "mongoose";
import { Request, Response } from "express";
import Note from "../models/Note";
import { validateNote } from "../utils/validateNote";

interface AuthRequest extends Request {
    user?: any,
    params: {
        id: string;
    };
}


// CREATE NOTE
export const createNote = async (req: AuthRequest, res: Response) => {
    try {
        const error = validateNote(req.body);
        if (error) {
            return res.status(400).json({ message: error });
        }

        const note = await Note.create({
            ...req.body,
            userId: req.user._id
        });

        res.status(201).json(note);
    }
    catch(err) {
        res.status(500).json({ message: "Failed to create note" });
    }
}


// GET ALL NOTES
export const getNotes = async (req: AuthRequest, res: Response) => {
    try {
        const { search, category, sort } = req.query;

        const query: any = {
            userId: req.user._id
        }

        if (search) {
            query.title = {
                $regex: search,
                $options: "i"
            }
        }
        if (category) {
            query.category = category;
        }
        let notesQuery = Note.find(query);

        if (sort === "newest") {
            notesQuery = notesQuery.sort({ createdAt: -1 });
        } else if (sort === "oldest") {
            notesQuery = notesQuery.sort({ createdAt: 1 });
        } else if (sort === "importance") {

            const notes = await notesQuery;

            const importanceOrder: any = {
                high: 3,
                medium: 2,
                low: 1
            };
            const sorted = notes.sort(
                (a: any, b: any) => importanceOrder[b.importance] - importanceOrder[a.importance]
            );
            return res.json(sorted);
        } 
        else {
            notesQuery = notesQuery.sort({ createdAt: -1 });
        }
        
        const notes = await notesQuery;
        res.json(notes);
    }
    catch(err) {
        res.status(500).json({ message: "Failed to fetch notes" });
    }
}


// GET NOTE
export const getNote = async (req: AuthRequest, res: Response) => {
    try {
        const noteId = req.params.id;
        if (!mongoose.Types.ObjectId.isValid(noteId)) {
            return res.status(400).json({ message: "Invalid note ID" });
        }

        const note = await Note.findOne({
            _id: noteId,
            userId: req.user._id
        });
        if (!note) {
            return res.status(404).json({ message: "Note not found" });
        }

        res.json(note);
    }
    catch(err) {
        res.status(500).json({ message: "Error fetching note" });
    }
}


// UPDATE NOTE
export const updateNote = async (req: AuthRequest, res: Response) => {
    try {
        const noteId = req.params.id;
        if (!mongoose.Types.ObjectId.isValid(noteId)) {
            return res.status(400).json({ message: "Invalid note ID" });
        }

        const error = validateNote(req.body);
        if (error) {
            return res.status(400).json({ message: error });
        }

        const note = await Note.findOneAndUpdate(
            { _id: noteId, userId: req.user._id },
            req.body,
            { new: true }
        );
        if (!note) {
            return res.status(404).json({ message: "Note not found" });
        }

        res.json(note);
    } 
    catch (error) {
        res.status(500).json({ message: "Error updating note" });
    }
}


// DELETE NOTE
export const deleteNote = async (req: AuthRequest, res: Response) => {
    try {
        const noteId = req.params.id;
        if (!mongoose.Types.ObjectId.isValid(noteId)) {
            return res.status(400).json({ message: "Invalid note ID" });
        }

        const note = await Note.findOneAndDelete({
            _id: noteId,
            userId: req.user._id
        });
        if (!note) {
            return res.status(404).json({ message: "Note not found" });
        }

        res.json({ message: "Note deleted" });
    }
    catch(err) {
        res.status(500).json({ message: "Error deleting note" });
    }
}