import Image from 'next/image'
import Link from 'next/link'
import { Dancing_Script, Poppins } from 'next/font/google'

const dancingScript = Dancing_Script({
    subsets: ['latin'],
    weight: ['400', '700'],
});

const poppins = Poppins({
    subsets: ['latin'],
    weight: ['300', '400', '500'],
});




export default async function Women() {

    const res = await fetch(
    `${process.env.PUBLIC_BASE_URL}/api/getallitems?category=dress material`,
    {
        cache: "no-store",
    }
);
    if(!res.ok){
        throw new Error("Failed to fetch wears");
    }
    const wears = await res.json();

    return (
        <main className="min-h-screen bg-white flex flex-col text-white">

            {/* ── Full-page Coming Soon ── */}
            <section className="flex-1 flex flex-col items-center justify-center px-6 py-24 relative overflow-hidden">

                {/* Background decorative blobs */}
                <span className="absolute top-0 left-0 w-80 h-80 rounded-full bg-pink-500/20 blur-3xl -translate-x-1/2 -translate-y-1/2" />
                <span className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-pink-300/20 blur-3xl translate-x-1/3 translate-y-1/3" />
                <span className="absolute top-1/2 left-1/2 w-64 h-64 rounded-full bg-white/10 blur-2xl -translate-x-1/2 -translate-y-1/2" />

                {/* Content card */}
                <div className="relative z-10 text-center max-w-lg bg-pink-900 border border-white/20 rounded-3xl p-10 shadow-2xl shadow-pink-900/40 backdrop-blur-xl">

                    {/* Sparkle icon */}
                    <div className="flex justify-center mb-6">
                        <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center shadow-lg shadow-pink-500/30">
                            <span className="text-pink-700 text-4xl">✦</span>
                        </div>
                    </div>

                    {/* Label */}
                    <p className={`text-xs uppercase tracking-[0.3em] text-pink-100 mb-3 ${poppins.className}`}>
                        Payal Fabrics · Accessories
                    </p>

                    {/* Main heading */}
                    <h1 className={`text-6xl md:text-7xl text-white leading-tight mb-4 ${dancingScript.className}`}>
                        Coming Soon
                    </h1>

                    {/* Divider */}
                    <div className="flex items-center justify-center gap-3 my-5">
                        <span className="block h-px w-16 bg-pink-200/70" />
                        <span className="text-pink-200 text-sm">✦</span>
                        <span className="block h-px w-16 bg-pink-200/70" />
                    </div>

                    {/* Subtitle */}
                    <p className={`text-pink-100 text-base leading-relaxed mb-8 ${poppins.className}`}>
                        We&apos;re curating a beautiful collection of accessories — jewellery, bags, dupattas &amp; more.
                        <br />
                        <span className="text-white font-medium">Stay tuned, something lovely is on its way!</span>
                    </p>

                    {/* Decorative pill tags */}
                    <div className={`flex flex-wrap justify-center gap-2 ${poppins.className}`}>
                        {['Jewellery', 'Bags', 'Dupattas', 'Hair Accessories', 'Footwear'].map((tag) => (
                            <span
                                key={tag}
                                className="text-xs text-pink-900 bg-white px-4 py-1.5 rounded-full font-semibold"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Bottom strip ── */}
            <section className="bg-black text-white text-center py-8 px-6">
                <p className={`text-sm text-white ${poppins.className}`}>
                    © Payal Fabrics · Crafted with love for every woman
                </p>
            </section>
        </main>
    )
}