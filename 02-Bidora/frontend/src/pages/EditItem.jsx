import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import api from "../api/axios";
import { ITEM_CATEGORIES } from "../constants/categories";
import { isValidImage } from "../utils/isValidImage";




export default function EditItem() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [item, setItem] = useState(null);
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        category: "",
        images: ""
    });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const fetchItem = async () => {
            try {
                const res = await api.get(`/items/${id}`);
                setItem(res.data.item);

                setFormData({
                    title: res.data.item.title,
                    description: res.data.item.description,
                    category: res.data.item.category,
                    images: res.data.item.image || ""
                });

            }
            catch(err) {
                setError("Failed to load item");
            }
            finally {
                setLoading(false);
            }
        }
        fetchItem();
    }, [id]);


    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            await api.put(`/items/${id}`, {
                title: formData.title,
                description: formData.description,
                category: formData.category,
                image: formData.image
            });

            // force fresh data
            const res = await api.get(`/items/${id}`);
            setItem(res.data.item);

            navigate(`/items/${id}`);

        } 
        catch (err) {
            setError(err.response?.data?.message || "Update failed");
        }
    };


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
        <section className="bg-[#FFF5F5] min-h-screen py-20 px-6">
            <div className="max-w-2xl mx-auto">
                <div className="mb-12">
                    <Link to={`/items/${item._id}`} className="text-[#991B1B] text-[10px] font-black uppercase tracking-widest hover:text-[#7F1D1D] transition-colors flex items-center gap-2">
                        <span className="text-lg">←</span> Back to Item
                    </Link>
                    <h2 className="text-5xl font-black text-[#111827] tracking-tighter mt-4">
                        Refine <span className="italic font-light text-[#991B1B]">Listing</span>
                    </h2>
                </div>

                {error && (
                    <div className="bg-red-50 border border-red-100 text-[#991B1B] text-xs font-bold p-4 rounded-2xl mb-8 text-center">
                        {error}
                    </div>
                )}

                {/* Current Visual Preview */}
                <div className="flex gap-4 mb-8 overflow-x-auto pb-4">
                    <div className="flex-shrink-0 relative">
                        {isValidImage(item.image) ? (
                            <img
                                src={item.image}
                                alt="Current"
                                className="h-32 w-32 object-cover rounded-[1.5rem] border-4 border-white shadow-md"
                            />
                        ) : null}
                        <span className="absolute -top-2 -left-2 bg-[#991B1B] text-white text-[8px] font-black px-2 py-1 rounded-md uppercase">Current</span>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="bg-white p-10 rounded-[2.5rem] shadow-2xl shadow-red-200/20 border border-red-50 space-y-6">
                    <div>
                        <label className="text-[12px] font-black text-[#991B1B] uppercase tracking-widest ml-1 mb-2 block">Update Title</label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            className="w-full px-6 py-4 bg-[#FFFBFB] border-2 border-transparent focus:border-[#FCA5A5] focus:bg-white rounded-2xl outline-none transition-all font-medium text-[#111827]"
                            required
                        />
                    </div>

                    <div>
                        <label className="text-[12px] font-black text-[#991B1B] uppercase tracking-widest ml-1 mb-2 block">Update Description</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            rows="5"
                            className="w-full px-6 py-4 bg-[#FFFBFB] border-2 border-transparent focus:border-[#FCA5A5] focus:bg-white rounded-2xl outline-none transition-all font-medium text-[#111827]"
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
                                {ITEM_CATEGORIES.map((cat) => (
                                    <option key={cat} value={cat}>{cat}</option>
                                ))}
                            </select>
                        </div>

                        <div className="bg-[#FFFBFB] p-4 rounded-2xl border border-dashed border-red-100">
                            <p className="text-[10px] font-black text-red-300 uppercase tracking-widest mb-1">Starting Price</p>
                            <p className="text-xl font-black text-[#111827] opacity-40 cursor-not-allowed">${item.startingPrice}</p>
                            <p className="text-[9px] font-bold text-[#991B1B] mt-1 italic uppercase tracking-tighter">Locked after listing</p>
                        </div>
                    </div>

                    <div>
                        <label className="text-[12px] font-black text-[#991B1B] uppercase tracking-widest ml-1 mb-2 block">Replace Image URL</label>
                        <input
                            type="url"
                            name="image"
                            value={formData.image}
                            onChange={handleChange}
                            placeholder="https://example.com/new-image.jpg"
                            className="w-full px-6 py-4 bg-[#FFFBFB] border-2 border-transparent focus:border-[#FCA5A5] focus:bg-white rounded-2xl outline-none transition-all font-medium text-[#111827]"
                        />
                    </div>

                    <button className="w-full bg-[#991B1B] text-white py-5 rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl shadow-red-100 hover:bg-[#7F1D1D] hover:-translate-y-1 transition-all pt-6">
                        Save Changes
                    </button>
                </form>
            </div>
        </section>
    );
}