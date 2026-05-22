import Image from 'next/image'
import { Dancing_Script } from 'next/font/google'
import AddToCartButton from '@/app/components/AddToCartButton';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';

const dancingScript = Dancing_Script({
    subsets: ['latin'],
    weight: ['400', '700'],
});

export default async function Fabrics() {
    const res = await fetch(
        "http://localhost:3000/api/getallitems?category=fabric",
        {
            cache: "no-store",
        }
    );

    const fabrics = await res.json();
    const { isAuthenticated } = getKindeServerSession();
    const authenticated = Boolean(await isAuthenticated());

    return (
        <main className="min-h-screen bg-slate-50">

            {/* Hero Section */}
            <section className="relative overflow-hidden bg-slate-950 py-24 px-6 text-center text-slate-900">

                <div className="absolute top-0 left-0 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl"></div>

                <p className="uppercase tracking-[6px] text-purple-600 text-sm mb-4">
                    Payal Fabrics
                </p>

                <h1 className={`text-5xl md:text-7xl font-bold text-white mb-4 drop-shadow-lg ${dancingScript.className}`}>
                    Our Fabrics
                </h1>

                <p className="max-w-2xl mx-auto text-purple-300 text-base md:text-lg leading-relaxed">
                    Discover timeless elegance with our premium collection of luxurious fabrics,
                    crafted with beauty, comfort, and tradition.
                </p>

                <div className="flex items-center justify-center gap-4 mt-8">
                    <span className="h-[1px] w-16 bg-slate-300"></span>
                    <span className="text-purple-600 text-xl">✦</span>
                    <span className="h-[1px] w-16 bg-slate-300"></span>
                </div>
            </section>

            {/* Fabric Section */}
            <section className="max-w-7xl mx-auto px-6 py-20">

                <h2 className={`text-center text-4xl md:text-5xl text-slate-900 mb-14 ${dancingScript.className}`}>
                    Shop by Fabric
                </h2>

                {fabrics.length === 0 ? (
                    <div className="text-center py-20">
                        <p className="text-slate-500 text-lg">
                            No fabrics available at the moment.
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">

                        {fabrics.map((fabric: any, index: number) => (
                            <div
                                key={index}
                                className="group relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 ease-in-out cursor-pointer bg-white border border-slate-200"
                            >

                                {/* Image */}
                                <div className="relative w-full h-[380px] overflow-hidden">

                                    <Image
                                        src={fabric.image || "/noimage.jpg"}
                                        alt={fabric.name}
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out"
                                    />

                                    {/* Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end justify-center pb-8">

                                        <div className="text-center">
                                            <span className="text-white text-sm font-semibold tracking-[3px] uppercase border border-white/70 px-5 py-2 rounded-full backdrop-blur-md">
                                                Explore →
                                            </span>
                                        </div>

                                    </div>

                                    {/* Featured Badge */}
                                    {fabric.highlight && (
                                        <div className="absolute top-4 right-4 bg-purple-100 text-purple-900 text-xs font-semibold px-4 py-1.5 rounded-full shadow-sm">
                                            Featured
                                        </div>
                                    )}
                                </div>

                                {/* Footer */}
                                <div className="px-6 py-5 border-t border-slate-200 bg-white">
                                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                                        <div>
                                            <h3 className={`text-2xl font-semibold text-slate-900 capitalize ${dancingScript.className}`}>
                                                {fabric.name}
                                            </h3>

                                            <p className="text-sm text-slate-500 mt-1">
                                                ₹{fabric.price.toFixed(2)}
                                            </p>
                                        </div>

                                        <div className="flex flex-wrap items-center gap-3">
                                            <span className="text-xs text-purple-900 bg-purple-100 border border-purple-200 px-4 py-1.5 rounded-full font-medium">
                                                Premium
                                            </span>
                                            <AddToCartButton
                                                product={{
                                                    id: fabric.id?.toString() || fabric.name,
                                                    name: fabric.name,
                                                    price: Number(fabric.price) || 0,
                                                    image: fabric.image || "",
                                                }}
                                                authenticated={authenticated}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}

                    </div>
                )}
            </section>

            {/* Bottom Banner */}
            <section className="bg-slate-100 text-slate-900 text-center py-16 px-6">

                <h2 className={`text-4xl mb-4 ${dancingScript.className}`}>
                    Woven with Tradition & Care
                </h2>

                <p className="text-slate-500 max-w-2xl mx-auto leading-relaxed">
                    Every fabric in our collection is carefully selected from the finest artisans
                    across India, bringing together elegance, culture, and craftsmanship.
                </p>

            </section>

        </main>
    )
}