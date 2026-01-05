import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../lib/axios";
import AuthLayout from "../components/AuthLayout";



export default function LoginPage() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await api.post("/auth/login", form);
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("user", JSON.stringify(res.data.user));
            navigate("/");
        }
        catch(err) {
            alert(err.response?.data?.message || "Login failed");
        }
    }


    return(
        <AuthLayout
            title="Welcome back"
            subtitle="Sign in to manage your recipe."
        >
            <form onSubmit={handleSubmit} className="space-y-6">

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
                    Sign in
                </button>
            </form>

            <p className="mt-6 text-sm text-neutral-600">
                Don't have an account?{" "}
                <Link to="/register" className="text-neutral-900 underline">
                    Create one
                </Link>
            </p>
        </AuthLayout>
    );
}