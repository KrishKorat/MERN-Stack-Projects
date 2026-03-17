import { useState } from "react";
import { Link } from "react-router-dom";

export default function AdminHeader() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <header className="bg-white border-b-2 border-red-50 shadow-md sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                {/* Brand Section */}
                <div className="flex items-center space-x-3">
                    <div className="bg-[#991B1B] p-2 rounded-xl shadow-sm -rotate-2">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                    </div>
                    <div>
                        <h1 className="text-xl md:text-2xl font-black text-[#111827] tracking-tight leading-none uppercase">Admin Panel</h1>
                        <p className="text-[#991B1B] text-[10px] font-bold tracking-widest uppercase mt-0.5">Bidora Suite</p>
                    </div>
                </div>

                {/* Desktop Navigation */}
                <nav className="hidden lg:flex items-center space-x-6 font-bold text-[#111827] text-[16px]">
                    <Link to="/admin/dashboard" className="hover:text-[#991B1B] transition-colors py-2 border-b-2 border-transparent hover:border-[#991B1B]">
                        Dashboard
                    </Link>
                    <Link to="/admin/items" className="hover:text-[#991B1B] transition-colors py-2 border-b-2 border-transparent hover:border-[#991B1B]">
                        Items
                    </Link>
                    <Link to="/admin/users" className="hover:text-[#991B1B] transition-colors py-2 border-b-2 border-transparent hover:border-[#991B1B]">
                        Users
                    </Link>
                    <Link
                        to="/"
                        className="ml-4 bg-[#991B1B] text-white px-6 py-2 rounded-full shadow-lg shadow-red-100 hover:bg-[#7F1D1D] transition-all flex items-center"
                    >
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
                        Storefront
                    </Link>
                </nav>

                {/* Mobile Menu Button */}
                <button 
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="lg:hidden p-2 text-[#111827] hover:text-[#991B1B] transition-colors"
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

            {/* Mobile Dropdown Menu */}
            {isMenuOpen && (
                <div className="lg:hidden bg-white border-t-2 border-red-50 py-6 px-6 shadow-xl animate-in slide-in-from-top duration-300">
                    <nav className="flex flex-col space-y-5 font-black uppercase text-xs tracking-[0.2em] text-[#111827]">
                        <Link 
                            to="/admin/dashboard" 
                            onClick={() => setIsMenuOpen(false)}
                            className="flex items-center justify-between hover:text-[#991B1B] transition-colors"
                        >
                            Dashboard
                            <span className="text-red-100">→</span>
                        </Link>
                        <Link 
                            to="/admin/items" 
                            onClick={() => setIsMenuOpen(false)}
                            className="flex items-center justify-between hover:text-[#991B1B] transition-colors"
                        >
                            Items Inventory
                            <span className="text-red-100">→</span>
                        </Link>
                        <Link 
                            to="/admin/users" 
                            onClick={() => setIsMenuOpen(false)}
                            className="flex items-center justify-between hover:text-[#991B1B] transition-colors"
                        >
                            Member Control
                            <span className="text-red-100">→</span>
                        </Link>
                        <div className="pt-4 border-t border-red-50">
                            <Link
                                to="/"
                                onClick={() => setIsMenuOpen(false)}
                                className="w-full bg-[#991B1B] text-white px-6 py-4 rounded-2xl shadow-lg shadow-red-50 flex items-center justify-center font-black tracking-widest"
                            >
                                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
                                Back to Store
                            </Link>
                        </div>
                    </nav>
                </div>
            )}
        </header>
    );
}