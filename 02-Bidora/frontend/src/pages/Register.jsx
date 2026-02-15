import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/axios";

export default function Register() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: ""
    });
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            await api.post("/auth/register", formData);
            navigate("/login");
        }
        catch(err) {
            setError(err.response?.data?.message || "Registration Failed");
        }
    };

    
    return (
    <div className="min-h-[90vh] flex justify-center items-center bg-[#FFFAFA] px-6 py-20">
        <div className="bg-white p-10 rounded-[2.5rem] shadow-2xl shadow-red-100/40 w-full max-w-md border border-gray-100">
            <div className="text-center mb-10">
                <h2 className="text-4xl font-black text-[#111827] tracking-tighter mb-2">Create Account</h2>
                <p className="text-[#991B1B] text-[10px] font-black uppercase tracking-widest">Join our exclusive circle of bidders</p>
            </div>

            {error && (
                <div className="bg-red-50 border border-red-100 text-[#991B1B] text-xs font-bold p-4 rounded-xl mb-6 text-center">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="text-[12px] font-black text-[#111827] uppercase tracking-widest ml-1 mb-2 block">Username</label>
                    <input
                        type="text"
                        name="username"
                        placeholder="CollecterName"
                        className="w-full px-5 py-4 bg-[#F9FAFB] border-2 border-transparent focus:border-[#FECACA] focus:bg-white rounded-2xl outline-none transition-all font-medium text-[#111827]"
                        onChange={handleChange}
                        required
                    />
                </div>

                <div>
                    <label className="text-[12px] font-black text-[#111827] uppercase tracking-widest ml-1 mb-2 block">Email</label>
                    <input
                        type="email"
                        name="email"
                        placeholder="collector@luxury.com"
                        className="w-full px-5 py-4 bg-[#F9FAFB] border-2 border-transparent focus:border-[#FECACA] focus:bg-white rounded-2xl outline-none transition-all font-medium text-[#111827]"
                        onChange={handleChange}
                        required
                    />
                </div>

                <div>
                    <label className="text-[12px] font-black text-[#111827] uppercase tracking-widest ml-1 mb-2 block">Password</label>
                    <input
                        type="password"
                        name="password"
                        placeholder="Create a strong password"
                        className="w-full px-5 py-4 bg-[#F9FAFB] border-2 border-transparent focus:border-[#FECACA] focus:bg-white rounded-2xl outline-none transition-all font-medium text-[#111827]"
                        onChange={handleChange}
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-[#991B1B] text-white py-4 rounded-2xl font-black uppercase tracking-widest text-xs shadow-lg shadow-red-100 hover:bg-[#7F1D1D] hover:-translate-y-0.5 transition-all mt-4 pt-5"
                >
                    Register Account
                </button>
            </form>

            <p className="text-center mt-8 text-[16px] font-bold text-gray-400">
                Already a member? <Link to="/login" className="text-[#991B1B] hover:underline">Login here</Link>
            </p>
        </div>
    </div>
);

}