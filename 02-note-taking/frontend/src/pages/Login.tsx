import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";
import Navbar from "../components/Navbar";


function Login() {

    const [form, setForm] = useState({
        email: "",
        password: ""
    });

    const navigate = useNavigate();

    const handleChange = (e: any) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        if (!form.email || !form.password) {
            alert("All fields are required");
            return;
        }

        try {
            const res = await API.post("/auth/login", form);
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("user", JSON.stringify(res.data.name));
            navigate("/");
        }
        catch(err: any) {
            alert(err.response?.data?.message || "Login failed");
        }
    }


    return (
    <div className="min-h-screen flex flex-col">
        <Navbar />

        <div className="flex flex-1 items-center justify-center">
            <form onSubmit={handleSubmit} className="p-6 bg-white rounded-xl shadow w-80">
                <h2 className="text-xl mb-4">Login</h2>

                <input name="email" placeholder="Email" onChange={handleChange} className="w-full mb-2 p-2 border" />
                <input type="password" name="password" placeholder="Password" onChange={handleChange} className="w-full mb-4 p-2 border" />

                <button className="w-full bg-indigo-500 text-white p-2 rounded">Login</button>

                <p className="text-sm mt-4 text-center">
                    Don’t have an account?{" "}
                    <Link to="/signup" className="text-indigo-500 font-medium">
                        Signup
                    </Link>
                    </p>
            </form>
        </div>
    </div>
    );
}

export default Login;