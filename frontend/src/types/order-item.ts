import { Product } from '@/types/product.ts'

export interface OrderItem {
  id: string;
  created_at: string;
  updated_at: string;
  quantity: number;
  price: number;
  product: Product;
}
