

import { RegisterLink, LoginLink } from "@kinde-oss/kinde-auth-nextjs";
import Link from "next/link";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { TypeAnimation } from "react-type-animation";
import TypingText from "@/app/components/TypingText";
import { Geist, Geist_Mono, Alex_Brush, Josefin_Sans } from "next/font/google";
 const alexBrush = Alex_Brush({
    subsets: ["latin"],
    weight: "400",
  });


const Homepage = async () => {

  const { isAuthenticated, getUser } = getKindeServerSession();

  const response = await fetch(
    "http://localhost:3000/api/getallitems?highlight=true",
    {
      cache: "no-store",
    }
  );
  const highlights = await response.json();
  const displayedHighlights = Array.isArray(highlights) ? highlights.slice(0, 6) : [];

  const authenticated = await isAuthenticated();
  const user = await getUser();
  console.log(user)
  return (
    <>

      <div
  className="relative min-h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center"
  style={{
    backgroundImage:
      "url('https://res.cloudinary.com/dvlbebtbw/image/upload/v1779202455/ChatGPT_Image_May_19_2026_08_23_47_PM_f4kdkc.png')",
  }}
>
    
  
  <div className="absolute inset-0 bg-[#1b1024]/25"></div>
  

  <div className="relative z-10 text-center px-6">
    <h1
      className={`${alexBrush.className} text-6xl md:text-7xl font-semibold text-[#24122E] mb-4 tracking-wide mt-22`}
    >
      Payal Fabrics
    </h1>

    <TypingText />

    <div className="mt-10 flex justify-center gap-5 flex-wrap">
      <Link
        href="/products"
        className="bg-[#5B2C6F] text-white px-8 py-3 rounded-full hover:bg-[#472158] transition-all duration-300 font-semibold shadow-lg"
      >
        Explore Collection
      </Link>

      <Link
        href="/contact"
        className="border-2 border-[#3E2A4D] text-[#3E2A4D] px-8 py-3 rounded-full hover:bg-[#3E2A4D] hover:text-white transition-all duration-300 font-semibold"
      >
        Contact Us
      </Link>
    </div>
  </div>
</div>

{/* Highlights Section */}
<section className="min-h-screen bg-gradient-to-b from-pink-50 via-white to-rose-50 py-20 px-6">

  <div className="max-w-7xl mx-auto">

    <h2
      className={`text-center text-5xl md:text-6xl text-pink-700 mb-4 ${alexBrush.className}`}
    >
      Highlights
    </h2>

    <p className="text-center text-gray-500 max-w-2xl mx-auto mb-16">
      Explore our most loved and premium collections crafted with elegance,
      comfort, and timeless beauty.
    </p>

    {displayedHighlights.length === 0 ? (
      <div className="text-center py-20">
        <p className="text-gray-500 text-lg">
          No highlights available at the moment.
        </p>
      </div>
    ) : (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">

        {displayedHighlights.map((highlight: any, index: number) => (
          <div
            key={index}
            className="group relative rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 ease-in-out cursor-pointer bg-white border border-pink-100"
          >

            {/* Image */}
            <div className="relative w-full h-[380px] overflow-hidden">

              <img
                src={highlight.image || "/noimage.jpg"}
                alt={highlight.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out"
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
              <div className="absolute top-4 right-4 bg-white text-pink-600 text-xs font-semibold px-4 py-1.5 rounded-full shadow-md">
                Featured
              </div>

            </div>

            {/* Footer */}
            <div className="px-6 py-5 border-t border-pink-100 bg-white">

              <div className="flex items-center justify-between">

                <div>
                  <h3
                    className={`text-2xl font-semibold text-pink-700 capitalize ${alexBrush.className}`}
                  >
                    {highlight.name}
                  </h3>

                  <p className="text-sm text-gray-500 mt-1">
                    ₹{highlight.price}
                  </p>
                </div>

                <span className="text-xs text-pink-500 bg-pink-50 border border-pink-200 px-4 py-1.5 rounded-full font-medium">
                  Premium
                </span>

              </div>

              <p className="text-gray-500 text-sm mt-4 line-clamp-2">
                {highlight.description}
              </p>

            </div>

          </div>
        ))}

      </div>
    )}

  </div>

</section>

<footer className="bg-[#140C1C] text-[#E7DCEB] py-10 px-6">
  <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10">

    <div>
      <h2 className="text-2xl font-bold mb-4 text-[#C89BFF]">
        Behind Payal Fabrics
      </h2>

      <ul className="space-y-3 text-[#CFC3D7]">
        <li>
          <Link
            href="https://www.instagram.com/payal_tailor10.06/"
            className="hover:text-[#C89BFF] transition"
          >
            Payal Ladies Tailor
          </Link>
        </li>

        <li>
          <Link
            href="https://www.instagram.com/payal_tailor10.06/"
            className="hover:text-[#C89BFF] transition"
          >
            Gulshan Tailor
          </Link>
        </li>

        <li>
          <Link
            href="https://www.instagram.com/payal_tailor10.06/"
            className="hover:text-[#C89BFF] transition"
          >
            Payal Tailor
          </Link>
        </li>
      </ul>
    </div>

    <div>
      <h2 className="text-2xl font-bold mb-4 text-[#C89BFF]">
        Created By
      </h2>

      <ul className="space-y-3 text-[#CFC3D7]">
        <li>
          <Link
            href="https://www.instagram.com/payal_tailor10.06/"
            className="hover:text-[#C89BFF] transition"
          >
            Rajendra
          </Link>
        </li>

        <li>
          <Link
            href="https://www.instagram.com/payal_tailor10.06/"
            className="hover:text-[#C89BFF] transition"
          >
            Sumit
          </Link>
        </li>
      </ul>
    </div>

  </div>

  <div className="border-t border-[#352042] mt-8 pt-5 text-center text-[#B8A9C3] text-sm">
    © 2026 Payal Fabrics. All rights reserved.
  </div>
</footer>
    </>
  );
};

export default Homepage;