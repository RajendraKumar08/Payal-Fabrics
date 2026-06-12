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

function dedupeCartItems(items: CartItem[]) {
  const merged: CartItem[] = [];

  for (const item of items) {
    // For fabric items we want to keep separate entries (allow multiple meter selections)
    if (item.category && String(item.category).toLowerCase() === "fabric") {
      merged.push({ ...item });
      continue;
    }

    const existing = merged.find((m) => m.id === item.id && !(m.category && String(m.category).toLowerCase() === "fabric"));
    if (existing) {
      existing.quantity = existing.quantity + item.quantity;
    } else {
      merged.push({ ...item });
    }
  }

  return merged;
}

function readCartStorage(): CartItem[] {
  if (typeof window === "undefined") return [];

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as CartItem[];
    if (!Array.isArray(parsed)) return [];

    const items = parsed
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

    return dedupeCartItems(items);
  } catch {
    return [];
  }
}

function writeCartStorage(items: CartItem[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(dedupeCartItems(items)));
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
            const serverCart = dedupeCartItems(
              data.cart.map((it: unknown) => {
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
              })
            );

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

    const normalizedItems = dedupeCartItems(items);
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
      // If product is fabric, always add a new entry so different meter selections remain separate
      if (product.category && String(product.category).toLowerCase() === "fabric") {
        return [...current, { ...product, quantity: quantityToAdd, uid: generateUid() }];
      }

      const existingIndex = current.findIndex((item) => item.id === product.id);
      if (existingIndex !== -1) {
        const updated = [...current];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + quantityToAdd,
        };
        return updated;
      }

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

