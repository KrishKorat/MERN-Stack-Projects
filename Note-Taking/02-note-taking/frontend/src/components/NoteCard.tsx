import { useNavigate } from "react-router-dom";

function NoteCard({ note, onEdit, onDelete }: any) {

    const navigate = useNavigate();

    return (
        <div 
        onClick={() => navigate((`/notes/${note._id}`))}
        className="p-4 bg-white rounded-xl shadow hover:shadow-md transition">
            <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-lg">{note.title}</h3>
                <div className="flex gap-3">
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            onEdit(note)
                        }}
                        className="text-sm text-indigo-500"
                    >
                        Edit
                    </button>

                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            onDelete(note._id)
                        }}
                        className="text-sm text-red-500"
                    >
                        Delete
                    </button>
                </div>
            </div>

            <p className="text-sm text-gray-500 mb-1">
                Category: {note.category || "general"}
            </p>

            <p className="text-sm text-gray-500 mb-1">
                Importance: {note.importance}
            </p>

            <p className="text-xs text-gray-400">
                {new Date(note.createdAt).toLocaleString()}
            </p>
        </div>
    );
}

export default NoteCard;