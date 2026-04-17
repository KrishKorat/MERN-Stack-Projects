import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router";
import api from "../lib/axios";
import toast from "react-hot-toast";
import { ArrowLeftIcon, LoaderIcon, Trash2Icon } from "lucide-react";



const NoteDetailPage = () => {

    const [note, setNote] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const navigate = useNavigate();

    const {id} = useParams();


    useEffect(() => {
        const fetchNote = async () => {
            try {
                const res = await api.get(`/notes/${id}`);
                setNote(res.data);
            }
            catch(err) {
                console.log("Error in fetching note: ", err);
                toast.error("Failed to fetch the note");
            }
            finally {
                setLoading(false);
            }
        };
        fetchNote();
    }, [id]);


    const handleDelete = async () => {
        if (!window.confirm("Are you sure you want to delete this?")) return;

        try {
            await api.delete(`/notes/${id}`);
            toast.success("Note deleted");
            navigate("/");
        }
        catch(err) {
            console.log("Error deleting the note: ", err);
            toast.error("Failed to delete note");
        }
    }

    const handleSave = async () => {
        if (!note.title.trim() || !note.content.trim()) {
            toast.error("Please add a title or content");
            return;
        }
        setSaving(true);
        try {
            await api.put(`/notes/${id}`, note);
            toast.success("Note updated successfully");
            navigate("/");
        }
        catch(err) {
            console.log("Error saving the note: ", err);
            toast.error("Failed to update note");
        }
        finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-base-200 flex items-center justify-center">
                <LoaderIcon className="animate-spin size-10" />
            </div>
        );
    }


    return (
        <div className="min-h-screen bg-[#F5F7FA] flex flex-col items-center pt-10 pb-20 px-6 font-sans text-[#1E3A8A]">
            <div className="w-full max-w-4xl">
                
                <div className="flex items-center justify-between mb-12 px-4">
                    <Link to="/" className="inline-flex items-center gap-2 text-[#1E3A8A] font-black group">
                        <ArrowLeftIcon className="size-5 group-hover:-translate-x-1 transition-transform" />
                        <span className="uppercase tracking-widest text-[11px]">Collection</span>
                    </Link>

                    <button
                        onClick={handleDelete}
                        className="flex items-center gap-2 text-[#B91C1C] bg-[#B91C1C]/5 hover:bg-[#B91C1C] hover:text-white px-8 py-3 rounded-full transition-all duration-300 font-black uppercase tracking-widest text-[10px] shadow-sm shadow-[#B91C1C]/10"
                    >
                        <Trash2Icon className="size-4" /> Delete
                    </button>
                </div>

                <div className="bg-white border border-[#1E3A8A]/10 shadow-[0_80px_150px_rgba(30,58,138,0.15)] rounded-[5rem] overflow-hidden">
                    <div className="p-16 md:p-28 space-y-20">

                        <div className="space-y-6">
                            <span className="text-[#1E3A8A]/40 font-black uppercase tracking-[0.5em] text-[11px] block ml-1">Entry Title</span>
                            <input
                                type="text"
                                className="w-full text-7xl font-serif italic bg-transparent border-none text-[#1E3A8A] font-bold focus:outline-none p-0 leading-tight tracking-tight"
                                value={note.title}
                                onChange={(e) => setNote({ ...note, title: e.target.value })}
                            />
                        </div>

                        <div className="space-y-6">
                            <span className="text-[#1E3A8A]/40 font-black uppercase tracking-[0.5em] text-[11px] block ml-1">The Content</span>
                            <textarea
                                className="w-full bg-transparent border-none text-[#2A5ACC] font-medium text-3xl leading-[1.8] min-h-[450px] focus:outline-none p-0 resize-none font-serif italic"
                                value={note.content}
                                onChange={(e) => setNote({ ...note, content: e.target.value })}
                            />
                        </div>

                        <div className="flex justify-center pt-16 border-t border-[#1E3A8A]/10">
                            <button
                                className="bg-gradient-to-r from-[#1E3A8A] to-[#2A5ACC] text-white px-24 py-6 rounded-full font-black text-lg shadow-[0_25px_50px_rgba(30,58,138,0.3)] hover:shadow-[0_30px_60px_rgba(30,58,138,0.4)] transition-all transform hover:-translate-y-1 active:scale-95 uppercase tracking-widest"
                                onClick={handleSave}
                            >
                                {saving ? "UPDATING..." : "SAVE CHANGES"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

}
export default NoteDetailPage;