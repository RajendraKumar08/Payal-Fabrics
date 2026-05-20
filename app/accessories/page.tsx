import { Dancing_Script, Poppins } from 'next/font/google'

const dancingScript = Dancing_Script({
    subsets: ['latin'],
    weight: ['400', '700'],
});

const poppins = Poppins({
    subsets: ['latin'],
    weight: ['300', '400', '500'],
});

export default function Accessories() {
    return (
        <main className="min-h-screen bg-gradient-to-b from-pink-50 to-white flex flex-col">

            {/* ── Full-page Coming Soon ── */}
            <section className="flex-1 flex flex-col items-center justify-center px-6 py-24 relative overflow-hidden">

                {/* Background decorative blobs */}
                <span className="absolute top-0 left-0 w-80 h-80 rounded-full bg-pink-200/40 blur-3xl -translate-x-1/2 -translate-y-1/2" />
                <span className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-rose-200/40 blur-3xl translate-x-1/3 translate-y-1/3" />
                <span className="absolute top-1/2 left-1/2 w-64 h-64 rounded-full bg-pink-100/60 blur-2xl -translate-x-1/2 -translate-y-1/2" />

                {/* Content card */}
                <div className="relative z-10 text-center max-w-lg">

                    {/* Sparkle icon */}
                    <div className="flex justify-center mb-6">
                        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-pink-500 to-rose-400 flex items-center justify-center shadow-lg shadow-pink-300/50">
                            <span className="text-white text-4xl">✦</span>
                        </div>
                    </div>

                    {/* Label */}
                    <p className={`text-xs uppercase tracking-[0.3em] text-pink-400 mb-3 ${poppins.className}`}>
                        Payal Fabrics · Accessories
                    </p>

                    {/* Main heading */}
                    <h1 className={`text-6xl md:text-7xl text-pink-700 leading-tight mb-4 ${dancingScript.className}`}>
                        Coming Soon
                    </h1>

                    {/* Divider */}
                    <div className="flex items-center justify-center gap-3 my-5">
                        <span className="block h-px w-16 bg-pink-300" />
                        <span className="text-pink-400 text-sm">✦</span>
                        <span className="block h-px w-16 bg-pink-300" />
                    </div>

                    {/* Subtitle */}
                    <p className={`text-gray-500 text-base leading-relaxed mb-8 ${poppins.className}`}>
                        We&apos;re curating a beautiful collection of accessories — jewellery, bags, dupattas &amp; more.
                        <br />
                        <span className="text-pink-500 font-medium">Stay tuned, something lovely is on its way!</span>
                    </p>

                    {/* Decorative pill tags */}
                    <div className={`flex flex-wrap justify-center gap-2 ${poppins.className}`}>
                        {['Jewellery', 'Bags', 'Dupattas', 'Hair Accessories', 'Footwear'].map((tag) => (
                            <span
                                key={tag}
                                className="text-xs text-pink-600 bg-pink-50 border border-pink-200 px-4 py-1.5 rounded-full font-medium"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Bottom strip ── */}
            <section className="bg-gradient-to-r from-rose-400 via-pink-500 to-pink-700 text-white text-center py-8 px-6">
                <p className={`text-sm text-pink-100 ${poppins.className}`}>
                    © Payal Fabrics · Crafted with love for every woman
                </p>
            </section>
        </main>
    )
}