"use client";

import Link from "next/link";
import { useCart } from "@/app/components/CartContext";

export default function CartBadge() {
  const { count } = useCart();

  return (
    <Link
      href="/cart"
      className="inline-flex items-center gap-2 rounded-full border border-purple-500 bg-slate-900/90 px-4 py-1.5 text-xs font-semibold text-slate-100 transition hover:bg-purple-600 hover:text-white"
    >
      <span>Cart</span>
      <span className="inline-flex h-6 min-w-[1.5rem] items-center justify-center rounded-full bg-purple-600 px-2 text-sm text-white">
        {count}
      </span>
    </Link>
  );
}
