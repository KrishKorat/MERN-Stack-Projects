import { useState } from "react";

interface Props {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (title: string, content: string) => void;
}

const AddNoteModal = ({ isOpen, onClose, onSubmit }: Props) => {

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    if (!isOpen) return null;

    const handleSubmit = () => {
        if (!title.trim() || !content.trim()) return;

        onSubmit(title, content);
        setTitle("");
        setContent("");
        onClose();
    }

    return(
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-xl animate-fadeIn">
                
                <h2 className="text-2xl font-semibold mb-4 text-gray-800">
                    Create Note
                </h2>

                <input
                    type="text"
                    placeholder="Title"
                    className="w-full p-3 border rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />

                <textarea
                    placeholder="Content"
                    className="w-full p-3 border rounded-lg mb-4 h-32 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />

                <div className="flex justify-end gap-3">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={handleSubmit}
                        className="px-4 py-2 rounded-lg bg-indigo-500 text-white hover:bg-indigo-600"
                    >
                        Add
                    </button>
                </div>
            </div>
        </div>
    );
}

export default AddNoteModal;