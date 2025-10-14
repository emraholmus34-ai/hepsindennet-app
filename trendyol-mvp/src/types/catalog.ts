export interface Product {
  id: string;
  slug: string;
  name: string;
  brand: string;
  price: number; // current price in TRY
  originalPrice?: number; // crossed-out price if discounted
  image: string; // path under public/
  rating: number; // 0-5
  ratingCount: number;
  sellerName: string;
  category: string;
  tags: string[];
  stock: number;
}

export interface CartItem {
  productId: string;
  quantity: number;
}

export interface EnrichedCartItem extends CartItem {
  product: Product;
  lineTotal: number;
}
