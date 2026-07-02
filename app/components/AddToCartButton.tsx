"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useCart, CartProduct } from "@/app/components/CartContext";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";

type AddToCartButtonProps = {
  product: CartProduct;
  authenticated?: boolean;
};

export default function AddToCartButton({ product, authenticated}: AddToCartButtonProps) {
  const router = useRouter();
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);
  const { isAuthenticated } = useKindeBrowserClient();

  const quantity = product.quantity;
  const [cartQuantity, setcartQuantity] = useState(0);
  const fetchQuantity = async () => {
            const res = await fetch(`/api/cartQuantity?productId=${product.id}`);
            const text = await res.text();

            console.log("Status:", res.status);
            console.log("Response:", text);

            if (!res.ok) return;

            const data = JSON.parse(text);
            setcartQuantity(data.quantity);
        };
  fetchQuantity()
  
  if(!quantity){
    return <button disabled className="inline-flex items-center justify-center rounded-full bg-[#4d243d] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#4d243d]/50 disabled:cursor-not-allowed disabled:bg-slate-400">Out of Limit</button>;
  }

  if(cartQuantity + quantity > product.stock){
    return <button disabled className="inline-flex items-center justify-center rounded-full bg-[#4d243d] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#4d243d]/50 disabled:cursor-not-allowed disabled:bg-slate-400">Out of Limit</button>;
  }

  const handleClick = () => {
    const isAuth = authenticated ?? Boolean(isAuthenticated);
    if (!isAuth) {
      router.push("/login");
      return;
    }
    
    addItem(product);
    setAdded(true);
    window.setTimeout(() => {
      fetchQuantity();
      setAdded(false);
    }, 1500);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={product.stock <= 0}
      className="inline-flex items-center justify-center rounded-full bg-[#4d243d] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#4d243d]/50 disabled:cursor-not-allowed disabled:bg-slate-400"
    >
      {product.stock <= 0 ? "Out of Stock" : added ? "Added" : "Add to Cart"}
    </button>
  );
}
