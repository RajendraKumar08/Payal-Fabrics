import Image from 'next/image'
import Link from 'next/link'
import { Playfair_Display, Poppins } from 'next/font/google'
import Footer from '@/app/components/footer'

const playfair = Playfair_Display({
    subsets: ['latin'],
    weight: ['400', '600', '700'],
    style: ['normal', 'italic'],
});

const poppins = Poppins({
    subsets: ['latin'],
    weight: ['300', '400', '500', '600'],
});

export default async function Women() {
    return (
        <main className="min-h-screen bg-[#faf6f0] flex flex-col text-slate-800">

            {/* ── Full-page Coming Soon ── */}
            <section className="flex-1 flex flex-col items-center justify-center px-6 py-24 relative overflow-hidden bg-gradient-to-br from-[#faf6f0] to-[#f4eae1]">

                {/* Background decorative blobs */}
                <span className="absolute top-0 left-0 w-80 h-80 rounded-full bg-pink-100/40 blur-3xl -translate-x-1/2 -translate-y-1/2" />
                <span className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-white-200/30 blur-3xl translate-x-1/3 translate-y-1/3" />
                <span className="absolute top-1/2 left-1/2 w-64 h-64 rounded-full bg-white/20 blur-2xl -translate-x-1/2 -translate-y-1/2" />

                {/* Content card */}
                <div className="relative z-10 text-center max-w-lg bg-white border border-pink-100/50 rounded-3xl p-10 shadow-xl backdrop-blur-md">

                    {/* Sparkle icon */}
                    <div className="flex justify-center mb-6">
                        <div className="w-14 h-14 rounded-full bg-[#4d243d] flex items-center justify-center shadow-lg shadow-pink-900/10 text-white">
                            <span className="text-xl">✦</span>
                        </div>
                    </div>

                    {/* Label */}
                    <p className={`text-[10px] uppercase tracking-[0.25em] text-[#7d5069] font-bold mb-3 ${poppins.className}`}>
                        Payal Fabrics · Catalog
                    </p>

                    {/* Main heading */}
                    <h1 className={`text-5xl md:text-6xl text-[#3c1e2e] font-extrabold leading-tight mb-4 ${playfair.className}`}>
                        Coming Soon
                    </h1>

                    {/* Divider */}
                    <div className="flex items-center justify-center gap-3 my-5">
                        <span className="block h-px w-16 bg-[#4d243d]/20" />
                        <svg className="w-4 h-4 text-[#7d5069] shrink-0" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v18M3 12h18M5.5 5.5l13 13m-13 0l13-13M12 9a3 3 0 100 6 3 3 0 000-6z" />
                        </svg>
                        <span className="block h-px w-16 bg-[#4d243d]/20" />
                    </div>

                    {/* Subtitle */}
                    <p className={`text-slate-600 text-sm leading-relaxed mb-8 ${poppins.className}`}>
                        We&apos;re curating a beautiful collection of premium dress materials — including unstitched salwar suits, block-printed cotton sets, luxury silk suit materials, and traditional designer wear.
                        <br />
                        <span className="text-[#4d243d] font-bold mt-3 block">Stay tuned, something lovely is on its way!</span>
                    </p>

                    {/* Decorative pill tags */}
                    <div className={`flex flex-wrap justify-center gap-2 ${poppins.className}`}>
                        {['Unstitched Suits', 'Cotton Sets', 'Chanderi Silk', 'Silk Cotton', 'Designer Wear'].map((tag) => (
                            <span
                                key={tag}
                                className="text-[10px] font-bold text-[#7d5069] bg-[#4d243d]/5 border border-[#4d243d]/10 px-3.5 py-1.5 rounded-full uppercase tracking-wider"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Bottom strip ── */}
            <section className="bg-[#f4eae1] text-[#3c1e2e] text-center py-6 px-6 border-t border-pink-100/50">
                <p className={`text-xs text-[#5c404f] font-semibold ${poppins.className}`}>
                    © Payal Fabrics · Crafted with love for every woman
                </p>
            </section>
            <Footer/>
        </main>
    )
}