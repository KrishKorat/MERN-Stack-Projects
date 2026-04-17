export default function Navbar() {
    return(
        <header className="border-b border-neutral-200 bg-white">
            <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
                <h1 className="text-xl font-semibold tracking-tight">
                    <a href="/" className="hover:text-neutral-900 transition">
                        BleuBlanc
                    </a>
                </h1>

                <nav className="flex gap-8 text-sm font-medium text-neutral-600">
                    <a href="/" className="hover:text-neutral-900 transition">Articles</a>
                    <a href="/add" className="hover:text-neutral-900 transition">Write</a>
                </nav>
            </div>
        </header>
    );
}