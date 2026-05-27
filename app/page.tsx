
import { RegisterLink, LoginLink } from "@kinde-oss/kinde-auth-nextjs";

import Link from "next/link";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import TypingText from "@/app/components/TypingText";
import AddToCartButton from "@/app/components/AddToCartButton";
import { Alex_Brush } from "next/font/google";
import { prisma } from "@/prisma-db";
const alexBrush = Alex_Brush({
  subsets: ["latin"],
  weight: "400",
});


const Homepage = async () => {

  const { isAuthenticated, getUser } = getKindeServerSession();
  // console.log("ENV db url", process.env.DATABASE_URL)

  const highlights = await prisma.product.findMany({
    where: {
      highlight: true,
    },
    take: 6,
  });
  const displayedHighlights = Array.isArray(highlights) ? highlights.slice(0, 6) : [];

  const authenticated = Boolean(await isAuthenticated());
  const user = await getUser();
  // console.log(user)
  return (
    <>

      <div
        className="relative min-h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center"
        style={{
          backgroundImage:
            "url('https://res.cloudinary.com/dvlbebtbw/image/upload/v1779202455/ChatGPT_Image_May_19_2026_08_23_47_PM_f4kdkc.png')",
        }}
      >
        <div className="absolute inset-0 bg-slate-950/60"></div>

        <div className="relative z-10 text-center px-6">
          <h1
            className={`${alexBrush.className} text-6xl md:text-7xl font-semibold text-slate-100 mb-4 tracking-wide mt-22`}
          >
            Payal Fabrics
          </h1>

          <TypingText />

          <div className="mt-10 flex justify-center gap-5 flex-wrap">
            <Link
              href="/products"
              className="bg-purple-700 text-white px-8 py-3 rounded-full hover:bg-purple-600 transition-all duration-300 font-semibold shadow-lg shadow-slate-900/30"
            >
              Explore Collection
            </Link>

            <Link
              href="/contact"
              className="border-2 border-slate-300 text-slate-100 px-8 py-3 rounded-full hover:bg-slate-100 hover:text-slate-950 transition-all duration-300 font-semibold"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>

      {/* Highlights Section */}
      <section className="min-h-screen bg-slate-50 py-20 px-6">

        <div className="max-w-7xl mx-auto">

          <h2
            className={`text-center text-5xl md:text-6xl text-slate-900 mb-4 ${alexBrush.className}`}
          >
            Highlights
          </h2>

          <p className="text-center text-slate-600 max-w-2xl mx-auto mb-16">
            Explore our most loved and premium collections crafted with elegance,
            comfort, and timeless beauty.
          </p>

          {displayedHighlights.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-slate-600 text-lg">
                No highlights available at the moment.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">

              {displayedHighlights.map((highlight: any, index: number) => (
                <div
                  key={index}
                  className="group relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 ease-in-out cursor-pointer bg-white border border-slate-200"
                >

                  {/* Image */}
                  <div className="relative w-full h-[380px] overflow-hidden">

                    <img
                      src={highlight.image || "/noimage.jpg"}
                      alt={highlight.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out"
                    />

                    {/* Overlay */}
                    <Link href={`/product/${highlight.id}`}>
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end justify-center pb-8">

                        <div className="text-center">
                          <span className="text-white text-sm font-semibold tracking-[3px] uppercase border border-white/70 px-5 py-2 rounded-full backdrop-blur-md hover:bg-white/10 transition-colors cursor-pointer">
                            Explore →
                          </span>
                        </div>

                      </div>
                    </Link>

                    {/* Featured Badge */}
                    <div className="absolute top-4 right-4 bg-purple-100 text-purple-900 text-xs font-semibold px-4 py-1.5 rounded-full shadow-sm">
                      Featured
                    </div>

                  </div>

                  {/* Footer */}
                  <div className="px-6 py-5 border-t border-slate-200 bg-white">

                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                      <div>
                        <h3
                          className={`text-2xl font-semibold text-slate-900 capitalize ${alexBrush.className}`}
                        >
                          {highlight.name}
                        </h3>

                        <p className="text-sm text-slate-500 mt-1">
                          ₹{highlight.price}
                        </p>
                      </div>

                      <div className="flex flex-wrap items-center gap-3">
                        <span className="text-xs text-purple-900 bg-purple-100 border border-purple-200 px-4 py-1.5 rounded-full font-medium">
                          Premium
                        </span>
                        <AddToCartButton
                          product={{
                            id: highlight.id?.toString() || highlight.name,
                            name: highlight.name,
                            price: Number(highlight.price) || 0,
                            image: highlight.image || "",
                          }}
                          authenticated={authenticated}
                        />
                      </div>

                    </div>

                    <p className="text-slate-500 text-sm mt-4 line-clamp-2">
                      {highlight.description}
                    </p>

                  </div>

                </div>
              ))}

            </div>
          )}

        </div>

      </section>

      <footer className="bg-slate-950 text-slate-100 py-10 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10">

          <div>
            <h2 className="text-2xl font-bold mb-4 text-purple-200">
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
            <h2 className="text-2xl font-bold mb-4 text-purple-200">
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