import type { Note } from "../types/note";

interface Props {
    note: Note;
}


const NoteCard = ({ note }: Props) => {
    return(
        <div className="backdrop-blur-lg bg-white/70 border border-white/40 rounded-2xl p-5 shadow-md hover:shadow-xl transition duration-300 hover:-translate-y-1">

            <h2 className="text-xl font-semibold text-gray-800">
                {note.title}
            </h2>

            <p className="text-gray-600 mt-3 line-clamp-4">
                {note.content}
            </p>

            <div className="mt-5 flex justify-between items-center">
                <span className="text-xs text-gray-400">
                    {new Date(note.createdAt).toLocaleDateString()}
                </span>

                <span className="text-xs px-2 py-1 bg-indigo-100 text-indigo-600 rounded-full">
                Note
                </span>
            </div>
        </div>
    );
};

export default NoteCard;