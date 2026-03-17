import { PenSquareIcon, Trash2Icon } from "lucide-react";
import { Link } from "react-router";
import { formatDate } from "../lib/utils";
import api from "../lib/axios";
import toast from "react-hot-toast";


const NoteCard = ({ note, setNotes }) => {

    const handleDelete = async (e, id) => {
        e.preventDefault();

        if (!window.confirm("Are you sure you want to delete this note?")) return;

        try {
            await api.delete(`/notes/${id}`);
            setNotes((prev) => prev.filter((note) => note._id !== id));
            toast.success("Note deleted successfully");
        } 
        catch(err) {
            console.log("Error in handleDelete: ", err);
            toast.error("Failed to delete note");
        }
    }

    return(
        <Link
          to={`/notes/${note._id}`}
          className="group bg-white rounded-[2.5rem] border border-[#3A77FF]/5 p-8 shadow-sm hover:shadow-[0_20px_40px_rgba(58,119,255,0.08)] transition-all duration-500 flex flex-col h-full"
        >
          
          <div className="flex-1">
            <h3 className="text-2xl font-serif italic font-semibold text-[#3A77FF] mb-3 group-hover:translate-x-1 transition-transform">
              {note.title}
            </h3>
            
            <p className="text-[#3A77FF]/60 font-medium leading-relaxed line-clamp-3 mb-6">
              {note.content}
            </p>
          </div>
          
          {/* Card Footer */}
          <div className="flex justify-between items-center pt-5 border-t border-[#3A77FF]/5">
            <span className="text-[10px] font-bold text-[#3A77FF]/40 uppercase tracking-[0.2em]">
              {formatDate(new Date(note.createdAt))}
            </span>
            
            <div className="flex items-center gap-3">
              {/* Edit Indicator */}
              <div className="p-2 rounded-full bg-[#3A77FF]/5 text-[#3A77FF] group-hover:bg-[#3A77FF] group-hover:text-white transition-all duration-300">
                <PenSquareIcon className="size-4" />
              </div>
              
              {/* Delete Button */}
              <button
                className="p-2 rounded-full bg-[#FF4D4D]/5 text-[#FF4D4D] hover:bg-[#FF4D4D] hover:text-white transition-all duration-300"
                onClick={(e) => {
                  e.preventDefault(); // Prevents navigating to details when deleting
                  handleDelete(note._id);
                }}
              >
                <Trash2Icon className="size-4" />
              </button>
            </div>
          </div>
        </Link>
    );
}

export default NoteCard;