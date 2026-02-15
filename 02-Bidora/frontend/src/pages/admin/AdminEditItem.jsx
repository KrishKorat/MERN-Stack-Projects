import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../api/axios";
import { ITEM_CATEGORIES } from "../../constants/categories";



export default function AdminEditItem() {
    const {id} = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        category: "",
        isActive: true,
        image: ""
    });

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchItem = async () => {
            try {
                const res = await api.get("/admin/items");
                const item = res.data.find((i) => i._id === id);

                if (!item) {
                    setError("Item not found");
                    return;
                }

                setFormData({
                    title: item.title,
                    description: item.description,
                    category: item.category,
                    isActive: item.isActive,
                    image: item.image || ""
                });
            }
            catch(err) {
                setError("Failed to load item");
            }
            finally {
                setLoading(false);
            }
        };

        fetchItem();
    }, [id]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            await api.put(`/admin/items/${id}`, formData);
            navigate("/admin/items");
        }
        catch(err) {
            setError(err.response?.data?.message || "Update failed");
        }
    }

    if (loading) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center bg-[#F8F9FF]">
                {/* Animated Logo/Icon */}
                <div className="relative mb-8">
                    {/* Outer soft pulse ring */}
                    <div className="absolute inset-0 rounded-full bg-[#E0D7FF] animate-ping opacity-20"></div>
                    
                    {/* Main icon container */}
                    <div className="relative h-20 w-20 bg-white rounded-full flex items-center justify-center shadow-2xl shadow-purple-200 border border-purple-50">
                        <span className="text-3xl animate-bounce">💎</span>
                    </div>
                </div>

                {/* Typography */}
                <div className="text-center">
                    <h3 className="text-[#2D1B69] font-black text-xl tracking-tighter mb-2">
                        Curating <span className="italic font-light text-[#A78BFA]">Collection</span>
                    </h3>
                    
                    {/* Progress track */}
                    <div className="w-48 h-1 bg-[#F3F4F6] rounded-full mx-auto overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-[#E0D7FF] to-[#FCE7F3] w-1/3 rounded-full animate-[loading_1.5s_infinite_ease-in-out]"></div>
                    </div>
                    
                    <p className="mt-4 text-[10px] font-black uppercase tracking-[0.4em] text-[#C4B5FD] animate-pulse">
                        Please Wait
                    </p>
                </div>

                {/* Custom Animation Keyframes (Add to your global CSS or Tailwind config) */}
                <style dangerouslySetInnerHTML={{ __html: `
                    @keyframes loading {
                        0% { transform: translateX(-100%); }
                        100% { transform: translateX(300%); }
                    }
                `}} />
            </div>
        );
    }


    return (
    <section className="bg-[#F8F9FF] min-h-screen py-20 px-6">
        <div className="max-w-2xl mx-auto">
            {/* Header Section */}
            <div className="mb-12 text-center md:text-left">
                <span className="text-[#991B1B] text-[10px] font-black uppercase tracking-[0.4em] mb-3 block">Master Inventory</span>
                <h2 className="text-5xl font-black text-[#111827] tracking-tighter">
                    Admin <span className="italic font-light text-[#991B1B]">Override</span>
                </h2>
            </div>

            {error && (
                <div className="bg-red-50 border border-red-100 text-[#991B1B] text-[10px] font-black uppercase tracking-widest p-4 rounded-2xl mb-8 text-center">
                    {error}
                </div>
            )}

            <form
                onSubmit={handleSubmit}
                className="bg-white p-10 rounded-[3rem] shadow-[0_20px_50px_rgba(153,27,27,0.05)] border border-[#F3F4F6] space-y-8"
            >
                {/* Title Input */}
                <div>
                    <label className="text-[12px] font-black text-[#991B1B] uppercase tracking-widest ml-1 mb-3 block">Item Name</label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        className="w-full px-6 py-4 bg-[#F8F9FF] border-2 border-transparent focus:border-red-100 focus:bg-white rounded-2xl outline-none transition-all font-bold text-[#111827]"
                        required
                    />
                </div>

                {/* Description Input */}
                <div>
                    <label className="text-[12px] font-black text-[#991B1B] uppercase tracking-widest ml-1 mb-3 block">Public Description</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        rows="4"
                        className="w-full px-6 py-4 bg-[#F8F9FF] border-2 border-transparent focus:border-red-100 focus:bg-white rounded-2xl outline-none transition-all font-medium text-gray-600"
                        required
                    />
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    {/* Category Selection */}
                    <div>
                        <label className="text-[12px] font-black text-[#991B1B] uppercase tracking-widest ml-1 mb-3 block">Classification</label>
                        <select
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            className="w-full px-6 py-4 bg-[#F8F9FF] border-2 border-transparent focus:border-red-100 focus:bg-white rounded-2xl outline-none transition-all font-black text-[#111827] appearance-none cursor-pointer"
                            required
                        >
                            <option value="">Select Category</option>
                            {ITEM_CATEGORIES.map((cat) => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
                        </select>
                    </div>

                    {/* Status Toggle Card */}
                    <div>
                        <label className="text-[12px] font-black text-[#991B1B] uppercase tracking-widest ml-1 mb-3 block">Visibility</label>
                        <label className={`flex items-center justify-between px-6 py-4 rounded-2xl border-2 transition-all cursor-pointer ${formData.isActive ? 'bg-green-50 border-green-100' : 'bg-gray-50 border-gray-100'}`}>
                            <span className={`text-xs font-black uppercase tracking-widest ${formData.isActive ? 'text-green-600' : 'text-gray-400'}`}>
                                {formData.isActive ? 'Auction Live' : 'Auction Paused'}
                            </span>
                            <input
                                type="checkbox"
                                name="isActive"
                                checked={formData.isActive}
                                onChange={handleChange}
                                className="w-5 h-5 accent-green-500"
                            />
                        </label>
                    </div>
                </div>

                {/* Image URL Section */}
                <div>
                    <label className="text-[12px] font-black text-[#991B1B] uppercase tracking-widest ml-1 mb-3 block">
                        Update Image URL
                    </label>

                    <input
                        type="url"
                        name="image"
                        value={formData.image}
                        onChange={handleChange}
                        placeholder="https://example.com/image.jpg"
                        className="w-full px-5 py-4 rounded-2xl border border-red-50 text-sm focus:outline-none focus:ring-2 focus:ring-red-100"
                    />
                </div>


                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full bg-[#991B1B] text-white py-6 rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] shadow-xl shadow-red-100 hover:bg-[#7F1D1D] hover:-translate-y-1 transition-all"
                >
                    Apply Administrative Changes
                </button>
                </form>
            </div>
    </section>
    );
}