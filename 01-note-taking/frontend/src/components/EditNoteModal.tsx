import { useState, useEffect } from "react";
import type { Note } from "../types/note";


interface Props {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (id: string, title: string, content: string) => void;
    note: Note | null;
}


const EditNoteModal = ({ isOpen, onClose, onSubmit, note }: Props) => {

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    useEffect(() => {
        if (note) {
            setTitle(note.title);
            setContent(note.content);
        }
    }, [note]);

    if (!isOpen || !note) return null;

    const handleSubmit = () => {
        if(!title.trim() || !content.trim()) return;

        onSubmit(note._id, title, content);
        onClose();
    }


    return(
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-xl">
                
                <h2 className="text-2xl font-semibold mb-4 text-gray-800">
                    Edit Note
                </h2>

                <input
                    className="w-full p-3 border rounded-lg mb-3"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />

                <textarea
                    className="w-full p-3 border rounded-lg mb-4 h-32 resize-none"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />

                <div className="flex justify-end gap-3">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-200 rounded-lg"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={handleSubmit}
                        className="px-4 py-2 bg-indigo-500 text-white rounded-lg"
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
}


export default EditNoteModal;