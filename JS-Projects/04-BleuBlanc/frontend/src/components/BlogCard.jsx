import {Link} from "react-router";
import api from "../lib/axios";

export default function BlogCard({blog, setBlogs}) {

    const handleDelete = async (id) => {

        if (!window.confirm("Are you sure you want to delete this?")) return;

        try {
            await api.delete(`/blogs/${blog._id}`);
            setBlogs((prev) => prev.filter(blog => blog._id !== id));
        }
        catch(err) {
            console.error("Error occured while deleting the blog: ", err.message);
        }
    }


    return(
            <article
                className="group border border-neutral-200 bg-white p-6 hover:border-neutral-400 transition"
                >
                    <Link
                        to={`/blogs/${blog._id}`}
                    >
                        <span className="text-xs uppercase tracking-wider text-red-700">
                            {blog.category}
                        </span>

                        <h4 className="mt-3 mb-4 text-lg font-medium leading-snug group-hover:underline">
                            {blog.title}
                        </h4>

                        <p className="text-sm text-neutral-600 leading-relaxed line-clamp-3">
                            {blog.content}
                        </p>
                    </Link>

                <div className="mt-6 flex items-center justify-between text-sm font-medium text-blue-800">
                    <div>
                        Read article →
                    </div>
                    <div className="flex gap-3">
                        <Link 
                            to={`/blogs/${blog._id}/edit`} 
                            className="text-blue-700 hover:text-blue-900 transition">
                            Edit
                        </Link>
                        
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                handleDelete(blog._id)
                            }}
                            className="text-red-700 hover:text-red-900 transition"
                        >
                            Delete
                        </button>
                    </div>
                </div>
            </article>
    );
}