"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/components/providers/cart-context";
import { Price } from "@/components/price";

export default function CartPage() {
  const { enriched, totalAmount, totalQuantity, remove, update, clear } = useCart();

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold">Sepetim</h1>

      {enriched.length === 0 ? (
        <div className="rounded-lg border bg-white p-6 text-center">
          <p className="text-gray-600 mb-4">Sepetiniz boş.</p>
          <Link href="/" className="text-orange-600 hover:underline">
            Alışverişe başla
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            {enriched.map((item) => (
              <div key={item.productId} className="flex gap-4 rounded-lg border bg-white p-3">
                <div className="relative w-24 h-24 shrink-0 bg-gray-50 rounded">
                  <Image src={item.product.image} alt={item.product.name} fill className="object-contain" />
                </div>
                <div className="flex-1">
                  <div className="font-medium line-clamp-2">{item.product.name}</div>
                  <div className="text-sm text-gray-500">{item.product.brand}</div>
                  <div className="mt-2">
                    <Price value={item.product.price} original={item.product.originalPrice} />
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <select
                    value={item.quantity}
                    onChange={(e) => update(item.productId, parseInt(e.target.value, 10))}
                    className="border rounded px-2 py-1"
                  >
                    {Array.from({ length: 10 }).map((_, idx) => (
                      <option key={idx + 1} value={idx + 1}>
                        {idx + 1}
                      </option>
                    ))}
                  </select>
                  <button onClick={() => remove(item.productId)} className="text-sm text-red-600 hover:underline">
                    Kaldır
                  </button>
                  <div className="text-sm text-gray-500">
                    Ara toplam: {item.lineTotal.toLocaleString("tr-TR", { style: "currency", currency: "TRY" })}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <aside className="rounded-lg border bg-white p-4 h-fit">
            <div className="flex items-center justify-between mb-2">
              <span>Ürün sayısı</span>
              <span>{totalQuantity}</span>
            </div>
            <div className="flex items-center justify-between text-lg font-semibold">
              <span>Toplam</span>
              <span>{totalAmount.toLocaleString("tr-TR", { style: "currency", currency: "TRY" })}</span>
            </div>
            <button className="w-full mt-4 rounded-md bg-orange-600 text-white px-4 py-2 text-sm font-medium hover:bg-orange-700">
              Alışverişi Tamamla
            </button>
            <button onClick={clear} className="w-full mt-2 rounded-md border px-4 py-2 text-sm">
              Sepeti Temizle
            </button>
          </aside>
        </div>
      )}
    </div>
  );
}
