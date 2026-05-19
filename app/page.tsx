

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