"use client";

import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

export type CartProduct = {
  id: string;
  name: string;
  price: number;
  image?: string;
  stock: number;
  category?: string;
  quantity?: number; // optional for product definition, will be managed in cart
};

export type CartItem = CartProduct & { quantity: number; uid: string };

type CartContextValue = {
  items: CartItem[];
  count: number;
  addItem: (product: CartProduct) => void;
  removeItem: (uid: string) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextValue | undefined>(undefined);
const STORAGE_KEY = "payal-fabrics-cart";

function generateUid() {
  if (typeof window === "undefined") return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
  return typeof crypto !== "undefined" && "randomUUID" in crypto
    ? (crypto as Crypto).randomUUID()
    : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

function normalizeCartItems(items: CartItem[]) {
  return items.map((item) => ({ ...item }));
}

function readCartStorage(): CartItem[] {
  if (typeof window === "undefined") return [];

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as CartItem[];
    if (!Array.isArray(parsed)) return [];

    return parsed
      .filter((item) => item && typeof item === "object" && typeof item.id === "string")
      .map((item) => ({
        id: String(item.id),
        name: String(item.name ?? ""),
        price: Number(item.price) || 0,
        image: item.image,
        stock: Number(item.stock) || 0,
        category: item.category,
        quantity: Number(item.quantity) || 0,
        uid: String(item.uid || generateUid()),
      }))
      .filter((item) => item.quantity > 0);
  } catch {
    return [];
  }
}

function writeCartStorage(items: CartItem[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(normalizeCartItems(items)));
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const fetchServerCart = async () => {
      const localCart = readCartStorage();

      try {
        const res = await fetch("/api/cart", { method: "GET", cache: "no-store" });
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data.cart)) {
            const serverCart = data.cart.map((it: unknown) => {
  const item = it as Record<string, unknown>;

  return {
    id: String(item.id),
    name: String(item.name ?? ""),
    price: Number(item.price) || 0,
    image: String(item.image ?? ""),
    stock: Number(item.stock) || 0,
    category: String(item.category ?? ""),
    quantity: Number(item.quantity) || 1,
    uid: generateUid(),
  };
});

            if (serverCart.length > 0) {
              setItems(serverCart);
            } else {
              setItems(localCart);
            }
            return;
          }
        }
      } catch {
        // ignore and fall back
      }

      setItems(localCart);
    };

    fetchServerCart().finally(() => {
      setIsInitialized(true);
    });
  }, []);

  useEffect(() => {
    if (!isInitialized) return;

    const normalizedItems = normalizeCartItems(items);
    writeCartStorage(normalizedItems);

    // Try to persist to server; ignore failures (user not authenticated)
    const persist = async () => {
      try {
        await fetch("/api/cart", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ cart: normalizedItems }),
        });
      } catch {
        // ignore
      }
    };

    persist();
  }, [items, isInitialized]);

  const addItem = (product: CartProduct) => {
    const quantityToAdd = Number(product.quantity) || 1;

    setItems((current) => {
      return [...current, { ...product, quantity: quantityToAdd, uid: generateUid() }];
    });
  };

  const removeItem = (uid: string) => {
    setItems((current) => current.filter((item) => item.uid !== uid));
  };

  const clearCart = () => {
    setItems([]);
  };

  const count = useMemo(() => items.length, [items]);

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