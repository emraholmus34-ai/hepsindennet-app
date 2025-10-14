"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useCart } from "@/components/providers/cart-context";

export function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const qParam = searchParams.get("q") ?? "";

  const [query, setQuery] = useState(qParam);
  useEffect(() => setQuery(qParam), [qParam]);

  const { totalQuantity } = useCart();

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams();
    if (query.trim()) params.set("q", query.trim());
    router.push(`/search?${params.toString()}`);
  }

  const showSearch = useMemo(() => !pathname.startsWith("/cart"), [pathname]);

  return (
    <header className="sticky top-0 z-30 w-full border-b bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        <Link href="/" className="text-2xl font-extrabold text-orange-600">
          hepsinden
        </Link>
        {showSearch && (
          <form onSubmit={onSubmit} className="flex-1 max-w-xl">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ürün, kategori veya marka ara"
              className="w-full rounded-full border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </form>
        )}
        <nav className="flex items-center gap-4">
          <Link href="/cart" className="relative">
            <span className="text-sm">Sepetim</span>
            {totalQuantity > 0 && (
              <span className="absolute -top-2 -right-3 text-xs bg-orange-600 text-white rounded-full px-1.5 py-0.5">
                {totalQuantity}
              </span>
            )}
          </Link>
        </nav>
      </div>
    </header>
  );
}
