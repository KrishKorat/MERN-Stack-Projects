import { Link } from "react-router";
import { PlusIcon } from "lucide-react";

const Navbar = () => {
    return (
        <header className="bg-white/80 backdrop-blur-md border-b border-[#3A77FF]/10 sticky top-0 z-50">
          <div className="mx-auto max-w-6xl px-6 py-5">
            <div className="flex items-center justify-between">
              {/* Brand */}
              <h1 className="text-4xl font-serif italic font-bold text-[#3A77FF] tracking-tighter">
                ThinkBoard
              </h1>
              
              {/* Action */}
              <Link 
                to="/create" 
                className="bg-[#3A77FF] text-white px-8 py-3 rounded-full font-semibold shadow-[0_10px_20px_rgba(58,119,255,0.2)] hover:scale-105 hover:shadow-[0_15px_30px_rgba(58,119,255,0.3)] transition-all flex items-center gap-2"
              >
                <PlusIcon className="size-5" />
                <span>New Entry</span>
              </Link>
            </div>
          </div>
        </header>
    );
};
export default Navbar;