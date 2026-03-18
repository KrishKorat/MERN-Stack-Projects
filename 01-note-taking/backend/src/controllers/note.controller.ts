import type { Request, Response } from "express";
import { Note } from "../models/note.model";



// CREATE 
export const createNote = async (req: Request, res: Response) => {
    try {
        const { title, content } = req.body;
        const note = await Note.create({ title, content });
        res.status(201).json({ message: "A note has been created" });
    }
    catch(err) {
        res.status(500).json({ message: "An error occured while creating note" });
    }
}



// GET all notes
export const getAllNotes = async (req: Request, res: Response) => {
    try {
        const notes = await Note.find().sort({ createdAt: -1 });
        res.json(notes);
    }
    catch(err) {
        res.status(500).json({ message: "An error occured while fetching all notes" });
    }
}



// GET specific note
export const getNote = async (req: Request, res: Response) => {
    try {
        const note = await Note.findById(req.params.id);

        if (!note) return res.status(404).json({ message: "Note does not exist" });
        res.json(note);
    }
    catch(err) {
        res.status(500).json({ message: "An error occured while fetching specific note" });
    }
}



// UPDATE note
export const updateNote = async (req: Request, res: Response) => {
    try {
        const { title, content } = req.body;

        const note = await Note.findByIdAndUpdate(
            req.params.id,
            { title, content },
            { new: true }
        )

        if (!note) return res.status(404).json({ message: "Note does not exist" });
        res.json({ message: "Note has been updated" });
    }
    catch(err) {
        res.status(500).json({ message: "An error occured while updating note" });
    }
}



// DELETE
export const deleteNote = async (req: Request, res: Response) => {
    try {
        const note = await Note.findByIdAndDelete(req.params.id);

        if (!note) return res.status(404).json({ message: "Note does not exist" });
        res.json({ message: "Note has been deleted" });
    }
    catch(err) {
        res.status(500).json({ message: "An error occured while deleting note" });
    }
}