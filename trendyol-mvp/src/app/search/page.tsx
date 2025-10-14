import { Suspense } from "react";
import { searchProducts } from "@/data/products";
import { ProductCard } from "@/components/product/ProductCard";

export default function SearchPage({ searchParams }: { searchParams: { q?: string } }) {
  const q = (searchParams.q ?? "").trim();
  const results = q ? searchProducts(q) : [];
  return (
    <Suspense>
      <div className="space-y-4">
        <h1 className="text-xl font-semibold">Arama</h1>
        {q ? (
          <p className="text-sm text-gray-600">“{q}” için {results.length} sonuç bulundu</p>
        ) : (
          <p className="text-sm text-gray-600">Aramak için üstteki kutuyu kullanın.</p>
        )}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {results.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </Suspense>
  );
}
