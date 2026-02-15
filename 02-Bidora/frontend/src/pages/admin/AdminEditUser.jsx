import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import api from "../../api/axios";



export default function AdminEditUser() {
    const {id} = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        role: "user"
    });
    const [error, setError] = useState("");


    useEffect(() => {
        api.get("/admin/users").then(res => {
            const user = res.data.find(u => u._id === id);
            if (user) {
                setFormData({
                    username: user.username,
                    email: user.email,
                    role: user.role
                });
            }
        });
    }, [id]);


    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            await api.put(`/admin/users/${id}`, formData);
            navigate("/admin/users");
        }
        catch(err) {
            setError(err.response?.data?.message || "Update failed");
        }
    };


    return (
        <section className="bg-[#F8F9FF] min-h-screen py-20 px-6">
            <div className="max-w-xl mx-auto">
                {/* Header Section */}
                <div className="mb-10 flex items-center gap-6">
                    <div className="h-20 w-20 rounded-full bg-gradient-to-br from-red-50 to-red-100 flex items-center justify-center text-[#581C87] text-2xl font-black shadow-sm border-4 border-white">
                        {formData.username?.substring(0, 2).toUpperCase()}
                    </div>
                    <div>
                        <h2 className="text-4xl font-black text-[#111827] tracking-tighter">
                            Edit <span className="italic font-light text-[#991B1B]">Member</span>
                        </h2>
                        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">Account ID: {id.substring(0, 8)}...</p>
                    </div>
                </div>

                {error && (
                    <div className="bg-red-50 border border-red-100 text-[#991B1B] text-[10px] font-black uppercase tracking-widest p-4 rounded-2xl mb-8 text-center">
                        {error}
                    </div>
                )}

                <form
                    onSubmit={handleSubmit}
                    className="bg-white p-10 rounded-[3rem] shadow-[0_20px_50px_rgba(153,27,27,0.05)] border border-[#F3F4F6] space-y-6"
                >
                    {/* Username Field */}
                    <div>
                        <label className="text-[12px] font-black text-[#991B1B] uppercase tracking-widest ml-1 mb-2 block">Display Name</label>
                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            placeholder="Username"
                            className="w-full px-6 py-4 bg-[#F8F9FF] border-2 border-transparent focus:border-red-100 focus:bg-white rounded-2xl outline-none transition-all font-bold text-[#111827]"
                            required
                        />
                    </div>

                    {/* Email Field */}
                    <div>
                        <label className="text-[12px] font-black text-[#991B1B] uppercase tracking-widest ml-1 mb-2 block">Email Address</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="email@example.com"
                            className="w-full px-6 py-4 bg-[#F8F9FF] border-2 border-transparent focus:border-red-100 focus:bg-white rounded-2xl outline-none transition-all font-bold text-[#111827]"
                            required
                        />
                    </div>

                    {/* Role Selection */}
                    <div>
                        <label className="text-[12px] font-black text-[#991B1B] uppercase tracking-widest ml-1 mb-2 block">Access Level</label>
                        <div className="relative">
                            <select
                                name="role"
                                value={formData.role}
                                onChange={handleChange}
                                className="w-full px-6 py-4 bg-[#F8F9FF] border-2 border-transparent focus:border-red-100 focus:bg-white rounded-2xl outline-none transition-all font-black text-[#111827] appearance-none cursor-pointer"
                            >
                                <option value="user">Standard Member (User)</option>
                                <option value="admin">Administrator (Full Access)</option>
                            </select>
                            {/* Custom Arrow for select */}
                            <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-[#991B1B]">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    {/* Info Note */}
                    <div className="bg-red-50/30 border border-red-50 p-4 rounded-2xl">
                        <p className="text-[9px] text-[#991B1B] font-bold leading-relaxed tracking-wide">
                            <span className="mr-1">🛡️</span> 
                            Changing a user's role to Administrator grants them full access to all inventory and member management tools.
                        </p>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-[#991B1B] text-white py-6 rounded-2xl font-black uppercase tracking-[0.2em] text-[12px] shadow-xl shadow-red-100 hover:bg-[#7F1D1D] hover:-translate-y-1 transition-all"
                    >
                        Save Member Changes
                    </button>
                </form>

                <div className="mt-8 text-center">
                    <Link to="/admin/users" className="text-gray-400 text-[12px] font-black uppercase tracking-widest hover:text-[#991B1B] transition-colors">
                        Cancel and Return to Directory
                    </Link>
                </div>
            </div>
        </section>
    );
}



