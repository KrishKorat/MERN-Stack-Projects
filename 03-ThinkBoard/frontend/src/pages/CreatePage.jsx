import { ArrowLeftIcon } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router";
import api from "../lib/axios";


const CreatePage = () => {

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!title.trim() || !content.trim()) {
            toast.error("All fields are required");
            return;
        }
        setLoading(true);

        try {
            await api.post("/notes", {
                title, 
                content,
            });

            toast.success("Note created successfully!");
            navigate("/");
        }
        catch(err) {
            console.log("Error creating note", err);
            if (err.response.status === 429) {
                toast.error("Slow down! You're creating notes too fast", {
                duration: 4000,
                icon: "💀",
                });
            } else {
                toast.error("Failed to create note");
            }
        }
        finally {
            setLoading(false);
        }
    };



    return (
        <div className="min-h-screen bg-[#F5F7FA] flex items-center justify-center px-4 py-12">
            <div className="w-full max-w-2xl">
                <Link to="/" className="inline-flex items-center gap-2 text-[#2A5ACC] hover:text-[#1E3A8A] mb-10 group transition-all">
                    <ArrowLeftIcon className="size-5 group-hover:-translate-x-1 transition-transform" />
                    <span className="font-black uppercase tracking-[0.3em] text-[11px]">Back to Collection</span>
                </Link>

                <div className="bg-white rounded-[4rem] shadow-[0_60px_100px_rgba(30,58,138,0.1)] border border-[#3A77FF]/10 p-10 md:p-20">
                    <div className="text-center mb-16">
                        <h2 className="text-6xl font-serif italic text-[#1E3A8A] font-bold">New Entry</h2>
                        <div className="w-20 h-[3px] bg-[#FF4D4D] mx-auto mt-6 mb-4 rounded-full" />
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-12">
                        <div className="space-y-4">
                            <label className="block text-[#1E3A8A] font-black uppercase tracking-[0.4em] text-[10px] ml-4">Subject</label>
                            <input
                                type="text"
                                placeholder="Title your thoughts..."
                                className="w-full bg-transparent border-b-2 border-[#1E3A8A]/20 focus:border-[#1E3A8A] px-4 py-4 text-4xl font-serif italic text-[#1E3A8A] placeholder:text-[#1E3A8A]/30 transition-all outline-none"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                            />
                        </div>

                        <div className="space-y-4">
                            <label className="block text-[#1E3A8A] font-black uppercase tracking-[0.4em] text-[10px] ml-4">The Content</label>
                            <textarea
                                placeholder="Write with conviction..."
                                className="w-full bg-[#1E3A8A]/5 border border-[#1E3A8A]/10 rounded-[3rem] p-10 text-[#1E3A8A] text-xl leading-relaxed placeholder:text-[#1E3A8A]/40 min-h-[300px] outline-none focus:bg-white focus:ring-2 focus:ring-[#1E3A8A]/10 transition-all resize-none shadow-inner"
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                required
                            />
                        </div>

                        <div className="flex justify-center pt-6">
                            <button
                                type="submit"
                                className="bg-[#1E3A8A] text-white px-20 py-5 rounded-full font-black text-lg shadow-[0_20px_40px_rgba(30,58,138,0.3)] hover:-translate-y-1 hover:shadow-[0_25px_50px_rgba(30,58,138,0.4)] transition-all active:scale-95"
                            >
                                {loading ? "SAVING..." : "CREATE NOTE"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
export default CreatePage;