"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
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

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`sticky top-0 z-[80] transform-gpu transition duration-800 ease-out ${isScrolled
          ? "bg-black/95 text-white shadow-2xl shadow-black/40"
          : "bg-black text-white shadow-none"
        }`}
    >
      <div className="max-w-7xl mx-auto  py-4  flex flex-wrap items-center justify-between ">
        <Link href="/" className="flex flex-col leading-tight">
          <span className={`text-3xl text-white leading-none ${alexBrushClass}`}>Payal Fabric</span>
          <span className={`text-[10px] text-white/70 tracking-[0.2em] uppercase ${josefinSansClass}`}>
            Only For Ladies
          </span>
        </Link>

        <ul className={`flex flex-wrap items-center gap-5 text-sm font-medium ${poppinsClass}`}>
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
            <Link href="/contact" className="relative text-white/90 hover:text-white transition-colors duration-200 after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-[2px] after:bg-white after:transition-all after:duration-300 hover:after:w-full">
              Contact
            </Link>
          </li>
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
        </ul>
        <ul className={`flex flex-wrap items-center gap-5 text-sm font-medium ${poppinsClass}`}>
          <li>
            <a href="https://wa.me/919898976916?text=Hello%20I%20want%20to%20know%20more"
              target="_blank"
              rel="noopener noreferrer">
                💬 WhatsApp Karein
              </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default ScrollNavbar;
