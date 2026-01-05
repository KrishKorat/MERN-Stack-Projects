import { Link, useNavigate } from "react-router-dom";


export default function Navbar() {

    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/");
    }

    return(
        <header className="border-b border-neutral-200 bg-white">
            <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">

                <Link
                    to="/"
                    className="text-lg font-semibold tracking-tight text-neutral-900"
                >
                    Recipe
                </Link>

                <nav className="flex items-center gap-6 text-sm text-neutral-700">
                    <Link
                        to="/"
                        className="hover:text-neutral-900 transition"
                    >
                        Home
                    </Link>

                    {token ? (
                        <>
                            <Link
                                to="/recipes/new"
                                className="hover:text-neutral-900 transition"
                            >
                                Create
                            </Link>
                            <button
                                onClick={handleLogout}
                                className="text-neutral-700 hover:text-neutral-900 transition"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link
                                to="/login"
                                className="hover:text-neutral-900 transition"
                            >
                                Login
                            </Link>
                            <Link
                                to="/register"
                                className="hover:text-neutral-900 transition"
                            >
                                Register
                            </Link>
                        </>
                    )}
                </nav>
            </div>
        </header>
    );
}