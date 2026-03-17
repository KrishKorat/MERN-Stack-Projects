import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";

export default function Login() {
    const navigate = useNavigate();
    const { login } = useAuth();

    const [formData, setFormData] = useState({ email: "", password: "" });
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
        const res = await api.post("/auth/login", formData);
        login(res.data);

        if (res.data.user.role === "admin") {
            navigate("/admin/dashboard");
        } else {
            navigate("/");
        }
        } catch (err) {
        setError(err.response?.data?.message || "Login failed");
        }
    };

    return (
        <div className="min-h-[80vh] flex justify-center items-center bg-[#FFFAFA] px-6">
            <div className="bg-white p-10 rounded-[2.5rem] shadow-2xl shadow-red-100/40 w-full max-w-md border border-gray-100">
                <div className="text-center mb-10">
                    <h2 className="text-4xl font-black text-[#111827] tracking-tighter mb-2">
                        Welcome Back
                    </h2>
                    <p className="text-[#991B1B] text-[10px] font-black uppercase tracking-widest">
                        Access your collector profile
                    </p>
                </div>

                {error && (
                    <div className="bg-red-50 border border-red-100 text-[#991B1B] text-xs font-bold p-4 rounded-xl mb-6 text-center">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="text-[12px] font-black text-[#111827] uppercase tracking-widest ml-1 mb-2 block">
                            Email Address
                        </label>
                        <input
                            type="email"
                            name="email"
                            placeholder="name@example.com"
                            className="w-full px-5 py-4 bg-[#F9FAFB] border-2 border-transparent focus:border-[#FECACA] focus:bg-white rounded-2xl outline-none transition-all font-medium text-[#111827]"
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div>
                        <label className="text-[12px] font-black text-[#111827] uppercase tracking-widest ml-1 mb-2 block">
                            Security Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            placeholder="••••••••"
                            className="w-full px-5 py-4 bg-[#F9FAFB] border-2 border-transparent focus:border-[#FECACA] focus:bg-white rounded-2xl outline-none transition-all font-medium text-[#111827]"
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <button className="w-full bg-[#991B1B] text-white py-4 rounded-2xl font-black uppercase tracking-widest text-xs shadow-lg shadow-red-100 hover:bg-[#7F1D1D] hover:-translate-y-0.5 transition-all pt-5">
                        Sign In to Auctionare
                    </button>
                </form>

                <p className="text-center mt-8 text-[16px] font-bold text-gray-400">
                    Don't have an account?{" "}
                    <Link to="/register" className="text-[#991B1B] hover:underline">
                        Register here
                    </Link>
                </p>
            </div>
        </div>
    );
}
