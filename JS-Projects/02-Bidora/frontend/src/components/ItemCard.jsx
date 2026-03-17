import {Link} from "react-router-dom";
import { isValidImage } from "../utils/isValidImage";

export default function ItemCard({ item }) {
    return (
    <div className="group bg-white rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-2xl hover:shadow-red-200/30 transition-all duration-500 overflow-hidden flex flex-col h-full">
        {/* Image Container with Zoom Effect */}
        <div className="relative h-64 overflow-hidden">
            {isValidImage(item.image) ? (
                <img
                    src={item.image}
                    alt={item.title}
                    className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
            ) : (
                <div className="h-full w-full bg-[#F9FAFB] flex items-center justify-center text-gray-300 italic">
                    No Image Available
                </div>
            )}
            
            {/* Category Tag (Top Left) */}
            <div className="absolute top-4 left-4">
                <span className="bg-black/60 backdrop-blur-md text-white text-[9px] px-3 py-1 rounded-lg font-black uppercase tracking-widest">
                    {item.category}
                </span>
            </div>

            {/* Floating Status Badge (Top Right) */}
            <div className="absolute top-4 right-4">
                <span className={`text-[10px] px-4 py-1.5 rounded-full font-black uppercase tracking-widest shadow-lg border ${
                    item.isActive
                        ? "bg-white text-[#991B1B] border-red-100"
                        : "bg-gray-800 text-gray-400 border-gray-700"
                }`}>
                    {item.isActive ? "• Live Now" : "Closed"}
                </span>
            </div>
        </div>

        <div className="p-6 flex flex-col flex-grow">
            <div className="mb-4">
                <div className="flex justify-between items-start mb-1">
                    <h3 className="text-xl font-black text-[#111827] tracking-tighter line-clamp-1 group-hover:text-[#991B1B] transition-colors">
                        {item.title}
                    </h3>
                </div>
                <p className="text-[#6B7280] text-[11px] font-bold uppercase tracking-widest flex items-center">
                    <span className="w-4 h-[1px] bg-red-600 mr-2"></span>
                    By {item.owner?.username || "Legacy Member"}
                </p>
            </div>

            <p className="text-[#4B5563] text-sm mb-6 line-clamp-2 font-medium leading-relaxed italic border-l-2 border-gray-100 pl-4">
                {item.description}
            </p>

            <div className="mt-auto">
                {/* Detailed Bid Area: No fluff, just data */}
                <div className="flex items-center justify-between mb-6 bg-[#FFFAFA] p-5 rounded-2xl border border-red-50">
                    <div>
                        <p className="text-[10px] font-black text-[#9CA3AF] uppercase tracking-widest mb-1">Current Valuation</p>
                        <p className="text-3xl font-black text-[#111827] tracking-tighter">
                            ${item.currentPrice.toLocaleString()}
                        </p>
                    </div>
                </div>

                <Link 
                    to={`/items/${item._id}`}
                    className="block text-center bg-[#991B1B] text-white py-4 rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl shadow-red-100 hover:bg-[#7F1D1D] hover:-translate-y-1 transition-all active:scale-95 group-hover:shadow-red-200"
                >
                    View Auction
                </Link>
            </div>
        </div>
    </div>
);
}
