"use client";

import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

export type CartProduct = {
  id: string;
  name: string;
  price: number;
  image?: string;
};

export type CartItem = CartProduct & {
  quantity: number;
};

type CartContextValue = {
  items: CartItem[];
  count: number;
  addItem: (product: CartProduct) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextValue | undefined>(undefined);
const STORAGE_KEY = "payal-fabrics-cart";

function readCartStorage(): CartItem[] {
  if (typeof window === "undefined") return [];

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as CartItem[];
    if (!Array.isArray(parsed)) return [];
    return parsed.map((item) => ({
      id: item.id,
      name: item.name,
      price: Number(item.price) || 0,
      image: item.image,
      quantity: Number(item.quantity) || 1,
    }));
  } catch {
    return [];
  }
}

function writeCartStorage(items: CartItem[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    // Try server-side cart first; if unauthorized or error, fall back to localStorage
    const fetchServerCart = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/cart", { method : 'GET', cache: "no-store" });
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data.cart)) {
            setItems(
              data.cart.map((it: any) => ({
                id: String(it.id),
                name: it.name,
                price: Number(it.price) || 0,
                image: it.image || "",
                quantity: Number(it.quantity) || 1,
              }))
            );
            return;
          }
        }
      } catch (e) {
        // ignore and fall back
      }

      setItems(readCartStorage());
    };

    fetchServerCart();
  }, []);

  useEffect(() => {
    writeCartStorage(items);

    // Try to persist to server; ignore failures (user not authenticated)
    const persist = async () => {
      try {
        await fetch("http://localhost:3000/api/cart", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ cart: items }),
        });
      } catch (e) {
        // ignore
      }
    };

    persist();
  }, [items]);

  const addItem = (product: CartProduct) => {
    setItems((current) => {
      const existing = current.find((item) => item.id === product.id);
      if (existing) {
        return current.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...current, { ...product, quantity: 1 }];
    });
  };

  const removeItem = (id: string) => {
    setItems((current) => current.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setItems([]);
  };

  const count = useMemo(
    () => items.reduce((total, item) => total + item.quantity, 0),
    [items]
  );

  return (
    <CartContext.Provider value={{ items, count, addItem, removeItem, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}

