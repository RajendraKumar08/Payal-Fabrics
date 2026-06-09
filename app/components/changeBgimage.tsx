"use client";

import { useEffect, useState } from "react";
import { Alex_Brush } from "next/font/google";
import Link from "next/link";
import  TypingText  from "@/app/components/TypingText";

const alexBrush = Alex_Brush({
  subsets: ["latin"],
  weight: "400",
});

export default function ChangeBgImage() {
    const images = ["https://res.cloudinary.com/dboijxh5b/image/upload/v1780837961/3_tlpmme.jpg",
    "https://res.cloudinary.com/dboijxh5b/image/upload/v1780837959/1_iqgbfr.webp",
    "https://res.cloudinary.com/dboijxh5b/image/upload/v1780837958/2_ikhl8t.jpg",
    "https://res.cloudinary.com/dvlbebtbw/image/upload/v1779202455/ChatGPT_Image_May_19_2026_08_23_47_PM_f4kdkc.png"
    ];

    const [currentImage, setCurrentImage] = useState(0);
    useEffect(() => {
        const interval = setInterval(() => {
        setCurrentImage((prev) => (prev + 1) % images.length);
        }, 3000); // change every 3 seconds

        return () => clearInterval(interval);
    }, []);

    return <>
      <div>
        {images.map((img, index) => (
            <div
            key={index}
            className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out ${
                index === currentImage ? "opacity-100" : "opacity-0"
            }`}
            style={{
                backgroundImage: `url(${img})`,
            }}
            />
        ))}
        <div className="absolute inset-0 bg-slate-950/60"></div>
        

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
}