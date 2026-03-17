import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router";
import api from "../lib/axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";


export default function EditBlog() {

    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("");
    const [content, setContent] = useState("");
    const [read, setRead] = useState("");
    const [image, setImage] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const {id} = useParams();
    

    useEffect(() => {
        const getBlog = async () => {
            setLoading(true);
            try {
                const res = await api.get(`/blogs/${id}`);
                setCategory(res.data.category);
                setTitle(res.data.title);
                setContent(res.data.content);
                setRead(res.data.read);
                setImage(res.data.image);
                // console.log(res.data);
            }
            catch(err) {
                console.error("Error while fetching the blog in edit section: ", err.message);
            }
            finally {
                setLoading(false);
            }
        }
        getBlog();
    }, [id]);


    const handleUpdate = async (e) => {
        e.preventDefault();
        
        if (!title.trim() || !category.trim() || !content.trim()) {
            alert("All feilds are required");
            return;
        }
        setLoading(true);

        try {
            const blog = {
                title: title,
                category: category,
                content: content,
                read: read,
                image: image,
            }
            await api.put(`/blogs/${id}`, blog);
            navigate(`/blogs/${id}`);
        }
        catch(err) {
            console.error("Error occured while updating the blog: ", err.message);
        }
        finally {
            setLoading(false);
        }
    }

    if (loading) {
        return <div className="min-h-screen">Loading...</div>
    }

    
    return (
    <div>
    <Navbar />
        <div className="min-h-screen bg-neutral-50 text-neutral-900">

        {/* HEADER */}
        <div className="max-w-5xl mx-auto px-6 py-6 flex items-center justify-between">
            <div>
                <h1 className="text-xl font-semibold tracking-tight">
                    Edit Article
                </h1>
                <p className="text-sm text-neutral-500 mt-1">
                    Revisions are part of the process.
                </p>
            </div>

            <span className="text-xs uppercase tracking-widest text-blue-800">
                Draft
            </span>
        </div>

        {/* FORM */}
        <main className="max-w-5xl mx-auto px-6 py-16">
            <form onSubmit={handleUpdate} className="space-y-14">

                {/* TITLE */}
                <section>
                    <label className="block text-xs uppercase tracking-widest text-neutral-500 mb-3">
                        Title
                    </label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
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
                        rows="14"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        className="w-full border border-neutral-300 bg-white px-5 py-4 text-sm leading-relaxed focus:outline-none focus:border-neutral-600 transition resize-none"
                    />
                </section>

                {/* ACTIONS */}
                <section className="flex items-center justify-between pt-10 border-t border-neutral-200">

                    <span className="text-sm text-neutral-500">
                        All changes will be saved
                    </span>

                    <div className="flex gap-4">
                        <Link to={`/blogs/${id}`}>
                            <button
                                type="button"
                                className="px-6 py-3 text-sm font-medium border border-neutral-300 hover:border-neutral-500 transition"
                            >
                                Discard Changes
                            </button>
                        </Link>
                        <button
                            type="submit"
                            className="px-8 py-3 text-sm font-medium bg-blue-800 text-white hover:bg-blue-900 transition"
                        >
                            Update Article
                        </button>
                    </div>
                </section>
            </form>
        </main>
        </div>
    <Footer />
    </div>
    );
}
