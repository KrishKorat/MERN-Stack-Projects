import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import RateLimitUI from "../components/RateLimitUI";
import api from "../lib/axios";
import toast from "react-hot-toast";
import NoteCard from "../components/NoteCard";
import NotesNotFound from "../components/NotesNotFound";


const HomePage = () => {

    const [isRateLimited, setIsRateLimited] = useState(false);
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const fetchNotes = async () => {
            try {
                const res = await api.get("/notes");
                setNotes(res.data);
                setIsRateLimited(false);
                // console.log(res.data)
            }
            catch(err) {
                console.log("Error fetching notes");
                console.log(err.message);

                if(err.response?.status === 429) {
                    setIsRateLimited(true);
                } else {
                    toast.error("Failed to load notes");
                }
            }
            finally {
                setLoading(false);
            }
        };

        fetchNotes();
    }, []);

    return(
        <div className="min-h-screen bg-[#F5F7FA]"> {/* Subtle off-white background */}
            <Navbar />
            {isRateLimited && <RateLimitUI />}

            <div className="max-w-7xl mx-auto px-8 py-16">
                {loading && (
                    <div className="flex flex-col items-center justify-center py-32 space-y-6">
                        {/* Custom Spinner - no hospital vibes */}
                        <div className="size-14 border-4 border-[#3A77FF]/10 border-t-[#3A77FF] rounded-full animate-spin"></div>
                        <p className="text-[#3A77FF] font-serif italic text-2xl tracking-wide">Consulting the archives...</p>
                    </div>
                )}

                {notes.length === 0 && !isRateLimited && !loading && <NotesNotFound />}

                {notes.length > 0 && !isRateLimited && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                        {notes.map((note) => (
                            <NoteCard key={note._id} note={note} setNotes={setNotes} />
                        ))}
                    </div>
                )}
            </div>

            {/* Elegant Footer Detail */}
            <footer className="py-12 flex justify-center gap-2 opacity-20">
                <div className="size-1.5 rounded-full bg-[#FF4D4D]"></div>
                <div className="size-1.5 rounded-full bg-[#3A77FF]"></div>
                <div className="size-1.5 rounded-full bg-[#FF4D4D]"></div>
            </footer>
        </div>
    );
}

export default HomePage;