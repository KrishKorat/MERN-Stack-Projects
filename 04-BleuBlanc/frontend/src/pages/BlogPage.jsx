import { useEffect } from "react";
import { useState } from "react";
import api from "../lib/axios";
import { Link, useParams, useNavigate } from "react-router";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { formatDate } from "../lib/utils";


export default function BlogPage() {

    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();
    const {id} = useParams();


    const handleDelete = async (e) => {
        e.preventDefault();
        if (!window.confirm("Are you sure you want to delete this blog?")) return;
        try {
            await api.delete(`/blogs/${id}`);
            navigate("/");
        }
        catch(err) {
            console.error("Error occured while deleting the blog: ", err.message);
        }
    }

    
    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const res = await api.get(`/blogs/${id}`);
                setBlog(res.data);
                // console.log(res.data);
            }
            catch(err) {
                console.error("Error while fetching the blog: ", err.message);
            }
            finally {
                setLoading(false);
            }
        }
        fetchBlog();
    }, [id]);



    if (loading) {
        return(
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-neutral-500">Loading article...</p>
            </div>
        );
    }

    return (
    <div>
        <Navbar />
        <div className="min-h-screen bg-neutral-50 text-neutral-900">

        {/* TOP BAR */}
        <div className="max-w-4xl mx-auto px-6 py-5 flex items-center justify-between">
            <Link to={"/"}>
                <span className="text-sm text-neutral-500">
                    ← Back to Articles
                </span>
            </Link>
            <span className="text-sm font-medium text-blue-800">
                {blog.category}
            </span>
        </div>

        {/* ARTICLE */}
        <article className="max-w-3xl mx-auto px-6 py-20">

            {/* META */}
            <div className="mb-10">
                <p className="text-xs uppercase tracking-widest text-red-700 mb-4">
                    {blog.category}
                </p>
                <h1 className="text-4xl md:text-5xl font-semibold leading-tight mb-6">
                    {blog.title}
                </h1>
                <div className="flex flex-wrap items-center gap-4 text-sm text-neutral-500">
                    <span>{formatDate(new Date(blog.createdAt))}</span>
                    <span>•</span>
                    <span>{blog.read}</span>
                </div>
            </div>

            <div className="mb-16">
                <img
                    src={blog.image}
                    alt="Article cover"
                    className="w-full h-[420px] object-cover border border-neutral-200"
                />
            </div>

            {/* CONTENT */}
            <section className="prose prose-neutral max-w-none prose-p:leading-relaxed prose-p:text-neutral-700 prose-h2:font-semibold prose-h2:tracking-tight prose-h2:mt-16 prose-h2:mb-6 prose-blockquote:border-l-4 prose-blockquote:border-blue-800 prose-blockquote:text-neutral-600">
                <pre>
                    {blog.content}
                </pre>
                
            </section>

            {/* FOOTER META */}
            <footer className="mt-20 pt-10 border-t border-neutral-200">
            <div className="flex items-center justify-between">
                <div className="text-sm text-neutral-500">
                Published under <span className="font-medium text-neutral-700">{blog.meta}</span>
                </div>

                <div className="flex gap-6 text-sm font-medium">
                <Link to={`/blogs/${id}/edit`}>
                    <button className="text-blue-700 hover:text-blue-900 transition">
                        Edit
                    </button>
                </Link>
                
                <button 
                    onClick={(e) => {
                        handleDelete(e);
                    }}
                    className="text-red-700 hover:text-red-900 transition"
                >
                    Delete
                </button>
                </div>
            </div>
            </footer>

        </article>

        </div>
    <Footer />
    </div>
    );
}
