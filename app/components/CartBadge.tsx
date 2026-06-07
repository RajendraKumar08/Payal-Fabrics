"use client";

import Link from "next/link";
import { useCart } from "@/app/components/CartContext";

export default function CartBadge() {
  const { count } = useCart();

  return (
    <Link
      href="/cart"
      className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/5 px-4 py-1.5 text-xs font-semibold text-white transition hover:bg-white/15 hover:text-white"
    >
      <span>Cart</span>
      <span className="inline-flex h-6 min-w-[1.5rem] items-center justify-center rounded-full bg-white px-2 text-sm font-semibold text-black">
        {count}
      </span>
    </Link>
  );
}
