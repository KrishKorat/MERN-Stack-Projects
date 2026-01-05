import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import Hero from "../components/Hero.jsx";

import BlogCard from "../components/BlogCard.jsx";
import api from "../lib/axios.js";
import { useState, useEffect } from "react";

export default function HomePage() {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const res = await api.get("/blogs");
                setBlogs(res.data);
                // console.log(res.data);
            }
            catch(err) {
                console.log("Error while fetching blogs: ", err.message);
            }
            finally {
                setLoading(false);
            }
        }
        fetchBlogs();
    }, []);

    if(loading) {
        return(
            <h1 className="flex justify-center items-center text-blue-800 min-h-screen">Loading...</h1>
        )
    }

    return (
        <div className="min-h-screen bg-neutral-50 text-neutral-900 font-sans">
            <Navbar />
            <Hero />

            <section className="max-w-7xl mx-auto px-6 pb-24">
                <h3 className="text-lg font-semibold mb-10">
                    Latest Articles
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                {
                    blogs.length > 0 && (
                        blogs.map((blog) => (
                            <BlogCard key={blog._id} blog={blog} setBlogs={setBlogs}/>
                        ))
                    )
                }
                </div>
            </section>

            <Footer />
        </div>
    );
}
