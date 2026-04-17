import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../services/api";
import Navbar from "../components/Navbar";
import EditNoteModal from "../components/EditNoteModal";


function NoteDetail() {
    
    const { id } = useParams();
    const navigate = useNavigate();

    const [note, setNote] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [editOpen, setEditOpen] = useState(false);

    const fetchNote = async () => {
        try {
            const res = await API.get(`/notes/${id}`);
            setNote(res.data);
        } catch {
            alert("Note not found");
            navigate("/");
        }
        finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchNote();
    }, []);

    const handleDelete = async () => {
        const confirmDelete = window.confirm("Delete this note?");
        if (!confirmDelete) return;

        try {
            await API.delete(`/notes/${id}`);
            navigate("/");
        }
        catch {
            alert("Delete Failed");
        }
    }

    const handleChecklistToggle = (index: number) => {
        const updated = { ...note };
        updated.checklist[index].completed =
        !updated.checklist[index].completed;

        setNote(updated);
    };

    const handleUpdate = (updated: any) => {
        setNote(updated);
    };

    if (loading) return <p className="p-4">Loading...</p>;
    if (!note) return null;


    return (
        <>
        <Navbar />

        <div className="max-w-3xl mx-auto p-6">
            {/* Title */}
            <h1 className="text-3xl font-semibold mb-4">
            {note.title}
            </h1>

            {/* Meta */}
            <div className="text-sm text-gray-500 mb-4 space-y-1">
            <p>Category: {note.category}</p>
            <p>Importance: {note.importance}</p>
            <p>
                Created:{" "}
                {new Date(note.createdAt).toLocaleString()}
            </p>
            </div>

            {/* Actions */}
            <div className="flex gap-4 mb-4">
            <button
                onClick={() => setEditOpen(true)}
                className="text-indigo-500"
            >
                Edit
            </button>

            <button
                onClick={handleDelete}
                className="text-red-500"
            >
                Delete
            </button>
            </div>

            <hr className="mb-4" />

            {/* Content */}
            {(note.type === "text" || note.type === "hybrid") && (
            <p className="mb-6 whitespace-pre-wrap">
                {note.content}
            </p>
            )}

            {/* Checklist */}
            {(note.type === "checklist" || note.type === "hybrid") && (
            <div className="space-y-2">
                {note.checklist.map((item: any, i: number) => (
                <div key={i} className="flex items-center gap-2">
                    <input
                    type="checkbox"
                    checked={item.completed}
                    onChange={() => handleChecklistToggle(i)}
                    />
                    <span
                    className={
                        item.completed
                        ? "line-through text-gray-400"
                        : ""
                    }
                    >
                    {item.text}
                    </span>
                </div>
                ))}
            </div>
            )}
        </div>

        {/* Edit Modal */}
        {editOpen && (
            <EditNoteModal
            note={note}
            onClose={() => setEditOpen(false)}
            onUpdate={handleUpdate}
            />
        )}
        </>
    );
};

export default NoteDetail;