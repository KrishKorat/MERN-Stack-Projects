import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api/axios";
import { isValidImage } from "../../utils/isValidImage";

export default function AdminItems() {
    const [items, setItems] = useState([]);

    useEffect(() => {
        api.get("/admin/items").then(res => setItems(res.data));
    }, []);

    const handleDelete = async (id) => {
        if (!window.confirm("Remove this item from the gallery?")) return;
        await api.delete(`/admin/items/${id}`);
        setItems(items.filter(i => i._id !== id));
    };

    return (
        <section className="bg-[#F8F9FF] min-h-screen py-16 px-8">
            <div className="max-w-7xl mx-auto">
                
                {/* Header Section */}
                <div className="flex justify-between items-center mb-12">
                    <div>
                        <h2 className="text-6xl font-black text-[#2D1B69] tracking-tighter mb-2">
                            Manage <span className="text-[#991B1B] font-light italic">Inventory</span>
                        </h2>
                        <p className="text-[10px] font-black uppercase tracking-[0.5em] text-[#991B1B]">System Administration</p>
                    </div>
                    <div className="bg-white px-8 py-5 rounded-[2rem] shadow-sm border border-[#F3F4F6]">
                        <p className="text-[#991B1B] text-[10px] font-black uppercase tracking-widest mb-1">Total Pieces</p>
                        <p className="text-3xl font-black text-[#2D1B69]">{items.length}</p>
                    </div>
                </div>

                {/* Items Table Container */}
                <div className="bg-white rounded-[3rem] shadow-[0_20px_50px_rgba(167,139,250,0.08)] border border-[#F3F4F6] overflow-hidden">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-[#FAF9FF] border-b border-[#F3F4F6]">
                                <th className="px-10 py-8 text-[14px] font-black uppercase tracking-[0.2em] text-[#991B1B]">Item Detail</th>
                                <th className="px-6 py-8 text-[14px] font-black uppercase tracking-[0.2em] text-[#991B1B]">Status</th>
                                <th className="px-6 py-8 text-[14px] font-black uppercase tracking-[0.2em] text-[#991B1B]">Price</th>
                                <th className="px-10 py-8 text-[14px] font-black uppercase tracking-[0.2em] text-[#991B1B] text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#F8F9FF]">
                            {items.map(item => (
                                <tr key={item._id} className="group hover:bg-[#FDFDFF] transition-all">
                                    <td className="px-10 py-6">
                                        <div className="flex items-center gap-6">
                                            <div className="h-16 w-16 bg-[#F3F4F6] rounded-2xl overflow-hidden border-4 border-white shadow-sm flex-shrink-0">
                                                {isValidImage(item.image) ? (
                                                    <img
                                                        src={item.image}
                                                        className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all"
                                                        alt="thumb"
                                                    />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center text-[10px] text-gray-400 italic">
                                                        No Image
                                                    </div>
                                                )}
                                            </div>

                                            <div>
                                                <p className="text-lg font-black text-[#2D1B69] tracking-tight">{item.title}</p>
                                                <p className="text-[14px] font-bold text-[#991B1B] uppercase">{item.owner?.username}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-6">
                                        <div className="flex items-center gap-2">
                                            <div className={`h-2 w-2 rounded-full ${item.isActive ? 'bg-[#34D399]' : 'bg-[#FDA4AF]'}`} />
                                            <span className={`text-[14px] font-black uppercase tracking-widest ${item.isActive ? 'text-[#059669]' : 'text-[#E11D48]'}`}>
                                                {item.isActive ? 'Live' : 'Ended'}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-6 font-black text-[#222222] text-sm">
                                        ${item.currentPrice}
                                    </td>
                                    <td className="px-10 py-6 text-right">
                                        <div className="flex justify-end gap-3 opacity-40 group-hover:opacity-100 transition-opacity">
                                            <Link 
                                                to={`/admin/items/${item._id}/edit`}
                                                className="bg-[#991B1B] text-white px-5 py-2 rounded-xl text-[12px] font-black uppercase tracking-widest hover:bg-[#7F1D1D] shadow-sm transition-colors"
                                            >
                                                Edit
                                            </Link>
                                            <button 
                                                onClick={() => handleDelete(item._id)}
                                                className="bg-white text-[#991B1B] border border-[#991B1B] px-5 py-2 rounded-xl text-[12px] font-black uppercase tracking-widest hover:bg-[#FFF5F5] transition-colors"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    );
}