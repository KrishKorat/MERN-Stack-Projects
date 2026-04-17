import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";
import Navbar from "../components/Navbar";


function Signup() {

    const [form, setForm] = useState({
        name: "",
        email: "",
        password: ""
    });

    const navigate = useNavigate();

    const handleChange = (e: any) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        if (!form.name || !form.email || !form.password) {
            alert("All fields are required");
            return;
        }

        try {
            const res = await API.post("/auth/register", form);
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("user", JSON.stringify(res.data.name));
            navigate("/");
        }
        catch(err: any) {
            alert(err.response?.data?.message || "Signup failed");
        }
    }


    return(
    <div className="min-h-screen flex flex-col">
        <Navbar />

        <div className="flex flex-1 items-center justify-center">
            <form onSubmit={handleSubmit} className="p-6 bg-white rounded-xl shadow w-80">
                <h2 className="text-xl mb-4">Signup</h2>

                <input name="name" placeholder="Name" onChange={handleChange} className="w-full mb-2 p-2 border" />
                <input name="email" placeholder="Email" onChange={handleChange} className="w-full mb-2 p-2 border" />
                <input type="password" name="password" placeholder="Password" onChange={handleChange} className="w-full mb-4 p-2 border" />

                <button className="w-full bg-indigo-500 text-white p-2 rounded">Register</button>

                <p className="text-sm mt-4 text-center">
                    Already have an account?{" "}
                    <Link to="/login" className="text-indigo-500 font-medium">
                        Login
                    </Link>
                </p>
            </form>
        </div>
    </div>
    );
}

export default Signup;