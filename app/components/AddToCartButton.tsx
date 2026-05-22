"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useCart, CartProduct } from "@/app/components/CartContext";

type AddToCartButtonProps = {
  product: CartProduct;
  authenticated: boolean;
};

export default function AddToCartButton({ product, authenticated }: AddToCartButtonProps) {
  const router = useRouter();
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  const handleClick = () => {
    if (!authenticated) {
      router.push("/login");
      return;
    }

    addItem(product);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1500);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className="inline-flex items-center justify-center rounded-full bg-purple-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-purple-500 disabled:cursor-not-allowed disabled:bg-slate-400"
    >
      {added ? "Added" : "Add to cart"}
    </button>
  );
}
