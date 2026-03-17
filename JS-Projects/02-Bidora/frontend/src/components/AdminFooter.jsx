export default function AdminFooter() {
    return (
        <footer className="bg-[#FFFBFB] border-t-8 border-red-50 mt-auto">
            <div className="max-w-7xl mx-auto px-6 py-10">
                <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="flex items-center space-x-4">
                        <span className="text-xl font-black italic text-[#111827]">Bidora</span>
                        <span className="h-6 w-[1px] bg-red-100"></span>
                        <div className="flex items-center bg-white border border-red-100 px-3 py-1 rounded-full shadow-sm">
                            <span className="w-2 h-2 bg-[#10B981] rounded-full mr-2 shadow-[0_0_5px_#10B981]"></span>
                            <span className="text-[10px] font-black text-[#991B1B] uppercase tracking-tighter">System: Active</span>
                        </div>
                    </div>

                    <div className="flex space-x-8 text-xs font-bold text-[#111827] uppercase tracking-widest">
                        <span className="cursor-default">Version 1.2.0</span>
                        <span className="text-red-100">|</span>
                        <span className="cursor-default text-[#991B1B]">Secure Admin Access Only</span>
                    </div>
                </div>
                
                <div className="mt-8 pt-6 border-t border-red-50 flex justify-between items-center text-[#9CA3AF] font-bold text-[11px] uppercase tracking-widest">
                    <p>© {new Date().getFullYear()} Management Portal</p>
                    <p className="italic normal-case text-[#991B1B]">Last login: {new Date().toLocaleDateString()}</p>
                </div>
            </div>
        </footer>
    );
}
