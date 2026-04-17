import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { ITEM_CATEGORIES } from "../constants/categories";





export default function AddItem() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        startingPrice: "",
        category: "",
        image: ""
    });
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            await api.post("/items", {
                title: formData.title,
                description: formData.description,
                startingPrice: formData.startingPrice,
                category: formData.category,
                image: formData.image
            });
            navigate("/items");
        }
        catch(err) {
            setError(err.response?.data?.message || "Failed to add item");
        }
    };


    return (
        <section className="bg-[#FFF5F5] min-h-screen py-20 px-6">
            <div className="max-w-2xl mx-auto">
                {/* Header Section */}
                <div className="mb-12 text-center">
                    <span className="text-[#991B1B] text-[10px] font-black uppercase tracking-[0.4em] mb-3 block">Seller Studio</span>
                    <h2 className="text-5xl font-black text-[#111827] tracking-tighter">
                        List Your <span className="italic font-light text-[#991B1B]">Treasure</span>
                    </h2>
                </div>

                {error && (
                    <div className="bg-red-50 border border-red-100 text-[#991B1B] text-xs font-bold p-4 rounded-2xl mb-8 text-center">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="bg-white p-10 rounded-[2.5rem] shadow-2xl shadow-red-200/20 border border-red-50 space-y-6">
                    <div>
                        <label className="text-[12px] font-black text-[#991B1B] uppercase tracking-widest ml-1 mb-2 block">Item Title</label>
                        <input 
                            type="text"
                            name="title"
                            placeholder="e.g. Vintage 1970s Gold Watch"
                            className="w-full px-6 py-4 bg-[#FFFBFB] border-2 border-transparent focus:border-[#FCA5A5] focus:bg-white rounded-2xl outline-none transition-all font-medium text-[#111827]"
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div>
                        <label className="text-[12px] font-black text-[#991B1B] uppercase tracking-widest ml-1 mb-2 block">The Story (Description)</label>
                        <textarea 
                            name="description"
                            placeholder="Describe the history and condition..."
                            className="w-full px-6 py-4 bg-[#FFFBFB] border-2 border-transparent focus:border-[#FCA5A5] focus:bg-white rounded-2xl outline-none transition-all font-medium min-h-[150px] text-[#111827]"
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <label className="text-[12px] font-black text-[#991B1B] uppercase tracking-widest ml-1 mb-2 block">Category</label>
                            <select
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                className="w-full px-6 py-4 bg-[#FFFBFB] border-2 border-transparent focus:border-[#FCA5A5] focus:bg-white rounded-2xl outline-none transition-all font-bold text-[#111827] appearance-none cursor-pointer"
                                required
                            >
                                <option value="">Select Category</option>
                                {ITEM_CATEGORIES.map((cat) => (
                                    <option key={cat} value={cat}>{cat}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="text-[12px] font-black text-[#991B1B] uppercase tracking-widest ml-1 mb-2 block">Starting Bid ($)</label>
                            <input 
                                type="number"
                                name="startingPrice"
                                placeholder="0.00"
                                className="w-full px-6 py-4 bg-[#FFFBFB] border-2 border-transparent focus:border-[#FCA5A5] focus:bg-white rounded-2xl outline-none transition-all font-black text-[#111827]"
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label className="text-[12px] font-black text-[#991B1B] uppercase tracking-widest ml-1 mb-2 block">Image URL</label>
                        <input
                            type="url"
                            name="image"
                            placeholder="https://example.com/image.jpg"
                            value={formData.image}
                            onChange={handleChange}
                            className="w-full px-6 py-4 bg-[#FFFBFB] border-2 border-transparent focus:border-[#FCA5A5] focus:bg-white rounded-2xl outline-none transition-all font-medium text-[#111827]"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-[#991B1B] text-white py-5 rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl shadow-red-100 hover:bg-[#7F1D1D] hover:-translate-y-1 transition-all pt-6"
                    >
                        Launch Auction
                    </button>
                </form>
            </div>
        </section>
    );
}