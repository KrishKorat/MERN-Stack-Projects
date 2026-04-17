import { useState } from "react";
import API from "../services/api";

function AddNoteModal({ onClose, onAdd }: any) {

    const [form, setForm] = useState({
        title: "",
        content: "",
        category: "",
        importance: "low",
        type: "text"
    });

    const [checklist, setChecklist] = useState<any[]>([]);

    const handleChange = (e: any) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    const addChecklistItem = () => {
        setChecklist([...checklist, { text: "", completed: false }]);
    }

    const updateChecklistItem = (index: number, value: string) => {
        const updated = [...checklist];
        updated[index].text = value;
        setChecklist(updated);
    }

    const toggleChecklistItem = (index: number) => {
        const updated = [...checklist];
        updated[index].completed = !updated[index].completed;
        setChecklist(updated);
    }

    const removeChecklistItem = (index: number) => {
        const upload = checklist.filter((_, i) => i !== index);
        setChecklist(upload);
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        const payload: any = {
            ...form
        }

        if (form.type !== "text") {
            payload.checklist = checklist;
        }

        try {
            const res = await API.post("/notes", payload);
            onAdd(res.data);
            onClose();
        }
        catch(err: any) {
            alert("Failed to create note");
        }
    }


    return(
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center">
        <div className="bg-white p-6 rounded-xl w-[400px] max-h-[90vh] overflow-y-auto">
            <h2 className="text-lg mb-4">Add Note</h2>

            <form onSubmit={handleSubmit}>
            <input
                name="title"
                placeholder="Title"
                className="w-full mb-2 p-2 border"
                onChange={handleChange}
            />

            <select
                name="type"
                className="w-full mb-2 p-2 border"
                onChange={handleChange}
            >
                <option value="text">Text</option>
                <option value="checklist">Checklist</option>
                <option value="hybrid">Hybrid</option>
            </select>

            {(form.type === "text" || form.type === "hybrid") && (
                <textarea
                name="content"
                placeholder="Content"
                className="w-full mb-2 p-2 border"
                onChange={handleChange}
                />
            )}

            <input
                name="category"
                placeholder="Category"
                className="w-full mb-2 p-2 border"
                onChange={handleChange}
            />

            <select
                name="importance"
                className="w-full mb-2 p-2 border"
                onChange={handleChange}
            >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
            </select>

            {/* Checklist */}
            {(form.type === "checklist" || form.type === "hybrid") && (
                <div className="mb-3">
                <button
                    type="button"
                    onClick={addChecklistItem}
                    className="mb-2 text-sm text-indigo-500"
                >
                    + Add Item
                </button>

                {checklist.map((item, i) => (
                    <div key={i} className="flex items-center gap-2 mb-1">
                    <input
                        type="checkbox"
                        checked={item.completed}
                        onChange={() => toggleChecklistItem(i)}
                    />
                    <input
                        value={item.text}
                        onChange={(e) =>
                        updateChecklistItem(i, e.target.value)
                        }
                        className="flex-1 p-1 border"
                    />
                    <button
                        type="button"
                        onClick={() => removeChecklistItem(i)}
                        className="text-red-500"
                    >
                        x
                    </button>
                    </div>
                ))}
                </div>
            )}

            <button className="w-full bg-indigo-500 text-white p-2 rounded">
                Create
            </button>
            </form>

            <button
            onClick={onClose}
            className="mt-3 text-sm text-gray-500"
            >
            Cancel
            </button>
        </div>
    </div>
    );
}

export default AddNoteModal;