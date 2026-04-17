import { useNavigate } from "react-router-dom";


function Navbar() {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("user") || "null");

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
    }


    return(
        <div className="flex justify-between items-center p-4 bg-white shadow">
            <h1 className="font-semibold text-lg cursor-pointer" onClick={() => navigate("/")}>
                Velora
            </h1>

            <div className="flex items-center gap-4">
                {user ? (
                <>
                    <span className="text-gray-600">
                    Hi, {user || "User"}
                    </span>
                    <button
                    onClick={handleLogout}
                    className="text-red-500 font-medium"
                    >
                    Logout
                    </button>
                </>
                ) : (
                <>
                    <button onClick={() => navigate("/login")}>Login</button>
                    <button onClick={() => navigate("/signup")}>Signup</button>
                </>
                )}
            </div>
        </div>
    );
}

export default Navbar;