import Image from "next/image";
import { notFound } from "next/navigation";
import { getProductBySlug } from "@/data/products";
import { Price } from "@/components/price";
import { AddToCartButton } from "@/components/product/add-to-cart";

export default function ProductDetail({ params }: { params: { slug: string } }) {
  const product = getProductBySlug(params.slug);
  if (!product) return notFound();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="relative w-full aspect-[4/5] bg-white rounded-lg border">
        <Image src={product.image} alt={product.name} fill className="object-contain" />
      </div>
      <div className="space-y-4">
        <div className="text-sm text-gray-500">{product.brand}</div>
        <h1 className="text-2xl font-semibold">{product.name}</h1>
        <div className="text-sm text-gray-500">Satıcı: {product.sellerName}</div>
        <div className="flex items-center gap-2 text-sm">
          <span className="text-yellow-600">★ {product.rating.toFixed(1)}</span>
          <span className="text-gray-400">({product.ratingCount.toLocaleString("tr-TR")})</span>
        </div>
        <Price value={product.price} original={product.originalPrice} />
        <div className="pt-2">
          <AddToCartButton productId={product.id} />
        </div>
      </div>
    </div>
  );
}
