import { useEffect, useState } from "react";
import api from "../api/axios";
import ItemCard from "../components/ItemCard";
import { Link } from "react-router-dom";


export default function Items() {

    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const res = await api.get("/items");
                setItems(res.data);
            }
            catch(err) {
                console.error("Failed to load data");
            }
            finally {
                setLoading(false);
            }
        };

        fetchItems();
    }, []);

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
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
                    <div>
                        <span className="text-[#991B1B] text-xs font-black tracking-[0.3em] uppercase mb-3 block">
                            Marketplace
                        </span>
                        <h2 className="text-5xl font-black text-[#111827] tracking-tighter">
                            All <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-[#991B1B] to-[#DC2626]">Auctions</span>
                        </h2>
                    </div>
                </div>

                {items.length === 0 ? (
                    <div className="text-center py-40 bg-white rounded-[3rem] border-2 border-dashed border-gray-100 shadow-sm">
                        <div className="text-5xl mb-4">✨</div>
                        <h3 className="text-xl font-bold text-[#111827]">The gallery is currently being curated.</h3>
                        <p className="text-gray-400 mt-2 font-medium">Check back soon for new exclusive arrivals.</p>
                        <Link to="/" className="mt-8 inline-block text-[#991B1B] font-black uppercase tracking-widest text-xs border-b-2 border-[#991B1B] pb-1">
                            Return Home
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
