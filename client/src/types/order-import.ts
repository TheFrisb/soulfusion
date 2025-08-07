import { Order } from '@/types/order.ts'

export interface OrderImport {
  id: string;
  orders_count: number;
  file_name: string;
  file: string;
  orders: Order[] | null;
  created_at: string;
  updated_at: string;
  agent?: any; // Add agent property for import assignment
}
