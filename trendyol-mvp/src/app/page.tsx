import { listFeaturedProducts } from "@/data/products";
import { ProductCard } from "@/components/product/ProductCard";

export default function Home() {
  const featured = listFeaturedProducts(16);
  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold">Öne Çıkanlar</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {featured.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}
