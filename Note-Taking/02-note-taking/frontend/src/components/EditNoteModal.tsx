import { useState } from "react";
import API from "../services/api";

function EditNoteModal({ note, onClose, onUpdate }: any) {

    const [form, setForm] = useState({
        title: note.title,
        content: note.content,
        category: note.category,
        importance: note.importance,
        type: note.type
    });

    const [checklist, setChecklist] = useState(note.checklist || []);

    const handleChange = (e: any) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    const updateChecklistItem = (i: number, value: string) => {
        const updated = [...checklist];
        updated[i] = value;
        setChecklist(updated);
    }

    const toggleChecklistItem = (i: number) => {
        const updated = [...checklist];
        updated[i].completed = !updated[i].completed;
        setChecklist(updated);
    }

    const addItem = () => {
        setChecklist([...checklist, { text: "", completed: false }]);
    }

    const removeItem = (i: number) => {
        setChecklist(checklist.filter((_:any, idx: number) => idx !== i));
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        const payload: any = {
            ...form, 
            checklist
        };

        try {
            const res = await API.put(`/notes/${note._id}`, payload);
            onUpdate(res.data);
            onClose();
        }
        catch {
            alert("Update failed");
        }
    }



    return (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center">
            <div className="bg-white p-6 rounded-xl w-[400px] max-h-[90vh] overflow-y-auto">
                <h2 className="mb-4 text-lg">Edit Note</h2>

                <form onSubmit={handleSubmit}>
                <input
                    name="title"
                    value={form.title}
                    onChange={handleChange}
                    className="w-full mb-2 p-2 border"
                />

                <select
                    name="type"
                    value={form.type}
                    onChange={handleChange}
                    className="w-full mb-2 p-2 border"
                >
                    <option value="text">Text</option>
                    <option value="checklist">Checklist</option>
                    <option value="hybrid">Hybrid</option>
                </select>

                {(form.type === "text" || form.type === "hybrid") && (
                    <textarea
                    name="content"
                    value={form.content}
                    onChange={handleChange}
                    className="w-full mb-2 p-2 border"
                    />
                )}

                <input
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                    className="w-full mb-2 p-2 border"
                />

                <select
                    name="importance"
                    value={form.importance}
                    onChange={handleChange}
                    className="w-full mb-2 p-2 border"
                >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                </select>

                {(form.type !== "text") && (
                    <div className="mb-3">
                    <button type="button" onClick={addItem} className="text-indigo-500 mb-2">
                        + Add Item
                    </button>

                    {checklist.map((item: any, i: number) => (
                        <div key={i} className="flex gap-2 mb-1">
                        <input
                            type="checkbox"
                            checked={item.completed}
                            onChange={() => toggleChecklistItem(i)}
                        />
                        <input
                            value={item.text}
                            onChange={(e) => updateChecklistItem(i, e.target.value)}
                            className="flex-1 border p-1"
                        />
                        <button onClick={() => removeItem(i)} type="button">
                            x
                        </button>
                        </div>
                    ))}
                    </div>
                )}

                    <button className="w-full bg-indigo-500 text-white p-2 rounded">
                        Update
                    </button>
                </form>

                <button onClick={onClose} className="mt-2 text-sm text-gray-500">
                    Cancel
                </button>
            </div>
        </div>
    );
}

export default EditNoteModal;