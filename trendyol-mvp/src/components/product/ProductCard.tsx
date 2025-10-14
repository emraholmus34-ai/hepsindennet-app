import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types/catalog";
import { Price } from "@/components/price";

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/product/${product.slug}`} className="block group rounded-lg border border-gray-200 hover:shadow-sm transition-shadow p-3 bg-white">
      <div className="relative w-full aspect-[4/5] overflow-hidden rounded-md bg-gray-50">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-contain group-hover:scale-[1.02] transition-transform"
          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
        />
      </div>
      <div className="mt-3 space-y-1">
        <div className="text-xs text-gray-500">{product.brand}</div>
        <div className="text-sm font-medium line-clamp-2 min-h-[2.5rem]">{product.name}</div>
        <div className="text-xs text-gray-500">{product.sellerName}</div>
        <div className="flex items-center gap-1 text-xs text-yellow-600">
          <span>★ {product.rating.toFixed(1)}</span>
          <span className="text-gray-400">({product.ratingCount.toLocaleString("tr-TR")})</span>
        </div>
        <Price value={product.price} original={product.originalPrice} />
      </div>
    </Link>
  );
}
