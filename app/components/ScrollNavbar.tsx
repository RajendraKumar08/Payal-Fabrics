"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { RegisterLink, LoginLink } from "@kinde-oss/kinde-auth-nextjs";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import CartBadge from "@/app/components/CartBadge";

type ScrollNavbarProps = {
  authenticated: boolean;
  user: Record<string, any> | null;
  alexBrushClass: string;
  josefinSansClass: string;
  poppinsClass: string;
};

const ScrollNavbar = ({ authenticated, user, alexBrushClass, josefinSansClass, poppinsClass }: ScrollNavbarProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on page change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (typeof window !== "undefined") {
      if (isMenuOpen) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "";
      }
    }
    return () => {
      if (typeof window !== "undefined") {
        document.body.style.overflow = "";
      }
    };
  }, [isMenuOpen]);

  return (
    <nav
      className={`sticky top-0 z-[80] text-white transform-gpu transition duration-500 ease-out ${isScrolled
          ? "bg-black shadow-2xl shadow-black/40"
          : isHome
            ? "bg-black lg:bg-transparent shadow-none"
            : "bg-black shadow-none"
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex flex-col leading-tight shrink-0">
          <span className={`text-2xl md:text-3xl text-white leading-none ${alexBrushClass}`}>Payal Fabric</span>
          <span className={`text-[9px] md:text-[10px] text-white/70 tracking-[0.2em] uppercase ${josefinSansClass}`}>
            Only For Ladies
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <ul className={`hidden lg:flex items-center gap-5 text-sm font-medium ${poppinsClass}`}>
          <li>
            <Link href="/" className="relative text-white/90 hover:text-white transition-colors duration-200 after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-[2px] after:bg-white after:transition-all after:duration-300 hover:after:w-full">
              Home
            </Link>
          </li>

          <li>
            <Link href="/fabric" className="relative text-white/90 hover:text-white transition-colors duration-200 after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-[2px] after:bg-white after:transition-all after:duration-300 hover:after:w-full">
              Fabrics
            </Link>
          </li>
          <li>
            <Link href="/dress%20material" className="relative text-white/90 hover:text-white transition-colors duration-200 after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-[2px] after:bg-white after:transition-all after:duration-300 hover:after:w-full">
              Women&apos;s Wear
            </Link>
          </li>
          <li>
            <Link href="/accessories" className="relative text-white/90 hover:text-white transition-colors duration-200 after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-[2px] after:bg-white after:transition-all after:duration-300 hover:after:w-full">
              Accessories
            </Link>
          </li>
          <li>
            <Link href="/search" className="relative text-white/90 hover:text-white transition-colors duration-200 after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-[2px] after:bg-white after:transition-all after:duration-300 hover:after:w-full flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <span>Search</span>
            </Link>
          </li>
          <li>
            <Link href="/contact" className="relative text-white/90 hover:text-white transition-colors duration-200 after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-[2px] after:bg-white after:transition-all after:duration-300 hover:after:w-full">
              Contact
            </Link>
          </li>
        </ul>

        {/* Desktop Auth & Actions */}
        <ul className={`hidden lg:flex items-center gap-5 text-sm font-medium ${poppinsClass}`}>
          <li>
            <CartBadge />
          </li>

          {!authenticated ? (
            <>
              <li>
                <RegisterLink className="px-4 py-1.5 rounded-full border border-white/30 text-white/90 hover:bg-white/10 transition-colors duration-200 text-sm font-medium">
                  Register
                </RegisterLink>
              </li>
              <li>
                <LoginLink className="px-4 py-1.5 rounded-full bg-white text-black hover:bg-white/90 transition-colors duration-200 text-sm font-medium">
                  Login
                </LoginLink>
              </li>
            </>
          ) : (
            <>
              <li className="text-white/90 font-semibold">
                <Link href="/user">
                  {user?.given_name || user?.email}
                </Link>
              </li>

              <li>
                <LogoutLink className="px-4 py-1.5 rounded-full border border-white/30 text-white/90 hover:bg-white/10 transition-colors duration-200 text-sm font-medium">
                  Logout
                </LogoutLink>
              </li>
            </>
          )}

          <li>
            <a href="https://wa.me/919898976916?text=Hello%20I%20want%20to%20know%20more"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#4ade80] hover:text-[#22c55e] transition-colors font-semibold"
            >
              💬 WhatsApp Karein
            </a>
          </li>
          

        </ul>

        {/* Mobile Controls & Hamburger */}
        <div className="flex lg:hidden items-center gap-4">
          <CartBadge />

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-white hover:text-white/80 focus:outline-none p-1.5 rounded-md hover:bg-white/10 transition-colors relative z-[110]"
            aria-label="Toggle navigation menu"
          >
            {isMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Side Slide Bar Drawer Container */}
      <div className={`fixed inset-0 z-[100] lg:hidden transition-opacity duration-300 ease-in-out ${isMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}>
        {/* Backdrop */}
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-sm"
          onClick={() => setIsMenuOpen(false)}
        />

        {/* Slide-out Drawer Panel */}
        <div className={`fixed top-0 right-0 w-full max-w-[290px] h-fit bg-[#140b10] text-white shadow-2xl flex flex-col z-[101] border-l border-b border-pink-900/20 rounded-bl-3xl transition-transform duration-300 ease-in-out ${isMenuOpen ? "translate-x-0" : "translate-x-full"}`}>
          {/* Header inside drawer */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-pink-950/40 bg-[#0d070b]">
            <Link href="/" className="flex flex-col leading-tight" onClick={() => setIsMenuOpen(false)}>
              <span className={`text-2xl text-white leading-none ${alexBrushClass}`}>Payal Fabric</span>
              <span className={`text-[9px] text-[#e5d5c5] tracking-[0.2em] uppercase font-bold mt-1.5 ${josefinSansClass}`}>
                Only For Ladies
              </span>
            </Link>
          </div>

          {/* Links inside drawer */}
          <div className="px-6 py-6 space-y-6">
            <div>
              <p className="text-[9px] font-bold text-pink-200/50 uppercase tracking-[0.2em] mb-4">Navigation</p>
              <ul className={`flex flex-col gap-1.5 text-sm font-semibold ${poppinsClass}`}>
                <li>
                  <Link href="/" className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-pink-950/20 hover:text-[#4ade80] transition-all">
                    <span className="text-base shrink-0">🏠</span>
                    <span>Home</span>
                  </Link>
                </li>
                <li>
                  <Link href="/fabric" className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-pink-950/20 hover:text-[#4ade80] transition-all">
                    <span className="text-base shrink-0">🧵</span>
                    <span>Fabrics</span>
                  </Link>
                </li>
                <li>
                  <Link href="/dress%20material" className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-pink-950/20 hover:text-[#4ade80] transition-all">
                    <span className="text-base shrink-0">👗</span>
                    <span>Women&apos;s Wear</span>
                  </Link>
                </li>
                <li>
                  <Link href="/accessories" className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-pink-950/20 hover:text-[#4ade80] transition-all">
                    <span className="text-base shrink-0">✨</span>
                    <span>Accessories</span>
                  </Link>
                </li>
                <li>
                  <Link href="/search" className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-pink-950/20 hover:text-[#4ade80] transition-all">
                    <span className="text-base shrink-0">🔍</span>
                    <span>Search Catalog</span>
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-pink-950/20 hover:text-[#4ade80] transition-all">
                    <span className="text-base shrink-0">📞</span>
                    <span>Contact Us</span>
                  </Link>
                </li>
              </ul>
            </div>

            <div className="border-t border-pink-950/30 pt-6">
              <p className="text-[9px] font-bold text-pink-200/50 uppercase tracking-[0.2em] mb-4">Customer Care</p>
              <a href="https://wa.me/919898976916?text=Hello%20I%20want%20to%20know%20more"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-[#1f2d22] border border-[#22c55e]/20 text-[#4ade80] hover:bg-[#2e4232] transition-all font-semibold text-sm"
              >
                <span>💬 WhatsApp Support</span>
              </a>
            </div>
          </div>

          {/* Auth Drawer Footer */}
          <div className="px-6 py-6 border-t border-pink-950/40 bg-[#0d070b] flex flex-col gap-4">
            {!authenticated ? (
              <div className="grid grid-cols-2 gap-3">
                <RegisterLink className="w-full text-center px-4 py-2 rounded-full border border-pink-900/30 text-[#e5d5c5] hover:bg-[#25131e] transition-colors text-xs font-bold">
                  Register
                </RegisterLink>
                <LoginLink className="w-full text-center px-4 py-2 rounded-full bg-white text-black hover:bg-[#e5d5c5] transition-colors text-xs font-bold shadow-md shadow-pink-950/20">
                  Login
                </LoginLink>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                <div className="text-pink-200/50 text-[9px] font-bold uppercase tracking-[0.15em]">
                  Signed In Account
                  <span className="text-[#e5d5c5] font-semibold normal-case block mt-0.5 text-xs truncate">{user?.given_name || user?.email}</span>
                </div>
                <div className="grid grid-cols-2 gap-2.5">
                  <Link href="/user" className="w-full text-center px-3 py-2 rounded-full bg-[#25131e] text-white hover:bg-[#3d1f31] transition-colors text-xs font-bold border border-pink-900/20">
                    Profile
                  </Link>
                  <LogoutLink className="w-full text-center px-3 py-2 rounded-full border border-pink-900/30 text-[#e5d5c5] hover:bg-[#25131e] transition-colors text-xs font-bold">
                    Logout
                  </LogoutLink>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default ScrollNavbar;
