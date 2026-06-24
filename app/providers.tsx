"use client";

import { KindeProvider } from "@kinde-oss/kinde-auth-nextjs";
import { CartProvider } from "@/app/components/CartContext";
import React from "react";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <KindeProvider>
      <CartProvider>
        {children}
      </CartProvider>
    </KindeProvider>
  );
}
