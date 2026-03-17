import { useEffect, useState } from "react";
import api from "../api/axios";
import ItemCard from "../components/ItemCard";



export default function ActiveItems() {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const fetchActiveItems = async () => {
            try {
                const res = await api.get("/items/active/all");
                setItems(res.data);
            }
            catch(err) {
                console.error("Failed to load active auctions", err.message);
            }
            finally {
                setLoading(false);
            }
        }
        fetchActiveItems();
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
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 border-b-2 border-[#F3F4F6] pb-8 gap-4">
                    <div>
                        <div className="flex items-center space-x-2 mb-2">
                            <span className="relative flex h-3 w-3">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-[#991B1B]"></span>
                            </span>
                            <span className="text-[#991B1B] text-[10px] font-black uppercase tracking-[0.3em]">Live Now</span>
                        </div>
                        <h2 className="text-5xl font-black text-[#111827] tracking-tighter">
                            <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-[#991B1B] to-[#DC2626]">Active </span><span className="italic font-light">Auctions</span>
                        </h2>
                    </div>

                    <p className="text-[#4B5563] font-bold text-xs uppercase tracking-widest bg-white px-4 py-2 rounded-full border border-gray-100 shadow-sm">
                        💎 Bid before the clock runs out
                    </p>
                </div>

                {items.length === 0 ? (
                    <div className="text-center py-32 bg-[#F9FAFB] rounded-[3rem] border-2 border-dashed border-[#E5E7EB]">
                        <p className="text-[#4B5563] font-bold italic">The floor is currently quiet. New auctions starting soon.</p>
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