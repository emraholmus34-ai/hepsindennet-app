import { Product } from "@/types/catalog";

export const products: Product[] = [
  {
    id: "p1",
    slug: "kadın-basic-tshirt-beyaz",
    name: "Basic T-Shirt",
    brand: "ModaX",
    price: 199.9,
    originalPrice: 249.9,
    image: "/products/p1.svg",
    rating: 4.5,
    ratingCount: 1243,
    sellerName: "ModaX Store",
    category: "Kadın Giyim",
    tags: ["tshirt", "beyaz", "basic"],
    stock: 120,
  },
  {
    id: "p2",
    slug: "erkek-slim-fit-jean-lacivert",
    name: "Slim Fit Jean",
    brand: "DenimPro",
    price: 549.0,
    originalPrice: 699.0,
    image: "/products/p2.svg",
    rating: 4.2,
    ratingCount: 864,
    sellerName: "DenimPro",
    category: "Erkek Giyim",
    tags: ["jean", "kot", "lacivert"],
    stock: 80,
  },
  {
    id: "p3",
    slug: "bluetooth-kulaklik-aktif-gurultu-onleme",
    name: "Bluetooth Kulaklık",
    brand: "Soundy",
    price: 1799.0,
    originalPrice: 2199.0,
    image: "/products/p3.svg",
    rating: 4.7,
    ratingCount: 2894,
    sellerName: "TechMall",
    category: "Elektronik",
    tags: ["kulaklık", "bluetooth", "anc"],
    stock: 52,
  },
  {
    id: "p4",
    slug: "air-fryer-4-5l-dijital",
    name: "Air Fryer 4.5L",
    brand: "Cooko",
    price: 2399.0,
    originalPrice: 2999.0,
    image: "/products/p4.svg",
    rating: 4.6,
    ratingCount: 1520,
    sellerName: "KitchenPro",
    category: "Ev & Yaşam",
    tags: ["airfryer", "mutfak"],
    stock: 35,
  },
  {
    id: "p5",
    slug: "akilli-saat-spo2-takipli",
    name: "Akıllı Saat",
    brand: "FitPulse",
    price: 1599.0,
    originalPrice: 1899.0,
    image: "/products/p5.svg",
    rating: 4.3,
    ratingCount: 987,
    sellerName: "TechMall",
    category: "Elektronik",
    tags: ["akıllı saat", "spor"],
    stock: 60,
  },
  {
    id: "p6",
    slug: "yuz-nemlendirici-hyaluronik-asitli",
    name: "Yüz Nemlendirici",
    brand: "DermaLab",
    price: 249.9,
    image: "/products/p6.svg",
    rating: 4.4,
    ratingCount: 432,
    sellerName: "DermaLab Official",
    category: "Kozmetik",
    tags: ["cilt bakımı", "nemlendirici"],
    stock: 200,
  },
  {
    id: "p7",
    slug: "akilli-telefon-128gb-siyah",
    name: "Akıllı Telefon 128GB",
    brand: "PhoneX",
    price: 12999.0,
    originalPrice: 14999.0,
    image: "/products/p7.svg",
    rating: 4.8,
    ratingCount: 6421,
    sellerName: "PhoneX Türkiye",
    category: "Elektronik",
    tags: ["telefon", "128gb", "siyah"],
    stock: 25,
  },
  {
    id: "p8",
    slug: "spor-ayakkabi-kadin",
    name: "Spor Ayakkabı",
    brand: "RunFit",
    price: 799.0,
    originalPrice: 999.0,
    image: "/products/p8.svg",
    rating: 4.1,
    ratingCount: 763,
    sellerName: "RunFit Store",
    category: "Ayakkabı",
    tags: ["spor", "ayakkabı", "koşu"],
    stock: 95,
  },
];

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function searchProducts(query: string): Product[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return products.filter((p) =>
    [p.name, p.brand, p.category, p.sellerName, ...p.tags]
      .join(" ")
      .toLowerCase()
      .includes(q)
  );
}

export function listFeaturedProducts(limit = 12): Product[] {
  const sorted = [...products].sort((a, b) => b.rating - a.rating);
  return sorted.slice(0, limit);
}
