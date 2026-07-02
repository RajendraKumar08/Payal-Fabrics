import Image from 'next/image'
import Link from 'next/link'
import { Playfair_Display } from 'next/font/google'
import Footer from '@/app/components/footer'

const playfair = Playfair_Display({
    subsets: ['latin'],
    weight: ['400', '600', '700'],
    style: ['normal', 'italic'],
});

export default async function Fabrics() {
    const res = await fetch(`${process.env.PUBLIC_BASE_URL}/api/getallitems?category=Fabric`, {
        method: 'GET'
    });
    if (!res.ok) {
        throw new Error("Failed to fetch fabrics");
    }
    const fabrics = await res.json();

    return (
        <main className="min-h-screen bg-[#faf6f0] text-black">

            {/* Hero Section */}
            <section className="relative overflow-hidden bg-gradient-to-br from-[#e5d5c5] to-[#f4eae1] py-24 px-6 text-center text-slate-900 border-b border-pink-100/50">

                <p className="uppercase tracking-[0.25em] text-[#7d5069] text-xs font-bold mb-3">
                    Payal Fabrics
                </p>

                <h1 className={`text-4xl md:text-5xl lg:text-6xl font-bold text-[#3c1e2e] mb-4 tracking-tight ${playfair.className}`}>
                    Our Fabrics
                </h1>

                <p className="max-w-xl mx-auto text-[#5c404f] text-sm md:text-base leading-relaxed">
                    Discover timeless elegance with our premium collection of luxurious fabrics,
                    crafted with beauty, comfort, and rich handblock print tradition.
                </p>

                {/* Accent Divider with mandala icon */}
                <div className="flex items-center justify-center gap-3 mt-6">
                    <span className="h-[1px] w-12 bg-[#4d243d]/20"></span>
                    <svg className="w-4 h-4 text-[#7d5069] shrink-0" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v18M3 12h18M5.5 5.5l13 13m-13 0l13-13M12 9a3 3 0 100 6 3 3 0 000-6z" />
                    </svg>
                    <span className="h-[1px] w-12 bg-[#4d243d]/20"></span>
                </div>
            </section>

            {/* Fabric Cards Grid */}
            <section className="max-w-7xl mx-auto px-4 md:px-6 py-10 md:py-20">

                <h2 className={`text-center text-3xl md:text-4xl font-extrabold text-[#3c1e2e] mb-12 tracking-tight ${playfair.className}`}>
                    Shop by Fabric
                </h2>

                {fabrics.length === 0 ? (
                    <div className="text-center py-20">
                        <p className="text-slate-500 text-base">
                            No fabrics available at the moment.
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">

                        {fabrics.map((fabric: any, index: number) => (
                            <Link
                                key={index}
                                href={`/product/${fabric.id}`}
                                className="group relative overflow-hidden rounded-2xl shadow-md hover:shadow-xl border border-pink-100/50 hover:border-pink-200/50 bg-white transition-all duration-500 ease-in-out cursor-pointer flex flex-col"
                            >

                                {/* Image */}
                                <div className="relative w-full h-[280px] sm:h-[320px] lg:h-[360px] overflow-hidden">

                                    <Image
                                        src={fabric.image || "/noimage.jpg"}
                                        alt={fabric.name}
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out"
                                    />

                                    {/* Overlay */}
                                    <div className="absolute inset-0 bg-[#4d243d]/80 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end justify-center pb-8 z-10">

                                        <div className="text-center">
                                            <span className="text-white text-xs font-bold tracking-[3px] uppercase border border-white/60 px-5 py-2.5 rounded-full hover:bg-white/10 transition-colors">
                                                Explore →
                                            </span>
                                        </div>

                                    </div>

                                    {/* Featured Badge */}
                                    {fabric.highlight && (
                                        <div className="absolute top-4 right-4 bg-[#4d243d] text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-md shadow-sm z-20">
                                            Featured
                                        </div>
                                    )}
                                </div>

                                {/* Card Text Content */}
                                <div className="px-5 py-4 border-t border-slate-100 bg-white flex-1 flex flex-col justify-between">
                                    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                                        <div>
                                            <h3 className={`text-lg font-bold text-[#3c1e2e] capitalize leading-snug group-hover:text-[#7d5069] transition-colors ${playfair.className}`}>
                                                {fabric.name}
                                            </h3>

                                            <p className="text-xs font-semibold text-[#7d5069] mt-1.5">
                                                ₹{fabric.price.toFixed(2)}/Meter
                                            </p>
                                        </div>

                                        <div className="flex flex-wrap items-center gap-2 shrink-0">
                                            <span className="text-[10px] font-bold text-[#7d5069] bg-[#4d243d]/5 border border-[#4d243d]/10 px-3 py-1 rounded-full uppercase tracking-wider">
                                                Premium
                                            </span>
                                            {fabric.stock <= 0 && (
                                                <span className="text-[10px] font-bold text-red-700 bg-red-50 border border-red-100 px-3 py-1 rounded-full uppercase tracking-wider">
                                                    Out of Stock
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}

                    </div>
                )}
            </section>

            {/* Bottom Banner */}
            <section className="bg-[#f4eae1] text-[#3c1e2e] text-center py-16 px-6 border-t border-pink-100/50">

                <h2 className={`text-3xl font-bold mb-4 tracking-tight ${playfair.className}`}>
                    Woven with <span className="italic font-normal text-[#5a2e48]">Tradition & Care</span>
                </h2>

                <p className="text-[#5c404f] max-w-xl mx-auto text-sm leading-relaxed">
                    Every fabric in our collection is carefully selected from the finest artisans
                    across India, bringing together elegance, culture, and heritage craftsmanship.
                </p>

            </section>
            <Footer />

        </main>
    )
}