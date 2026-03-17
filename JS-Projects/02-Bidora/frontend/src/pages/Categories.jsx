import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";


export default function Categories() {
    const [categories, setCategories] = useState([]);


    useEffect(() => {
        const fetchCategories = async () => {
            const res = await api.get("/items/categories/all");
            setCategories(res.data);
        };
        fetchCategories();
    }, []);

    

    // Helper to add some visual flair to categories
    const getEmoji = (cat) => {
        const c = cat.toLowerCase();
        if (c.includes('art')) return "🎨";
        if (c.includes('jewelry') || c.includes('watch')) return "💎";
        if (c.includes('fashion') || c.includes('clothing')) return "👗";
        if (c.includes('electronics')) return "🔌";
        if (c.includes('antique')) return "🏺";
        return "✨";
    };

    return (
        <section className="bg-[#FFFAFA] min-h-screen py-20 px-6">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <span className="text-[#991B1B] text-xs font-black tracking-[0.4em] uppercase mb-3 block">
                        Curated Collections
                    </span>
                    <h2 className="text-5xl font-black text-[#111827] tracking-tighter">
                        Browse <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-[#991B1B] to-[#DC2626]">Categories</span>
                    </h2>
                </div>

                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {categories.map((cat) => (
                        <Link
                            key={cat}
                            to={`/categories/${cat}`}
                            className="group relative bg-white border border-gray-100 p-10 rounded-[2.5rem] text-center transition-all duration-500 hover:shadow-2xl hover:shadow-red-100/50 hover:-translate-y-2 overflow-hidden"
                        >
                            {/* Decorative background element on hover */}
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#991B1B] to-[#DC2626] opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            
                            <div className="text-4xl mb-4 group-hover:scale-125 transition-transform duration-500">
                                {getEmoji(cat)}
                            </div>
                            
                            <h3 className="text-xl font-black text-[#111827] uppercase tracking-tighter group-hover:text-[#991B1B] transition-colors">
                                {cat}
                            </h3>
                            
                            <p className="text-[#9CA3AF] text-[10px] font-bold uppercase tracking-widest mt-2">
                                View Collection →
                            </p>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
