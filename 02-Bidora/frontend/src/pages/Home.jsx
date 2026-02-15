import { Link } from "react-router-dom";

export default function Home() {
return (
    <div className="bg-[#FFFAFA] min-h-screen font-sans">
        {/* Hero Section */}
        <section className="relative overflow-hidden px-6 pt-24 pb-32 text-center">
            {/* Decorative Floating Orbs - Adjusted to subtle grays/reds */}
            <div className="absolute top-0 left-1/4 w-64 h-64 bg-[#FEE2E2] rounded-full filter blur-3xl opacity-40 animate-pulse"></div>
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#F3F4F6] rounded-full filter blur-3xl opacity-60"></div>
            
            <div className="relative z-10 max-w-7xl mx-auto">
                <span className="inline-block px-4 py-1.5 mb-6 text-xs font-black tracking-[0.3em] uppercase text-[#991B1B] bg-[#FEF2F2] border border-[#FECACA] rounded-full">
                    The World's Most Trusted Auction House
                </span>
                <h2 className="text-7xl font-black text-[#111827] mb-8 leading-[1.1] tracking-tighter">
                    Discover. Bid. <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#991B1B] to-[#DC2626]">Win Treasures.</span>
                </h2>
                <p className="text-xl text-[#4B5563] max-w-2xl mx-auto font-medium leading-relaxed mb-12">
                    Join a community of connoisseurs. Experience premium auctions with real-time bidding, 
                    secure listings, and curated collections of rare beauty.
                </p>
                <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                    <Link to="/items" className="bg-[#991B1B] text-white px-10 py-4 rounded-2xl font-bold shadow-xl shadow-red-100 hover:bg-[#7F1D1D] hover:-translate-y-1 transition-all text-lg">
                        Start Bidding Now
                    </Link>
                    <Link to="/active" className="bg-white text-[#111827] border-2 border-[#E5E7EB] px-10 py-4 rounded-2xl font-bold hover:bg-[#F9FAFB] transition-all text-lg">
                        View Live Events
                    </Link>
                </div>
            </div>
        </section>

        {/* Live Stats Bar */}
        <section className="max-w-7xl mx-auto px-6 -mt-16 relative z-20">
            <div className="bg-white border-2 border-[#F3F4F6] rounded-[2.5rem] shadow-2xl p-10 grid grid-cols-2 lg:grid-cols-4 gap-8">
                {[
                    { label: "Active Auctions", val: "1.2k+", color: "text-[#991B1B]" },
                    { label: "Total Bidders", val: "45k", color: "text-[#111827]" },
                    { label: "Items Sold", val: "$2.4M", color: "text-[#991B1B]" },
                    { label: "Success Rate", val: "99.9%", color: "text-[#111827]" }
                ].map((stat, i) => (
                    <div key={i} className="text-center border-r last:border-0 border-gray-100">
                        <p className={`text-3xl font-black ${stat.color}`}>{stat.val}</p>
                        <p className="text-[10px] uppercase tracking-widest font-bold text-gray-400 mt-1">{stat.label}</p>
                    </div>
                ))}
            </div>
        </section>

        {/* Features / How it Works */}
        <section className="max-w-7xl mx-auto px-6 py-32">
            <div className="flex justify-between items-end mb-16">
                <div className="text-left">
                    <h3 className="text-4xl font-black text-[#111827] tracking-tight">How it Works</h3>
                    <p className="text-[#991B1B] font-bold mt-2 uppercase tracking-widest text-xs">Simple. Secure. Sophisticated.</p>
                </div>
            </div>
            
            <div className="grid md:grid-cols-3 gap-12">
                {[
                    { title: "Browse Collections", desc: "Explore hand-picked luxury items from verified collectors globally.", icon: "💎" },
                    { title: "Place Your Bid", desc: "Use our real-time bidding engine to secure your favorite items instantly.", icon: "⚡" },
                    { title: "Secure Delivery", desc: "Enjoy fully insured, white-glove shipping straight to your doorstep.", icon: "🎁" }
                ].map((step, idx) => (
                    <div key={idx} className="bg-white p-10 rounded-[2rem] border-b-4 border-[#F3F4F6] shadow-sm hover:shadow-md transition-shadow border border-gray-100">
                        <div className="text-4xl mb-6">{step.icon}</div>
                        <h4 className="text-xl font-bold text-[#111827] mb-4">{step.title}</h4>
                        <p className="text-[#4B5563] text-sm leading-relaxed font-medium">{step.desc}</p>
                    </div>
                ))}
            </div>
        </section>

        {/* CTA Section */}
        <section className="max-w-7xl mx-auto px-6 pb-32">
            <div className="bg-gradient-to-r from-[#7F1D1D] to-[#B91C1C] rounded-[3rem] p-16 text-center relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-10">
                    <svg className="w-64 h-64 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                </div>
                <h3 className="text-4xl font-black text-white mb-6 italic">Ready to find something extraordinary?</h3>
                <p className="text-red-100 mb-10 max-w-xl mx-auto font-medium">Join thousands of collectors today. Registration is free and takes less than a minute.</p>
                <Link to="/register" className="bg-white text-[#991B1B] px-12 py-4 rounded-full font-black uppercase tracking-widest hover:bg-[#FFF5F5] transition-all inline-block">
                    Create Free Account
                </Link>
            </div>
        </section>
    </div>
);
}