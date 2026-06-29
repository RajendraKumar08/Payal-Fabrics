"use client";

import { Alex_Brush } from "next/font/google";
import Link from "next/link";
import TypingText from "@/app/components/TypingText";

const alexBrush = Alex_Brush({
  subsets: ["latin"],
  weight: "400",
});

export default function ChangeBgImage() {
  return (
    <>
      <div className="relative h-[70vh]">
        {/* Fixed Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-top"
          style={{
            backgroundImage:
              "url(https://res.cloudinary.com/dvlbebtbw/image/upload/v1782669026/ChatGPT_Image_Jun_27_2026_03_40_24_PM_fpsr0o.png)",
          }}
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-slate-950/30"></div>

        {/* Content */}
        <div className="relative z-10 text-center px-6 pt-34">
          <h1
            className={`${alexBrush.className} text-6xl md:text-7xl font-semibold text-white mb-4 tracking-wide mt-22`}
          >
            Payal Fabrics
          </h1>

          <TypingText />

          <div className="mt-10 flex justify-center gap-5 flex-wrap">
            <Link
              href="/products"
              className="bg-black text-white px-8 py-3 rounded-full hover:bg-white hover:text-black transition-all duration-300 font-semibold shadow-lg shadow-slate-900/30"
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
    </>
  );
}