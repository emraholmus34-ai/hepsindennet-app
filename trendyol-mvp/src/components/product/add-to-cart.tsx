"use client";

import { useCart } from "@/components/providers/cart-context";

export function AddToCartButton({ productId }: { productId: string }) {
  const { add } = useCart();
  return (
    <button
      onClick={() => add(productId, 1)}
      className="inline-flex items-center justify-center rounded-md bg-orange-600 text-white px-4 py-2 text-sm font-medium hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
    >
      Sepete Ekle
    </button>
  );
}
