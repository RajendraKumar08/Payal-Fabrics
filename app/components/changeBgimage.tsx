"use client";

import { Playfair_Display } from "next/font/google";
import Link from "next/link";
import TypingText from "@/app/components/TypingText";

const playfair = Playfair_Display({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
    style: ["normal", "italic"],
});

export default function ChangeBgImage() {
    const features = [
        {
            title: "Pure Cotton",
            desc: "Breathable & Soft",
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3a3 3 0 00-3 3v1a3 3 0 00-3 3h-1a3 3 0 00-3 3v1a3 3 0 003 3h1a3 3 0 003 3v1a3 3 0 003 3h1a3 3 0 003-3v-1a3 3 0 003-3h1a3 3 0 003-3v-1a3 3 0 00-3-3h-1a3 3 0 00-3-3V6a3 3 0 00-3-3h-1z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 12m-2 0a2 2 0 104 0 2 2 0 10-4 0" />
                </svg>
            )
        },
        {
            title: "Hand Block Printed",
            desc: "Crafted by Artisans",
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
            )
        },
        {
            title: "Natural Dyes",
            desc: "Skin Friendly",
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3C12 3 6 8.5 6 13a6 6 0 1012 0c0-4.5-6-9-6-9z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 18a2.5 2.5 0 002.5-2.5c0-1.5-2.5-4-2.5-4s-2.5 2.5-2.5 4A2.5 2.5 0 0012 18z" />
                </svg>
            )
        },
        {
            title: "Timeless Elegance",
            desc: "For Every You",
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
            )
        }
    ];

    return (
        <div className="relative w-full h-screen flex items-center justify-start overflow-hidden bg-[#e5d5c5] -mt-[76px] pt-[76px]">
            {/* Background image covering the layout */}
            <div
                className="absolute inset-0 bg-cover bg-no-repeat bg-[center_right_20%] md:bg-[center_right_10%] lg:bg-center transition-all duration-700"
                style={{
                    backgroundImage: "url('/hero-section-image.png')",
                }}
            />

            {/* Soft organic beige gradient overlay to ensure text readability on all viewports */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#e5d5c5]/90 via-[#e5d5c5]/40 to-transparent" />

            {/* Content Container */}
            <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-20 w-full flex flex-col justify-between py-10 md:py-16 h-full">
                {/* Top spacer to push elements down past standard transparent navbar */}
                <div className="h-4 md:h-8" />

                {/* Left Side Content Area */}
                <div className="flex flex-col gap-5 max-w-xl text-left">
                    {/* Top Tag: Timeless by Tradition */}
                    <div className="flex items-center gap-2 text-[#7d5069] tracking-[0.2em] font-semibold text-xs uppercase">
                        {/* Flower Mandala Icon */}
                        <svg className="w-4 h-4 text-[#7d5069] shrink-0" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v18M3 12h18M5.5 5.5l13 13m-13 0l13-13M12 9a3 3 0 100 6 3 3 0 000-6z" />
                        </svg>
                        <span>Timeless by Tradition</span>
                    </div>

                    {/* Headline: Crafted with Heritage, Woven with Love */}
                    <h1 className={`${playfair.className} text-4xl md:text-5xl lg:text-6xl font-bold text-[#3c1e2e] leading-[1.15] tracking-tight`}>
                        Crafted with <span className="font-normal italic">Heritage</span>,<br />
                        Woven with <span className="font-normal italic text-[#5a2e48]">Love</span>
                    </h1>

                    {/* Subtitle with dynamic typing animation */}
                    <div className="min-h-[48px] md:min-h-[56px] flex items-center">
                        <TypingText />
                    </div>

                    {/* Action Buttons */}
                    <div className="mt-2 flex gap-4 items-center flex-wrap">
                        <Link
                            href="/fabric"
                            className="bg-[#4d243d] hover:bg-[#5e2e4b] text-white px-7 py-3 rounded-full transition-all duration-300 font-semibold shadow-lg shadow-pink-900/10 flex items-center gap-2 text-xs md:text-sm active:scale-[0.98]"
                        >
                            Explore Collection <span className="text-sm md:text-base">→</span>
                        </Link>
                        <Link
                            href="/contact"
                            className="border-2 border-[#4d243d] text-[#4d243d] hover:bg-[#4d243d]/5 px-7 py-2.5 rounded-full transition-all duration-300 font-semibold text-xs md:text-sm active:scale-[0.98]"
                        >
                            Contact Us
                        </Link>
                    </div>
                </div>

                {/* Bottom Features Section */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 border-t border-[#4d243d]/10 pt-8 mt-12 md:mt-0">
                    {features.map((feat, index) => (
                        <div key={index} className="flex items-start gap-3">
                            <div className="p-2 rounded-xl bg-[#4d243d]/5 text-[#4d243d] shrink-0">
                                {feat.icon}
                            </div>
                            <div>
                                <h3 className="text-xs font-bold uppercase tracking-wider text-[#4d243d]">
                                    {feat.title}
                                </h3>
                                <p className="text-[10px] text-slate-600 font-semibold mt-0.5 leading-snug">
                                    {feat.desc}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}