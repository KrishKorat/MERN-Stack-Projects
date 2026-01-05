import Note from "../models/Note.js";


export async function getAllNotes(req, res) {
    try {
        const notes = await Note.find().sort({ createdAt: -1 });
        res.status(200).json(notes);
    }
    catch(err) {
        console.error("Error occured in getAllNotes: ", err);
        res.status(500).json({ message: "Internal server error" });
    }
}


export async function getNoteById(req, res) {
    try {
        const note = await Note.findById(req.params.id);
        if (!note) return res.status(404).json({ message: "Note not found" });
        res.status(200).json(note);
    }
    catch(err) {
        console.error("Error occured in getNoteById: ", err);
        res.status(500).json({ message: "Internal server error" });
    }
}


export async function createNote(req, res) {
    try {
        const {title, content} = req.body;
        const note = new Note({ title, content });
        const savedData = await note.save();
        res.status(201).json(savedData);
    }
    catch(err) {
        console.error("Error occured in createNote: ", err);
        res.status(500).json({ message: "Internal server error" });
    }
}


export async function updateNote(req, res) {
    try {
        const {title, content} = req.body;
        const updatedNote = await Note.findByIdAndUpdate(
            req.params.id,
            { title, content },
            {
                new:true
            }
        );
        if (!updatedNote) return res.status(404).json({ message: "Note not found" });

        res.status(200).json(updatedNote);
    }
    catch(err) {
        console.error("Error occured in updateNote: ", err);
        res.status(500).json({ message: "Internal server error" });
    }
}


export async function deleteNote(req, res) {
    try {
        const deletedNote = await Note.findByIdAndDelete(req.params.id);
        if (!deletedNote) return res.status(404).json({ message: "Note not found" });
        res.status(200).json({ message: "Note deleted successfully" });
    }
    catch(err) {
        console.error("Error occured in deleteNote: ", err);
        res.status(500).json({ message: "Internal server error" });
    }
}
