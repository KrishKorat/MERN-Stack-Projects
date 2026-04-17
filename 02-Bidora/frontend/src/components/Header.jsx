import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function Header() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <header className="bg-white border-b border-[#F3F4F6] shadow-sm sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                {/* Logo Section */}
                <Link to="/" className="flex items-center space-x-2">
                    <div className="bg-[#991B1B] p-2 rounded-xl shadow-sm rotate-3">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                        </svg>
                    </div>
                    <span className="text-2xl font-black text-[#111827] tracking-tighter italic">
                        Bidora
                    </span>
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden lg:flex items-center space-x-8 font-bold text-[#374151]">
                    {!user ? (
                        <>
                            <Link to="/" className="hover:text-[#991B1B] transition-colors">Home</Link>
                            <Link to="/items" className="hover:text-[#991B1B] transition-colors">Listings</Link>
                            <Link to="/login" className="hover:text-[#991B1B] transition-colors">Login</Link>
                            <Link
                                to="/register"
                                className="bg-[#991B1B] text-white px-8 py-2.5 rounded-full shadow-lg shadow-red-100 hover:bg-[#7F1D1D] hover:-translate-y-0.5 transition-all"
                            >
                                Register
                            </Link>
                        </>
                    ) : (
                        <>
                            <div className="bg-[#FEF2F2] border border-[#FEE2E2] px-4 py-1.5 rounded-full flex items-center space-x-2">
                                <div className="w-2 h-2 bg-[#991B1B] rounded-full animate-pulse"></div>
                                <span className="text-[#991B1B] italic font-medium">Hi, {user.username}</span>
                            </div>
                            <Link to="/" className="hover:text-[#991B1B]">Home</Link>
                            <Link to="/items" className="hover:text-[#991B1B]">Listings</Link>
                            <Link to="/active" className="hover:text-[#991B1B]">Active</Link>
                            <Link to="/categories" className="hover:text-[#991B1B]">Categories</Link>
                            <Link to="/items/add" className="text-[#991B1B] flex items-center">
                                <span className="text-xl mr-1 leading-none">+</span> Add Item
                            </Link>
                            {user?.role === 'admin' && (
                                <Link to="/admin/dashboard" className="bg-[#F3F4F6] text-[#111827] px-3 py-1 rounded-lg border border-[#E5E7EB]">
                                    Admin
                                </Link>
                            )}
                            <button
                                onClick={handleLogout}
                                className="text-[#991B1B] hover:underline font-black text-xs uppercase tracking-widest"
                            >
                                Logout
                            </button>
                        </>
                    )}
                </nav>

                {/* Mobile Menu Button */}
                <button 
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="lg:hidden p-2 text-[#374151] hover:text-[#991B1B] transition-colors"
                >
                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        {isMenuOpen ? (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        ) : (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                        )}
                    </svg>
                </button>
            </div>

            {/* Mobile Navigation Dropdown */}
            {isMenuOpen && (
                <nav className="lg:hidden bg-white border-t border-[#F3F4F6] px-6 py-8 flex flex-col space-y-6 font-bold text-[#374151] shadow-xl">
                    {!user ? (
                        <>
                            <Link to="/" onClick={() => setIsMenuOpen(false)} className="hover:text-[#991B1B]">Home</Link>
                            <Link to="/items" onClick={() => setIsMenuOpen(false)} className="hover:text-[#991B1B]">Listings</Link>
                            <Link to="/login" onClick={() => setIsMenuOpen(false)} className="hover:text-[#991B1B]">Login</Link>
                            <Link
                                to="/register"
                                onClick={() => setIsMenuOpen(false)}
                                className="bg-[#991B1B] text-white px-8 py-3 rounded-xl shadow-lg shadow-red-100 text-center"
                            >
                                Register
                            </Link>
                        </>
                    ) : (
                        <>
                            <div className="bg-[#FEF2F2] border border-[#FEE2E2] px-4 py-3 rounded-xl flex items-center space-x-3">
                                <div className="w-2.5 h-2.5 bg-[#991B1B] rounded-full animate-pulse"></div>
                                <span className="text-[#991B1B] italic font-black uppercase text-xs tracking-widest">Logged in as {user.username}</span>
                            </div>
                            <Link to="/" onClick={() => setIsMenuOpen(false)} className="hover:text-[#991B1B]">Home</Link>
                            <Link to="/items" onClick={() => setIsMenuOpen(false)} className="hover:text-[#991B1B]">Listings</Link>
                            <Link to="/active" onClick={() => setIsMenuOpen(false)} className="hover:text-[#991B1B]">Active</Link>
                            <Link to="/categories" onClick={() => setIsMenuOpen(false)} className="hover:text-[#991B1B]">Categories</Link>
                            <Link to="/items/add" onClick={() => setIsMenuOpen(false)} className="text-[#991B1B] border-t pt-4">
                                + Add New Item
                            </Link>
                            {user?.role === 'admin' && (
                                <Link to="/admin/dashboard" onClick={() => setIsMenuOpen(false)} className="text-[#991B1B]">
                                    Admin Dashboard
                                </Link>
                            )}
                            <button
                                onClick={() => { handleLogout(); setIsMenuOpen(false); }}
                                className="w-full text-left text-[#991B1B] font-black text-xs uppercase tracking-widest pt-4 border-t"
                            >
                                Logout Account
                            </button>
                        </>
                    )}
                </nav>
            )}
        </header>
    );
}