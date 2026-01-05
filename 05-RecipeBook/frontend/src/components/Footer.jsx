export default function Footer() {
    return (
        <footer className="border-t border-neutral-200 bg-white mt-20">
            <div className="max-w-6xl mx-auto px-4 py-8">
                <p className="text-sm text-neutral-600">
                    © {new Date().getFullYear()} Recipe. Crafted with care.
                </p>
            </div>
        </footer>
    );
}
