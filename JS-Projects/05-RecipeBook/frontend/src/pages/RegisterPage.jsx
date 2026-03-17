import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../lib/axios.js";
import AuthLayout from "../components/AuthLayout";



export default function RegisterPage() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: "",
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await api.post("/auth/register", form);
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("user", JSON.stringify(res.data.user));
            navigate("/");
        }
        catch(err) {
            alert(err.response?.data?.message || "Registration failed");
        }
    }

    return(
        <AuthLayout
            title="Create your account"
            subtitle="Start sharing your recipes with the world."
        >
            <form onSubmit={handleSubmit} className="space-y-6">

                <div>
                    <label className="block text-sm font-medium text-neutral-800">
                        Full name
                    </label>
                    <input 
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Firstname Lastname"
                        className="mt-2 w-full border border-neutral-300 px-3 py-2 text-sm focus:outline-none focus:border-neutral-900"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-neutral-800">
                        Email address
                    </label>
                    <input 
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="emailaddress@example.com"
                        className="mt-2 w-full border border-neutral-300 px-3 py-2 text-sm focus:outline-none focus:border-neutral-900"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-neutral-800">
                        Password
                    </label>
                    <input 
                        type="password"
                        name="password"
                        value={form.password}
                        onChange={handleChange}
                        placeholder="Minimum 6 characters"
                        className="mt-2 w-full border border-neutral-300 px-3 py-2 text-sm focus:outline-none focus:border-neutral-900"
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-neutral-900 text-white py-2 text-sm hover:bg-neutral-800 transition"
                >
                    Create account
                </button>
            </form>

            <p className="mt-6 text-sm text-neutral-600">
                Already have an account?{" "}
                <Link to="/login" className="text-neutral-900 underline">
                    Sign in
                </Link>
            </p>
        </AuthLayout>
    );
}