import { useEffect, useState } from "react";
import api from "../../api/axios";
import { Link } from "react-router-dom";

export default function Dashboard() {
    const [data, setData] = useState({
        items: [],
        users: [],
        user: null,
        message: ""
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDashboard = async () => {
            try {
                const res = await api.get("/admin/dashboard");
                // Assuming your API returns an object with these fields
                setData({
                    items: res.data.items || [],
                    users: res.data.users || [],
                    user: res.data.user || null,
                    message: res.data.message || ""
                });
            } catch (error) {
                console.error("Error fetching dashboard data", error);
            } finally {
                setLoading(false);
            }
        };
        fetchDashboard();
    }, []);

    const { items, users, user } = data;

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
    <div className="bg-white min-h-screen pb-20">
        {/* Dynamic Welcome Header */}
        <div className="bg-[#FFF5F5] border-b-2 border-red-50">
            <div className="max-w-7xl mx-auto px-6 py-12 flex justify-between items-end">
                <div>
                    <h2 className="text-4xl font-black text-[#111827] tracking-tight">Executive Dashboard</h2>
                    <p className="text-[#991B1B] font-bold mt-1 uppercase tracking-[0.2em] text-[10px]">
                        Welcome back, {user?.username || 'Admin'} • {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                    </p>
                </div>
                <div className="hidden md:block">
                    <Link to="/items/add" className="bg-[#991B1B] text-white px-6 py-4 rounded-2xl font-black uppercase tracking-widest text-xs shadow-lg shadow-red-200 hover:bg-[#7F1D1D] transition-all flex items-center">
                        <span className="text-xl mr-2">+</span> Create New Auction
                    </Link>
                </div>
            </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 -mt-8">
            {/* Dynamic Metrics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                <div className="bg-white p-6 rounded-[2rem] border-b-4 border-red-100 shadow-sm">
                    <p className="text-[#9CA3AF] text-[12px] font-black uppercase tracking-widest mb-1">Total Inventory</p>
                    <h3 className="text-3xl font-black text-[#111827]">{items?.length || 0}</h3>
                    <p className="text-[12px] text-red-800 font-bold mt-2 italic">Active & Draft Items</p>
                </div>
                <div className="bg-white p-6 rounded-[2rem] border-b-4 border-red-600 shadow-sm">
                    <p className="text-[#991B1B] text-[12px] font-black uppercase tracking-widest mb-1">Live Auctions</p>
                    <h3 className="text-3xl font-black text-[#111827]">
                        {items?.filter(item => item.isActive === true)?.length || 0}
                    </h3>
                    <p className="text-[12px] text-red-400 font-bold mt-2 italic">Currently receiving bids</p>
                </div>
                <div className="bg-white p-6 rounded-[2rem] border-b-4 border-red-100 shadow-sm">
                    <p className="text-[#9CA3AF] text-[12px] font-black uppercase tracking-widest mb-1">Community</p>
                    <h3 className="text-3xl font-black text-[#111827]">{users?.length || 0}</h3>
                    <p className="text-[12px] text-red-800 font-bold mt-2 italic">Registered Members</p>
                </div>
                <div className="bg-white p-6 rounded-[2rem] border-b-4 border-red-600 shadow-sm">
                    <p className="text-[#991B1B] text-[12px] font-black uppercase tracking-widest mb-1">Platform Role</p>
                    <h3 className="text-2xl font-black text-[#111827] uppercase tracking-tighter">{user?.role || 'Staff'}</h3>
                    <p className="text-[12px] text-red-400 font-bold mt-2 italic">Superuser Access</p>
                </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                {/* Dynamic Data Table */}
                <div className="lg:col-span-2 bg-white rounded-[2.5rem] shadow-sm border border-red-50 overflow-hidden">
                    <div className="px-8 py-6 border-b border-red-50 flex justify-between items-center bg-[#FFFBFB]">
                        <h4 className="font-black text-[#111827] uppercase tracking-widest text-xs">Recent Inventory Movements</h4>
                        <Link to="/admin/items" className="text-[#991B1B] text-[12px] font-black uppercase tracking-widest hover:text-[#7F1D1D]">Manage All</Link>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="text-[#9CA3AF] text-[12px] uppercase tracking-[0.2em] font-black">
                                    <th className="px-8 py-5">Item Details</th>
                                    <th className="px-8 py-5">Starting Price</th>
                                    <th className="px-8 py-5">Current Status</th>
                                    <th className="px-8 py-5">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-red-50">
                                {items?.slice(0, 5).map((item) => (
                                    <tr key={item._id} className="hover:bg-[#FFF5F5] transition-colors group">
                                        <td className="px-8 py-5">
                                            <p className="font-bold text-[#111827] text-[14px] group-hover:text-[#991B1B] transition-colors">{item.title}</p>
                                            <p className="text-[10px] text-red-300 italic uppercase">ID: {item._id?.substring(0, 8)}</p>
                                        </td>
                                        <td className="px-8 py-5">
                                            <span className="font-black text-[#111827]">${item.startingPrice}</span>
                                        </td>
                                        <td className="px-8 py-5">
                                            <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter ${
                                                item.isActive 
                                                ? 'bg-red-100 text-[#991B1B]' 
                                                : 'bg-gray-100 text-gray-500'
                                            }`}>
                                                {item.isActive ? "active" : "closed"}
                                            </span>
                                        </td>
                                        <td className="px-8 py-5">
                                            <Link to={`/items/${item._id}`} className="text-red-200 hover:text-[#991B1B] transition-colors">
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                                {(!items || items.length === 0) && (
                                    <tr>
                                        <td colSpan="4" className="px-8 py-20 text-center text-red-200 italic font-medium">
                                            No inventory items found in the database.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Dynamic Management Sidebar */}
                <div className="space-y-6">
                    <div className="bg-white p-8 rounded-[2.5rem] border border-red-50 shadow-sm">
                        <h4 className="font-black text-[#111827] mb-6 uppercase text-xs tracking-widest border-b border-red-50 pb-4">Admin Quick Links</h4>
                        <div className="grid grid-cols-1 gap-3">
                            <Link to="/admin/users" className="flex items-center justify-between p-4 bg-[#FFF5F5] rounded-2xl group hover:bg-[#FEE2E2] transition-all border border-red-50">
                                <span className="text-sm font-bold text-[#991B1B]">Manage Users</span>
                                <span className="bg-white text-[#991B1B] text-[10px] px-2 py-1 rounded-lg font-black shadow-sm border border-red-50">{users?.length || 0}</span>
                            </Link>
                            <Link to="/admin/items" className="flex items-center justify-between p-4 bg-[#FFF5F5] rounded-2xl group hover:bg-[#FEE2E2] transition-all border border-red-50">
                                <span className="text-sm font-bold text-[#991B1B]">Review Items</span>
                                <span className="bg-white text-[#991B1B] text-[10px] px-2 py-1 rounded-lg font-black shadow-sm border border-red-50">{items?.length || 0}</span>
                            </Link>
                        </div>
                    </div>

                    <div className="bg-[#991B1B] p-8 rounded-[2.5rem] text-white shadow-xl shadow-red-200 relative overflow-hidden">
                        <div className="relative z-10">
                            <h4 className="font-black uppercase text-xs tracking-widest mb-2 opacity-80">Security Note</h4>
                            <p className="text-sm font-medium leading-relaxed mb-4">You are logged in as an administrator. All actions performed are logged and timestamped.</p>
                            <div className="text-[10px] font-black uppercase tracking-tighter bg-white/20 inline-block px-3 py-1 rounded-full">
                                Node: {window.location.hostname}
                            </div>
                        </div>
                        <div className="absolute -bottom-4 -right-4 text-white opacity-10 rotate-12">
                            <svg className="w-24 h-24" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L3 7v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-9-5z"/></svg>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    );
}