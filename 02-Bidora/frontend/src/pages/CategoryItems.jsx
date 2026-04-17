import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";
import ItemCard from "../components/ItemCard";
import { Link } from "react-router-dom";



export default function CategoryItems() {
    const { category } = useParams();
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const res = await api.get(`/items/category/${category}`);
                setItems(res.data);
            }
            finally {
                setLoading(false);
            }
        }
        fetchItems();
    }, [category]);


    if (loading) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center bg-[#F8F9FF]">
                {/* Animated Logo/Icon */}
                <div className="relative mb-8">
                    {/* Outer soft pulse ring */}
                    <div className="absolute inset-0 rounded-full bg-[#E0D7FF] animate-ping opacity-20"></div>
                    
                    {/* Main icon container */}
                    <div className="relative h-20 w-20 bg-white rounded-full flex items-center justify-center shadow-2xl shadow-purple-200 border border-purple-50">
                        <span className="text-3xl animate-bounce">💎</span>
                    </div>
                </div>

                {/* Typography */}
                <div className="text-center">
                    <h3 className="text-[#2D1B69] font-black text-xl tracking-tighter mb-2">
                        Curating <span className="italic font-light text-[#A78BFA]">Collection</span>
                    </h3>
                    
                    {/* Progress track */}
                    <div className="w-48 h-1 bg-[#F3F4F6] rounded-full mx-auto overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-[#E0D7FF] to-[#FCE7F3] w-1/3 rounded-full animate-[loading_1.5s_infinite_ease-in-out]"></div>
                    </div>
                    
                    <p className="mt-4 text-[10px] font-black uppercase tracking-[0.4em] text-[#C4B5FD] animate-pulse">
                        Please Wait
                    </p>
                </div>

                {/* Custom Animation Keyframes (Add to your global CSS or Tailwind config) */}
                <style dangerouslySetInnerHTML={{ __html: `
                    @keyframes loading {
                        0% { transform: translateX(-100%); }
                        100% { transform: translateX(300%); }
                    }
                `}} />
            </div>
        );
    }

    return (
        <section className="bg-[#FFFAFA] min-h-screen py-20 px-6">
            <div className="max-w-7xl mx-auto">
                {/* Breadcrumb style header */}
                <div className="mb-16">
                    <Link to="/categories" className="text-[#9CA3AF] text-[10px] font-black uppercase tracking-widest hover:text-[#991B1B] transition-colors">
                        ← Back to all Categories
                    </Link>
                    <div className="flex items-center mt-4 space-x-4">
                        <div className="h-12 w-1.5 bg-[#991B1B] rounded-full"></div>
                        <h2 className="text-5xl font-black text-[#111827] tracking-tighter capitalize">
                            {category} <span className="font-light italic text-gray-300">Vault</span>
                        </h2>
                    </div>
                </div>

                {items.length === 0 ? (
                    <div className="text-center py-32 bg-white rounded-[3rem] border border-gray-100 shadow-sm">
                        <div className="w-20 h-20 bg-[#FEF2F2] rounded-full flex items-center justify-center mx-auto mb-6">
                            <span className="text-3xl text-[#991B1B]">🔒</span>
                        </div>
                        <h3 className="text-xl font-bold text-[#111827]">This vault is currently empty.</h3>
                        <p className="text-gray-400 mt-2 font-medium">New treasures in "{category}" are arriving soon.</p>
                        <Link to="/items" className="mt-8 inline-block bg-[#F9FAFB] text-[#111827] px-8 py-3 rounded-xl font-black uppercase tracking-widest text-[10px] hover:bg-[#F3F4F6] transition-all border border-gray-200">
                            Explore Marketplace
                        </Link>
                    </div>
                ) : (
                    <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
                        {items.map((item) => (
                            <ItemCard key={item._id} item={item} />
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}