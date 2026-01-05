export default function Hero() {
    return(
        <section className="max-w-7xl mx-auto px-6 py-24 grid grid-cols-1 md:grid-cols-2 gap-16">
        
            {/* LEFT */}
            <div>
                <span className="inline-block mb-6 text-xs tracking-widest uppercase text-blue-700">
                    Independent Journal
                </span>

                <h2 className="text-4xl md:text-5xl font-semibold leading-tight mb-6">
                    Thoughts, essays, and ideas<br />
                    shaped by clarity.
                </h2>

                <p className="text-neutral-600 max-w-xl leading-relaxed mb-10">
                    A modern blogging platform built for writers who value structure,
                    calm aesthetics, and meaningful content over noise.
                </p>

                <div className="flex gap-4">
                    <button className="px-6 py-3 bg-blue-800 text-white text-sm font-medium hover:bg-blue-900 transition">
                        Start Reading
                    </button>

                    <button className="px-6 py-3 border border-neutral-300 text-sm font-medium hover:border-neutral-500 transition">
                        Explore Topics
                    </button>
                </div>
            </div>

            {/* RIGHT – VISUAL BLOCK */}
            <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-50 via-white to-red-50" />
                <div className="relative border border-neutral-200 bg-white p-10">
                    <p className="text-sm text-neutral-500 leading-relaxed">
                        “Good writing is not about excess — it is about intention, space,
                        and precision.”
                    </p>
                </div>
            </div>
        </section>
    )
}