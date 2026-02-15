import { Link } from "react-router-dom";

export default function Footer() {
    return (
        <footer className="bg-white border-t border-[#F3F4F6]">
            <div className="max-w-7xl mx-auto px-6 py-16">
                <div className="flex flex-col md:flex-row justify-between items-start gap-12">
                    <div className="space-y-4">
                        <span className="text-2xl font-black italic text-[#111827]">Bidora</span>
                        <p className="text-[#4B5563] max-w-xs font-medium leading-relaxed">
                            Curating the finest collectibles for the modern connoisseur. Experience luxury bidding.
                        </p>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-16">
                        <div className="flex flex-col space-y-3 font-bold text-[#374151]">
                            <h4 className="text-[#991B1B] uppercase text-xs tracking-[0.2em] mb-2">Explore</h4>
                            <Link to="/items" className="hover:text-[#991B1B] hover:translate-x-1 transition-all">Marketplace</Link>
                            <Link to="/active" className="hover:text-[#991B1B] hover:translate-x-1 transition-all">Live Events</Link>
                            <Link to="/categories" className="hover:text-[#991B1B] hover:translate-x-1 transition-all">Collections</Link>
                        </div>
                        <div className="flex flex-col space-y-3 font-bold text-[#374151]">
                            <h4 className="text-[#991B1B] uppercase text-xs tracking-[0.2em] mb-2">Company</h4>
                            <Link to="/" className="hover:text-[#991B1B] hover:translate-x-1 transition-all">About Us</Link>
                            <Link to="#" className="hover:text-[#991B1B] hover:translate-x-1 transition-all">Terms</Link>
                            <Link to="#" className="hover:text-[#991B1B] hover:translate-x-1 transition-all">Privacy</Link>
                        </div>
                    </div>
                </div>
                
                <div className="mt-16 pt-8 border-t border-[#F3F4F6] flex items-center text-[#9CA3AF] font-bold text-[11px] uppercase tracking-widest">
                    <p>© {new Date().getFullYear()} Bidora Global. All Rights Reserved.</p>
                </div>
            </div>
        </footer>
    );
}