import { useState, useEffect } from "react";
import { getNotes } from "../services/note.service";
import type { Note } from "../types/note";
import NoteCard from "../components/NoteCard";


const Home = () => {
    
    const [notes, setNotes] = useState<Note[]>([]);
    const [loading, setLoading] = useState(false);

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
        <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-purple-100">
            {/* Header */}
            <div className="max-w-6xl mx-auto px-6 py-10">
                <h1 className="text-4xl font-bold text-gray-800 text-center">
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
                        No notes yet. Be the first chaotic genius.
                    </div>
                ) : (
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {notes.map((note) => (
                        <NoteCard key={note._id} note={note} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Home;