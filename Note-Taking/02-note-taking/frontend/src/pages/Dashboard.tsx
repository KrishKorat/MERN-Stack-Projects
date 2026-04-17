import { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";

import AddNoteModal from "../components/AddNoteModal";
import EditNoteModal from "../components/EditNoteModal";
import NoteCard from "../components/NoteCard";


function Dashboard() {
    const [notes, setNotes] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);


    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("");
    const [categories, setCategories] = useState<string[]>([]);
    const [sort, setSort] = useState("newest");

    const [debouncedSearch, setDebouncedSearch] = useState(search);


    const fetchNotes = async() => {
        try {
            const res = await API.get("/notes", {
                params: {
                    search: debouncedSearch || undefined,
                    category: category || undefined,
                    sort
                }
            });
            setNotes(res.data);
        }
        catch {
            console.error("Failed to fetch notes");
        } finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        fetchNotes();
    }, [debouncedSearch, category, sort]);

    const fetchCategories = async() => {
        try {
            const res = await API.get<string[]>("/notes/categories");
            setCategories(res.data);
        }
        catch {
            console.error("Failed to fetch categories");
        }
    }
    useEffect(() => {
        fetchCategories();
    }, []);


    const [showModal, setShowModal] = useState(false);
    const addNoteToUI = (note: any) => {
        setNotes([note, ...notes]);
    }


    const [selectedNote, setSelectedNote] = useState<any>(null);
    const handleEdit = (note: any) => {
        setSelectedNote(note);
    }
    const updateNoteInUI = (updated: any) => {
        setNotes(notes.map((n) => (n._id === updated._id ? updated : n)));
    }


    const handleDelete = async (id: string) => {
        const confirmDelete = window.confirm("Delete this note");

        if (!confirmDelete) return;

        try {
            await API.delete(`/notes/${id}`);
            setNotes(notes.filter((note) => note._id !== id));
        }
        catch(err) {
            alert("Failed to delete note");
        }
    }




    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(search);
        }, 400);

        return () => clearTimeout(timer);
    }, [search]);



    return(
        <>
            <Navbar />

            <div className="flex flex-col md:flex-row justify-center gap-3 mb-4 p-4">
                {/* Search */}
                <input
                    placeholder="Search notes..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="p-2 border rounded w-full md:w-1/3"
                />

                {/* Category */}
                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="p-2 border rounded"
                >
                    <option value="">All Categories</option>
                    {categories.map((cat) => (
                        <option key={cat} value={cat}>
                            {cat}
                        </option>
                    ))}
                </select>

                {/* Sort */}
                <select
                    value={sort}
                    onChange={(e) => setSort(e.target.value)}
                    className="p-2 border rounded"
                >
                    <option value="newest">Newest</option>
                    <option value="oldest">Oldest</option>
                    <option value="importance">Importance</option>
                </select>
            </div>



            <div className="p-6">
                {loading ? (
                    <p>Loading...</p>
                ) : notes.length === 0 ? (
                    <p>No notes yet</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {notes.map((note) => (
                            <NoteCard key={note._id} note={note} onEdit={handleEdit} onDelete={handleDelete} />
                        ))}
                    </div>
                )}
            </div>


            {selectedNote && (
                <EditNoteModal
                    note={selectedNote}
                    onClose={() => setSelectedNote(null)}
                    onUpdate={updateNoteInUI}
                />
            )}

            
            
            {showModal && (
                <AddNoteModal
                    onClose={() => setShowModal(false)}
                    onAdd={addNoteToUI}
                />
            )}

            <button
                onClick={() => setShowModal(true)}
                className="fixed bottom-6 right-6 bg-indigo-500 text-white w-14 h-14 rounded-full text-xl shadow-lg"
            >
                +
            </button>
        </>

    )
}

export default Dashboard;