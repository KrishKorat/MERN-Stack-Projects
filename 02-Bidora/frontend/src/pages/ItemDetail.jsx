import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { isValidImage } from "../utils/isValidImage";

window.addEventListener("submit", (e) => {
    e.preventDefault();
});



export default function ItemDetail() {
    const { user } = useAuth();
    const navigate = useNavigate();

    const { id } = useParams();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    const [ bidAmount, setBidAmount ] = useState("");
    const [ bidError, setBidError ] = useState("");

    const [closeMessage, setCloseMessage] = useState("");

    const [commentText, setCommentText] = useState("");
    const [commentError, setCommentError] = useState("");



    useEffect(() => {
        const fetchItem = async () => {
            try {
                const res = await api.get(`/items/${id}`);
                setData(res.data);
            }
            catch(err) {
                console.error("Failed to load item");
            }
            finally {
                setLoading(false);
            }
        };

        fetchItem();
    }, [id]);



    const handleDelete = async() => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this auction?"
        );

        if (!confirmDelete) return;

        try {
            await api.delete(`/items/${id}`);
            navigate("/items");
        }
        catch(err) {
            alert("Failed to delete item");
        }
    }



    const handleBid = async () => {
        // e.preventDefault();
        setBidError("");

        try {
            await api.post(`/bids/${item._id}`, {
                amount: Number(bidAmount)
            });
            const res = await api.get(`/items/${id}`);
            setData(res.data);

            setBidAmount("");
        }
        catch(err) {
            console.error("BID ERROR:", err);
            setBidError(err.response?.data?.message || "Bid failed");
        }
    }



    const handleCloseAuction = async () => {

        const confirmClose = window.confirm(
            "Are you sure you want to close this auction?"
        );
        if (!confirmClose) return;

        try {
            const res = await api.patch(`/items/${id}/close`);
            setCloseMessage(
                res.data.winner
                    ? `Winner: ${res.data.winner.username} ($${res.data.winner.amount})`
                    : "Auction closed with no bids"
            );

            const updated = await api.get(`/items/${id}`);
            setData(updated.data);
        }
        catch(err) {
            alert("Failed to close auction");
        }
    }


    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        setCommentError("");

        try {
            const res = await api.post(`/comments/${item._id}`, {
                content: commentText
            });

            setData({
                ...data,
                comments: [res.data, ...data.comments]
            });

            setCommentText("");
        }
        catch(err) {
            setCommentText(
                err.response?.data?.message || "Failed to add comment"
            );
        }
    }




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

    if (!data) {
        return(
            <div className="text-center py-16 text-red-600">
                Item not found
            </div>
        );
    }


    const { item, bids, comments } = data;

    return (
    <section className="bg-[#FFFAFA] min-h-screen py-12 px-6">
        <div className="max-w-7xl mx-auto">
            
            {/* Header & Status Section */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
                <div>
                    <span className="text-[#991B1B] text-[10px] font-black uppercase tracking-[0.3em] mb-2 block">
                        Collection / {item.category}
                    </span>
                    <h2 className="text-5xl font-black text-[#111827] tracking-tighter">
                        {item.title}
                    </h2>
                </div>
                
                <div className="flex items-center gap-3">
                    <span className={`px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm border ${
                        item.isActive 
                        ? "bg-green-50 text-green-600 border-green-100" 
                        : "bg-red-50 text-[#991B1B] border-red-100"
                    }`}>
                        {item.isActive ? "• Active Auction" : "Auction Closed"}
                    </span>
                    
                    {/* Admin/Owner Controls */}
                    {user && user.id === item.owner._id && (
                        <div className="flex gap-2">
                            <Link to={`/items/${item._id}/edit`} className="p-2 bg-white rounded-xl border border-gray-100 hover:bg-yellow-50 transition-colors text-yellow-600 shadow-sm" title="Edit">
                                📝 Edit
                            </Link>
                            <button onClick={handleDelete} className="p-2 bg-white rounded-xl border border-gray-100 hover:bg-red-50 transition-colors text-red-600 shadow-sm" title="Delete">
                                🗑️ Delete
                            </button>
                        </div>
                    )}
                </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-12">
                
                {/* LEFT COLUMN: Gallery & Info */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Immersive Image */}
                    <div className="overflow-hidden rounded-[2rem] border-4 border-white shadow-xl h-[450px] bg-white">
                        {isValidImage(item.image) ? (
                            <img
                                src={item.image}
                                alt={item.title}
                                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                            />
                        ) : (
                            <div className="w-full h-full bg-[#F9FAFB] flex items-center justify-center text-gray-300 italic text-lg">
                                No Image Available
                            </div>
                        )}
                    </div>

                    {/* Product Story */}
                    <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-gray-100">
                        <h3 className="text-[12px] font-black text-[#9CA3AF] uppercase tracking-[0.3em] mb-4">Item Description</h3>
                        <p className="text-lg text-[#374151] leading-relaxed italic font-medium">
                            "{item.description}"
                        </p>
                        <div className="mt-8 pt-8 border-t border-gray-50 flex gap-10">
                            <div>
                                <p className="text-[12px] font-black text-gray-400 uppercase tracking-widest mb-1">Seller</p>
                                <p className="font-bold text-[#111827]">{item.owner.username}</p>
                            </div>
                            <div>
                                <p className="text-[12px] font-black text-gray-400 uppercase tracking-widest mb-1">Category</p>
                                <p className="font-bold text-[#111827]">{item.category}</p>
                            </div>
                            <div>
                                <p className="text-[12px] font-black text-gray-400 uppercase tracking-widest mb-1">Authenticity</p>
                                <p className="font-bold text-[#991B1B]">Verified</p>
                            </div>
                        </div>
                    </div>

                    {/* Comments Section */}
                    <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-gray-100">
                        <h3 className="text-xl font-black text-[#111827] mb-8 tracking-tighter">Collector <span className="text-[#991B1B]">Discussion</span></h3>
                        
                        {user && item.isActive && (
                            <form onSubmit={handleCommentSubmit} className="mb-10">
                                <textarea 
                                    value={commentText}
                                    onChange={(e) => setCommentText(e.target.value)}
                                    rows="3"
                                    placeholder="Inquire about this piece..."
                                    className="w-full px-6 py-4 bg-[#F9FAFB] border-2 border-transparent focus:border-[#FECACA] focus:bg-white rounded-2xl outline-none transition-all mb-4 text-[#111827]"
                                    required
                                />
                                <button type="submit" className="bg-[#111827] text-white px-8 py-3 rounded-xl font-black uppercase tracking-widest text-[10px] hover:bg-[#991B1B] transition-all">
                                    Post Inquiry
                                </button>
                            </form>
                        )}

                        <div className="space-y-6">
                            {comments.length === 0 ? (
                                <p className="text-gray-300 italic text-sm text-center py-4">No inquiries yet.</p>
                            ) : (
                                comments.map((comment) => (
                                    <div key={comment._id} className="bg-[#F9FAFB] p-6 rounded-2xl border border-gray-50">
                                        <p className="text-[#374151] font-medium mb-2">{comment.content}</p>
                                        <p className="text-[10px] font-black text-[#9CA3AF] uppercase tracking-widest">— {comment.user.username}</p>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>









                {/* RIGHT COLUMN: Action Center */}
                <div className="space-y-6">
                    <div className="sticky top-10">
                        <div className="bg-white p-8 rounded-[2.5rem] shadow-2xl shadow-red-100/40 border border-gray-100">
                            <div className="mb-8 text-center">
                                <p className="text-[12px] font-black text-[#9CA3AF] uppercase tracking-[0.3em] mb-2">Highest Offer</p>
                                <h4 className="text-6xl font-black text-[#111827] tracking-tighter">
                                    ${item.currentPrice}
                                </h4>
                            </div>

                            {item.isActive ? (
                                user && user.id !== item.owner._id ? (
                                    <div>
                                        <div className="relative">
                                            <span className="absolute left-5 top-1/2 -translate-y-1/2 text-[#9CA3AF] font-bold">$</span>
                                            <input 
                                                type="number"
                                                value={bidAmount}
                                                onChange={(e) => setBidAmount(e.target.value)}
                                                placeholder="Amount"
                                                className="w-full pl-10 pr-5 py-4 bg-[#F9FAFB] border-2 border-transparent focus:border-[#FECACA] focus:bg-white rounded-2xl outline-none transition-all font-black text-[#111827]"
                                                required
                                            />
                                        </div>
                                        <button
                                            type="button"
                                            onClick={handleBid}
                                            className="w-full bg-[#991B1B] text-white py-5 rounded-2xl font-black uppercase tracking-widest text-xs shadow-lg shadow-red-100 hover:bg-[#7F1D1D] transition-all pt-6"
                                            >
                                                Place Custom Bid
                                        </button>

                                        {bidError && <p className="text-[#991B1B] text-[10px] font-bold text-center mt-2">{bidError}</p>}
                                    </div>
                                ) : (
                                    <div className="p-4 bg-gray-50 rounded-2xl text-center">
                                        <p className="text-[#111827] text-[12px] font-black uppercase tracking-widest">
                                            {user?.id === item.owner._id ? "You own this item" : "Login to Bid"}
                                        </p>
                                        {user?.id === item.owner._id && (
                                            <button onClick={handleCloseAuction} className="mt-3 text-[#991B1B] text-[10px] font-black underline uppercase tracking-widest">End Auction Now</button>
                                        )}
                                    </div>
                                )
                            ) : (
                                <div className="text-center p-6 bg-red-50 rounded-[2rem] border border-red-100">
                                    <p className="text-[#991B1B] font-black uppercase tracking-[0.2em] text-[12px] mb-2">Sold To</p>
                                    <p className="text-2xl font-black text-[#111827]">{item.winner?.username || "Private Collector"}</p>
                                </div>
                            )}

                            {/* History list */}
                            <div className="mt-10">
                                <h5 className="text-[12px] font-black text-[#9CA3AF] uppercase tracking-[0.3em] mb-4 text-center">Recent Activity</h5>
                                <div className="space-y-4">
                                    {bids.length === 0 ? (
                                        <p className="text-center text-xs text-gray-300 italic">Be the first to bid...</p>
                                    ) : (
                                        bids.slice(0, 5).map((bid) => (
                                            <div key={bid._id} className="flex justify-between items-center text-sm border-b border-gray-50 pb-3">
                                                <span className="text-[#374151] font-bold">{bid.bidder.username}</span>
                                                <span className="text-[#991B1B] font-black">${bid.amount}</span>
                                            </div>
                                        ))
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    );
}