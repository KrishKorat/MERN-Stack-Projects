import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api/axios";
import { useAuth } from "../../context/AuthContext";

export default function AdminUsers() {
    const { user: loggedInUser } = useAuth();
    const [users, setUsers] = useState([]);

    useEffect(() => {
        api.get("/admin/users").then(res => setUsers(res.data));
    }, []); // Added dependency array to fix infinite loop

    const handleDelete = async (id) => {
        if (!window.confirm("Remove this member from the community?")) return;
        try {
            await api.delete(`/admin/users/${id}`);
            setUsers(users.filter(u => u._id !== id));
        } catch (err) {
            alert(err.response?.data?.message || "Delete failed");
        }
    };

    return (
        <section className="bg-[#F8F9FF] min-h-screen py-16 px-8">
            <div className="max-w-6xl mx-auto">
                
                {/* Header Section */}
                <div className="flex justify-between items-end mb-12">
                    <div>
                        <h2 className="text-6xl font-black text-[#2D1B69] tracking-tighter mb-2">
                            Member <span className="text-[#991B1B] font-light italic">Directory</span>
                        </h2>
                        <p className="text-[10px] font-black uppercase tracking-[0.5em] text-[#991B1B]">Access Control & Permissions</p>
                    </div>
                    <div className="bg-white px-8 py-5 rounded-[2rem] shadow-sm border border-[#F3F4F6]">
                        <p className="text-[#991B1B] text-[10px] font-black uppercase tracking-widest mb-1">Total Members</p>
                        <p className="text-3xl font-black text-[#2D1B69]">{users.length}</p>
                    </div>
                </div>

                {/* Users Table */}
                <div className="bg-white rounded-[3rem] shadow-[0_20px_50px_rgba(167,139,250,0.08)] border border-[#F3F4F6] overflow-hidden">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-[#FAF9FF] border-b border-[#F3F4F6]">
                                <th className="px-10 py-8 text-[12px] font-black uppercase tracking-[0.2em] text-[#991B1B]">User Identity</th>
                                <th className="px-6 py-8 text-[12px] font-black uppercase tracking-[0.2em] text-[#991B1B]">Role</th>
                                <th className="px-6 py-8 text-[12px] font-black uppercase tracking-[0.2em] text-[#991B1B]">Status</th>
                                <th className="px-10 py-8 text-[12px] font-black uppercase tracking-[0.2em] text-[#991B1B] text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#F8F9FF]">
                            {users.map((u) => (
                                <tr key={u._id} className="group hover:bg-[#FDFDFF] transition-all">
                                    <td className="px-10 py-6">
                                        <div className="flex items-center gap-5">
                                            {/* Avatar Circle */}
                                            <div className="h-12 w-12 rounded-full bg-gradient-to-br from-red-50 to-red-100 flex items-center justify-center text-[#581C87] font-black text-xs shadow-inner">
                                                {u.username.substring(0, 2).toUpperCase()}
                                            </div>
                                            <div>
                                                <p className="text-lg font-black text-[#2D1B69] tracking-tight">
                                                    {u.username} {loggedInUser.id === u._id && <span className="text-[9px] ml-2 text-[#A78BFA] font-bold uppercase tracking-widest">(You)</span>}
                                                </p>
                                                <p className="text-xs text-[#C4B5FD] font-medium">{u.email}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-6">
                                        <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-[0.15em] border ${
                                            u.role === 'admin' 
                                            ? "bg-red-50 text-[#581C87] border-red-100" 
                                            : "bg-gray-50 text-gray-400 border-gray-100"
                                        }`}>
                                            {u.role}
                                        </span>
                                    </td>
                                    <td className="px-6 py-6">
                                        <span className="flex items-center gap-1.5">
                                            <span className="h-1.5 w-1.5 rounded-full bg-[#34D399]"></span>
                                            <span className="text-[10px] font-black uppercase tracking-widest text-[#059669]">Active</span>
                                        </span>
                                    </td>
                                    <td className="px-10 py-6 text-right">
                                        {/* Opacity set to 40% normally, 100% on group hover to match Items page */}
                                        <div className="flex justify-end gap-3 opacity-40 group-hover:opacity-100 transition-opacity duration-300">
                                            <Link
                                                to={`/admin/users/${u._id}/edit`}
                                                className="bg-[#991B1B] text-white px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-[#7F1D1D] shadow-sm transition-colors"
                                            >
                                                Edit
                                            </Link>
                                            
                                            {loggedInUser.id !== u._id && (
                                                <button
                                                    onClick={() => handleDelete(u._id)}
                                                    className="bg-white text-[#991B1B] border border-[#991B1B] px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-[#FFF5F5] transition-colors"
                                                >
                                                    Remove
                                                </button>
                                            )}
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