import Image from 'next/image'
import { Dancing_Script } from 'next/font/google'

const dancingScript = Dancing_Script({
    subsets: ['latin'],
    weight: ['400', '700'],
});

const fabrics = [
    { label: 'Ajrakh', slug: 'ajargh' },
    { label: 'Baghru', slug: 'baghru' },
    { label: 'Plain', slug: 'plain' },
    { label: 'Ikat', slug: 'ikat' },
    { label: 'Silk', slug: 'silk' },
];

export default function Fabrics() {
    return (
        <main className="min-h-screen bg-gradient-to-b from-pink-50 to-white">

            {/* ── Hero Banner ── */}
            <section className="relative bg-gradient-to-r from-pink-700 via-pink-500 to-rose-400 text-white py-16 px-6 text-center overflow-hidden">
                {/* decorative circles */}
                <span className="absolute -top-10 -left-10 w-48 h-48 rounded-full bg-white/10 blur-2xl" />
                <span className="absolute -bottom-10 -right-10 w-64 h-64 rounded-full bg-white/10 blur-2xl" />

                <p className="text-sm uppercase tracking-widest text-pink-100 mb-2">Payal Fabrics</p>
                <h1 className={`text-5xl md:text-6xl font-bold drop-shadow-md ${dancingScript.className}`}>
                    Our Fabrics
                </h1>
                <p className="mt-3 text-pink-100 text-base max-w-md mx-auto">
                    Discover the finest textiles — from hand-block prints to luxurious silks.
                </p>

                {/* decorative divider */}
                <div className="flex items-center justify-center gap-3 mt-6">
                    <span className="block h-px w-16 bg-pink-200/60" />
                    <span className="text-pink-200 text-lg">✦</span>
                    <span className="block h-px w-16 bg-pink-200/60" />
                </div>
            </section>

            {/* ── Fabric Grid ── */}
            <section className="max-w-7xl mx-auto px-6 py-14">
                <h2 className={`text-center text-3xl text-pink-700 mb-10 ${dancingScript.className}`}>
                    Shop by Fabric
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {fabrics.map((fabric, index) => (
                        <div
                            key={index}
                            className="group relative rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-400 ease-in-out cursor-pointer bg-white border border-pink-100"
                        >
                            {/* Image */}
                            <div className="relative w-full h-[320px] overflow-hidden">
                                <Image
                                    src="/noimage.jpg"
                                    alt={fabric.label}
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out"
                                />
                                {/* Hover overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-pink-700/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex items-end justify-center pb-6">
                                    <span className="text-white text-sm font-semibold tracking-widest uppercase border border-white/70 px-4 py-1.5 rounded-full backdrop-blur-sm">
                                        Explore →
                                    </span>
                                </div>
                            </div>

                            {/* Card Footer */}
                            <div className="px-5 py-4 flex items-center justify-between border-t border-pink-100">
                                <h3 className={`text-xl font-semibold text-pink-700 capitalize ${dancingScript.className}`}>
                                    {fabric.label}
                                </h3>
                                <span className="text-xs text-pink-400 bg-pink-50 border border-pink-200 px-3 py-1 rounded-full font-medium">
                                    Premium
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ── Bottom Banner ── */}
            <section className="bg-gradient-to-r from-rose-400 via-pink-500 to-pink-700 text-white text-center py-12 px-6">
                <h2 className={`text-3xl mb-3 ${dancingScript.className}`}>Woven with Tradition &amp; Care</h2>
                <p className="text-pink-100 text-sm max-w-lg mx-auto">
                    Each fabric in our collection is sourced from the finest artisans across India.
                </p>
            </section>
        </main>
    )
}