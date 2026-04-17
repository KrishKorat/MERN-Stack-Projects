import { useState, useEffect } from "react";
import { getNotes } from "../services/note.service";
import type { Note } from "../types/note";
import NoteCard from "../components/NoteCard";


import AddNoteModal from "../components/AddNoteModal";
import { createNote } from "../services/note.service";

import EditNoteModal from "../components/EditNoteModal";
import { updateNote } from "../services/note.service";

import { deleteNote } from "../services/note.service";


const Home = () => {
    
    const [notes, setNotes] = useState<Note[]>([]);
    const [loading, setLoading] = useState(false);

    const [isModalOpen, setIsModalOpen] = useState(false);

    const [selectedNote, setSelectedNote] = useState<Note | null>(null);
    const [isEditOpen, setIsEditOpen] = useState(false);


    const handleCreateNote = async (title: string, content: string) => {
        try {
            const newNote = await createNote({ title, content });
            setNotes((prev) => [...prev, newNote]);
        }
        catch (err) {
            console.error("Error creating notes");
        }
    };


    const handleEditClick = (note: Note) => {
        setSelectedNote(note);
        setIsEditOpen(true);
    }

    const handleUpdateNote = async (
        id: string,
        title: string,
        content: string
    ) => {
        try {
            const updated = await updateNote(id, { title, content });
            setNotes((prev) => 
                prev.map((n) => (n._id === id ? updated : n))
            );
        }
        catch(err) {
            console.error("Error updating note");
        }
    }


    const handleDeleteNote = async (id: string) => {
        try {
            await deleteNote(id);

            setNotes((prev) => prev.filter((note) => note._id !== id));
        }
        catch(err) {
            console.error("Error deleting note");
        }
    }


    useEffect(() => {
        const fetchNotes = async () => {
            try {
                const data = await getNotes();
                setNotes((data));
            }
            catch(err) {
                console.error("Error fetching notes");
            }
            finally {
                setLoading(false);
            }
        }
        fetchNotes();
    }, []);

    return(
        <div className="min-h-screen bg-gradient-to-br from-indigo-200 via-white to-purple-100">
            {/* Header */}
            <div className="max-w-6xl mx-auto px-6 py-10">
                <h1 className="text-4xl font-heading font-semibold text-gray-800 text-center">
                    📝 Notes
                </h1>
            </div>

            {/* Content */}
            <div className="max-w-6xl mx-auto px-6 pb-10">
                {loading ? (
                    <div className="text-center text-gray-500 animate-pulse">
                        Loading notes...
                    </div>
                ) : notes.length === 0 ? (
                    <div className="text-center text-gray-400">
                        No notes yet.
                    </div>
                ) : (
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {notes.map((note) => (
                        <NoteCard 
                            key={note._id} 
                            note={note} 
                            onEdit={handleEditClick} 
                            onDelete={handleDeleteNote}
                        />
                        ))}
                    </div>
                )}
            </div>

            <button
                onClick={() => setIsModalOpen(true)}
                className="fixed bottom-6 right-6 bg-indigo-500 text-white text-2xl w-14 h-14 rounded-full shadow-lg hover:bg-indigo-600 transition"
            >
                +
            </button>


            <AddNoteModal 
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleCreateNote}
            />
            <EditNoteModal 
                isOpen={isEditOpen}
                onClose={() => setIsEditOpen(false)}
                onSubmit={handleUpdateNote}
                note={selectedNote}
            />
        </div>
    );
};

export default Home;