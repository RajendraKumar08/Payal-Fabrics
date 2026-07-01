import Link from "next/link";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { prisma } from "@/prisma-db";
import ChangeBgImage from "@/app/components/changeBgimage";
import { Playfair_Display } from "next/font/google";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  style: ["normal", "italic"],
});

const Homepage = async () => {

  const { getUser } = getKindeServerSession();
  // console.log("ENV db url", process.env.DATABASE_URL)
  const highlights = await prisma.product.findMany({
    where: {
      highlight: true,
    },
    take: 6,
  });
  const displayedHighlights = Array.isArray(highlights) ? highlights.slice(0, 6) : [];

  const user = await getUser();
  console.log("user in homepage", user);
  return (
    <>
      <div className="bg-white">
        <ChangeBgImage />
      </div>

      {/* Highlights Section */}
      <section className="bg-[#faf6f0] py-12 md:py-24 px-4 md:px-6 border-t border-pink-100/50">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="uppercase tracking-[0.25em] text-[#7d5069] text-xs font-bold mb-3">Curated Selection</p>
            <h2 className={`text-4xl md:text-5xl font-extrabold text-[#3c1e2e] tracking-tight mb-4 ${playfair.className}`}>
              Our Highlights
            </h2>
            <p className="text-[#5c404f] text-sm md:text-base leading-relaxed">
              Explore our most loved and premium collections, crafted with heritage techniques, traditional handblock prints, and timeless elegance.
            </p>
            {/* Accent Divider with mandala icon */}
            <div className="flex items-center justify-center gap-3 mt-6">
              <span className="block h-[1px] w-12 bg-[#4d243d]/20" />
              <svg className="w-4 h-4 text-[#7d5069] shrink-0" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v18M3 12h18M5.5 5.5l13 13m-13 0l13-13M12 9a3 3 0 100 6 3 3 0 000-6z" />
              </svg>
              <span className="block h-[1px] w-12 bg-[#4d243d]/20" />
            </div>
          </div>

          {displayedHighlights.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-slate-500 text-base">
                No highlights available at the moment.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {displayedHighlights.map((highlight: any, index: number) => (
                <Link
                  key={index}
                  href={`/product/${highlight.id}`}
                  className="group relative overflow-hidden rounded-2xl shadow-md hover:shadow-xl border border-pink-100/50 hover:border-pink-200/50 bg-white transition-all duration-500 ease-in-out cursor-pointer flex flex-col"
                >
                  {/* Image */}
                  <div className="relative w-full h-[280px] sm:h-[320px] lg:h-[360px] overflow-hidden">
                    <img
                      src={highlight.image || "/noimage.jpg"}
                      alt={highlight.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out"
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
                    <div className="absolute top-4 right-4 bg-[#4d243d] text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-md shadow-sm z-20">
                      Featured
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="px-5 py-4 border-t border-slate-100 bg-white flex-1 flex flex-col justify-between">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <h3 className={`text-lg font-bold text-[#3c1e2e] capitalize leading-snug group-hover:text-[#7d5069] transition-colors ${playfair.className}`}>
                          {highlight.name}
                        </h3>
                        <p className="text-xs font-semibold text-[#7d5069] mt-1.5">
                          ₹{highlight.price}
                        </p>
                      </div>

                      <div className="flex flex-wrap items-center gap-2 shrink-0">
                        <span className="text-[10px] font-bold text-[#7d5069] bg-[#4d243d]/5 border border-[#4d243d]/10 px-3 py-1 rounded-full uppercase tracking-wider">
                          Premium
                        </span>
                        {highlight.stock <= 0 && (
                          <span className="text-[10px] font-bold text-red-700 bg-red-50 border border-red-100 px-3 py-1 rounded-full uppercase tracking-wider">
                            Out of Stock
                          </span>
                        )}
                      </div>
                    </div>
                    {highlight.description && (
                      <p className="text-slate-500 text-xs mt-3.5 line-clamp-2 leading-relaxed">
                        {highlight.description}
                      </p>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      <footer className="bg-slate-950 text-slate-100 py-10 px-4 md:px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">

          <div>
            <h2 className="text-2xl font-bold mb-4 text-white">
              Behind Payal Fabrics
            </h2>

            <ul className="space-y-3 text-slate-300">
              <li>
                <Link
                  href="https://www.instagram.com/payal_tailor10.06/"
                  className="hover:text-white transition"
                >
                  Payal Ladies Tailor
                </Link>
              </li>

              <li>
                <Link
                  href="https://www.instagram.com/payal_tailor10.06/"
                  className="hover:text-white transition"
                >
                  Gulshan Tailor
                </Link>
              </li>

              <li>
                <Link
                  href="https://www.instagram.com/payal_tailor10.06/"
                  className="hover:text-white transition"
                >
                  Payal Tailor
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4 text-white">
              Created By
            </h2>

            <ul className="space-y-3 text-slate-300">
              <li>
                <Link
                  href="https://www.instagram.com/payal_tailor10.06/"
                  className="hover:text-white transition"
                >
                  Rajendra
                </Link>
              </li>

              <li>
                <Link
                  href="https://www.instagram.com/payal_tailor10.06/"
                  className="hover:text-white transition"
                >
                  Sumit
                </Link>
              </li>
            </ul>
          </div>

        </div>

        <div className="border-t border-slate-800 mt-8 pt-5 text-center text-slate-400 text-sm">
          © 2026 Payal Fabrics. All rights reserved.
        </div>
      </footer>
    </>
  );
};

export default Homepage;