export default function AuthLayout({ title, subtitle, children }) {
    return (
        <div className="flex items-center justify-center bg-neutral-50 px-4 py-20">
            <div className="w-full max-w-md bg-white border border-neutral-200 p-8">
                <h1 className="text-2xl font-semibold tracking-tight text-neutral-900">
                    {title}
                </h1>

                <p className="mt-2 text-sm text-neutral-600">
                    {subtitle}
                </p>

                <div className="mt-8">
                    {children}
                </div>
            </div>
        </div>
    );
}