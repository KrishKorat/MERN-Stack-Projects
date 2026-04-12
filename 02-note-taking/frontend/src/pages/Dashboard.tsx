import { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";


function Dashboard() {
    const [notes, setNotes] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchNotes = async() => {
        try {
            const res = await API.get("/notes");
            setNotes(res.data);
        }
        catch (err) {
            console.error("Failed to fetch notes");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchNotes();
    }, []);


    return(
        <>
            <Navbar />

            <div className="p-6">
                {loading ? (
                <p>Loading...</p>
                ) : notes.length === 0 ? (
                <p>No notes yet</p>
                ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {notes.map((note) => (
                    <div
                        key={note._id}
                        className="p-4 bg-white rounded-xl shadow"
                    >
                        <h3 className="font-semibold">{note.title}</h3>
                        <p className="text-sm text-gray-500">
                        {note.category}
                        </p>
                    </div>
                    ))}
                </div>
                )}
            </div>

            {/* Floating Button */}
            <button className="fixed bottom-6 right-6 bg-indigo-500 text-white w-14 h-14 rounded-full text-xl shadow-lg">
                +
            </button>
        </>

    )
}

export default Dashboard;