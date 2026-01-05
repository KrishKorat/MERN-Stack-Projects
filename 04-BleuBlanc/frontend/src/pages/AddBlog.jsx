import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import api from "../lib/axios";
import { useState } from "react";
import { useNavigate } from "react-router";



export default function AddBlog() {

    const [category, setCategory] = useState("");
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [read, setRead] = useState("");
    const [image, setImage] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!category.trim() || !title.trim() || !content.trim() || !read.trim() || !image.trim()) {
            window.alert("All fields are required");
            return;
        }
        setLoading(true);

        try {
            await api.post("/blogs", {
                category, title, content, read, image
            });
            navigate("/");
        }
        catch(err) {
            console.error("Error while adding blog: ", err.message);
        }
        finally {
            setLoading(false);
        }
        
    }

    return(
    <div>
        <Navbar />

        <div className="min-h-screen bg-neutral-50 text-neutral-900">

            {/* HEADER */}
            <header className="border-b border-neutral-200 bg-white">
                <div className="max-w-5xl mx-auto px-6 py-6">
                    <h1 className="text-xl font-semibold tracking-tight">
                        New Article
                    </h1>
                    <p className="text-sm text-neutral-500 mt-1">
                        Write with clarity. Publish with intention.
                    </p>
                </div>
            </header>

            {/* FORM */}
            <main className="max-w-5xl mx-auto px-6 py-16">
                <form onSubmit={handleSubmit} className="space-y-14">

                    {/* TITLE */}
                    <section>
                        <label className="block text-xs uppercase tracking-widest text-blue-800 mb-3">
                            Title
                        </label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Enter article title"
                            className="w-full border-b border-neutral-300 bg-transparent py-3 text-2xl font-medium focus:outline-none focus:border-blue-800 transition"
                        />
                    </section>

                    {/* META */}
                    <section className="grid grid-cols-1 md:grid-cols-3 gap-8">

                        <div>
                            <label className="block text-xs uppercase tracking-widest text-neutral-500 mb-2">
                                Category
                            </label>
                            <select 
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                className="w-full border border-neutral-300 bg-white px-4 py-3 text-sm focus:outline-none focus:border-blue-800 transition"
                            >
                                <option value="" disabled>Select category</option>
                                <option>Essay</option>
                                <option>Design</option>
                                <option>Technology</option>
                                <option>Culture</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-xs uppercase tracking-widest text-neutral-500 mb-2">
                                Read Time
                            </label>
                            <input
                                type="text"
                                value={read}
                                onChange={(e) => setRead(e.target.value)}
                                placeholder="e.g. 5 min"
                                className="w-full border border-neutral-300 px-4 py-3 text-sm focus:outline-none focus:border-blue-800 transition"
                            />
                            </div>

                            <div>
                                <label className="block text-xs uppercase tracking-widest text-neutral-500 mb-2">
                                    Cover Image URL
                                </label>
                                <input
                                    type="text"
                                    value={image}
                                    onChange={(e) => setImage(e.target.value)}
                                    placeholder="https://"
                                    className="w-full border border-neutral-300 px-4 py-3 text-sm focus:outline-none focus:border-blue-800 transition"
                                />
                            </div>
                    </section>

                    {/* CONTENT */}
                    <section>
                        <label className="block text-xs uppercase tracking-widest text-red-700 mb-3">
                            Content
                        </label>
                        <textarea
                            rows="12"
                            placeholder="Start writing here..."
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            className="w-full border border-neutral-300 bg-white px-5 py-4 text-sm leading-relaxed focus:outline-none focus:border-neutral-600 transition resize-none"
                        />
                        <p className="text-xs text-neutral-400 mt-3">
                            Tip: Short paragraphs improve reading rhythm.
                        </p>
                    </section>

                    {/* ACTIONS */}
                    <section className="flex items-center justify-between pt-10 border-t border-neutral-200">
                        <span className="text-sm text-neutral-500">
                            Drafts are saved automatically
                        </span>
                        <div className="flex gap-4">
                            <button
                                type="submit"
                                className="px-8 py-3 text-sm font-medium bg-blue-800 text-white hover:bg-blue-900 transition"
                            >
                                {loading ? "Publishing" : "Publish"}
                            </button>
                        </div>
                    </section>

                </form>
            </main>
        </div>

    <Footer/>
    </div>
    );
}