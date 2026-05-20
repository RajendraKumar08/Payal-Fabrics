import Image from 'next/image'
import { Dancing_Script } from 'next/font/google'

const dancingScript = Dancing_Script({
    subsets: ['latin'],
    weight: ['400', '700'],
});

export default async function Women() {

    const res = await fetch(
    "http://localhost:3000/api/getallitems?category=dress material",
    {
        cache: "no-store",
    }
);
    // console.log("response", res);


    const wears = await res.json();
    // console.log("wears", wears);

    return (
        <main className="min-h-screen bg-gradient-to-b from-pink-50 via-white to-rose-50">

            {/* Hero Section */}
            <section className="relative overflow-hidden bg-gradient-to-r from-pink-700 via-rose-500 to-pink-400 py-24 px-6 text-center text-white">

                <div className="absolute top-0 left-0 w-72 h-72 bg-white/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>

                <p className="uppercase tracking-[6px] text-pink-100 text-sm mb-4">
                    Payal Fabrics
                </p>

                <h1 className={`text-5xl md:text-7xl font-bold mb-4 drop-shadow-lg ${dancingScript.className}`}>
                    Women&apos;s Collection
                </h1>

                <p className="max-w-2xl mx-auto text-pink-100 text-base md:text-lg leading-relaxed">
                    Elegance woven into every thread — explore our premium ethnic wear collection.
                </p>

                <div className="flex items-center justify-center gap-4 mt-8">
                    <span className="h-[1px] w-16 bg-pink-200"></span>
                    <span className="text-pink-100 text-xl">✦</span>
                    <span className="h-[1px] w-16 bg-pink-200"></span>
                </div>
            </section>

            {/* Products */}
            <section className="max-w-7xl mx-auto px-6 py-20">

                <h2 className={`text-center text-4xl md:text-5xl text-pink-700 mb-14 ${dancingScript.className}`}>
                    Shop by Category
                </h2>

                {wears.length === 0 ? (
                    <div className="text-center py-20">
                        <p className="text-gray-500 text-lg">
                            No wears available at the moment.
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">

                        {wears.map((wear: any, index: number) => (
                            <div
                                key={index}
                                className="group relative rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 ease-in-out cursor-pointer bg-white border border-pink-100"
                            >

                                {/* Image */}
                                <div className="relative w-full h-[380px] overflow-hidden">

                                    <Image
                                        src={wear.image || "/noimage.jpg"}
                                        alt={wear.name}
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out"
                                    />

                                    {/* Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-pink-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end justify-center pb-8">

                                        <div className="text-center">
                                            <span className="text-white text-sm font-semibold tracking-[3px] uppercase border border-white/70 px-5 py-2 rounded-full backdrop-blur-md">
                                                Explore →
                                            </span>
                                        </div>

                                    </div>

                                    {/* Featured Badge */}
                                    {wear.highlight && (
                                        <div className="absolute top-4 right-4 bg-white text-pink-600 text-xs font-semibold px-4 py-1.5 rounded-full shadow-md">
                                            Featured
                                        </div>
                                    )}
                                </div>

                                {/* Footer */}
                                <div className="px-6 py-5 flex items-center justify-between border-t border-pink-100 bg-white">

                                    <div>
                                        <h3 className={`text-2xl font-semibold text-pink-700 capitalize ${dancingScript.className}`}>
                                            {wear.name}
                                        </h3>

                                        <p className="text-sm text-gray-500 mt-1">
                                            ₹{wear.price.toFixed(2)}
                                        </p>
                                    </div>

                                    <span className="text-xs text-pink-500 bg-pink-50 border border-pink-200 px-4 py-1.5 rounded-full font-medium">
                                        Premium
                                    </span>
                                </div>
                            </div>
                        ))}

                    </div>
                )}

            </section>

            {/* Bottom Banner */}
            <section className="bg-gradient-to-r from-pink-700 via-rose-500 to-pink-400 text-white text-center py-16 px-6">

                <h2 className={`text-4xl mb-4 ${dancingScript.className}`}>
                    Crafted with Love & Tradition
                </h2>

                <p className="text-pink-100 max-w-2xl mx-auto leading-relaxed">
                    Every piece in our women&apos;s collection celebrates elegance,
                    beauty, and authentic Indian craftsmanship.
                </p>

            </section>

        </main>
    )
}