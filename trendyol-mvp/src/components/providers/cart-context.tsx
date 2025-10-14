"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { CartItem, EnrichedCartItem } from "@/types/catalog";
import { getProductById } from "@/data/products";

interface CartState {
  items: CartItem[];
  totalQuantity: number;
  totalAmount: number;
  add: (productId: string, quantity?: number) => void;
  remove: (productId: string) => void;
  update: (productId: string, quantity: number) => void;
  clear: () => void;
  enriched: EnrichedCartItem[];
}

const CartContext = createContext<CartState | null>(null);

const STORAGE_KEY = "hepsinden_cart_v1";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed: CartItem[] = JSON.parse(raw);
        setItems(parsed.filter((i) => Number.isFinite(i.quantity) && i.quantity > 0));
      }
    } catch {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {}
  }, [items]);

  function add(productId: string, quantity = 1) {
    setItems((prev) => {
      const next = [...prev];
      const idx = next.findIndex((i) => i.productId === productId);
      if (idx >= 0) next[idx] = { ...next[idx], quantity: next[idx].quantity + quantity };
      else next.push({ productId, quantity });
      return next;
    });
  }

  function remove(productId: string) {
    setItems((prev) => prev.filter((i) => i.productId !== productId));
  }

  function update(productId: string, quantity: number) {
    setItems((prev) => prev.map((i) => (i.productId === productId ? { ...i, quantity } : i)));
  }

  function clear() {
    setItems([]);
  }

  const enriched: EnrichedCartItem[] = useMemo(() => {
    return items
      .map((i) => {
        const product = getProductById(i.productId);
        if (!product) return undefined;
        return {
          ...i,
          product,
          lineTotal: product.price * i.quantity,
        } satisfies EnrichedCartItem;
      })
      .filter(Boolean) as EnrichedCartItem[];
  }, [items]);

  const totalQuantity = useMemo(() => items.reduce((sum, i) => sum + i.quantity, 0), [items]);
  const totalAmount = useMemo(() => enriched.reduce((sum, i) => sum + i.lineTotal, 0), [enriched]);

  const value: CartState = {
    items,
    enriched,
    totalQuantity,
    totalAmount,
    add,
    remove,
    update,
    clear,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
