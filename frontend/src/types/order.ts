import { User } from '@/types/user.ts'
import { Customer } from '@/types/customer.ts'
import { OrderItem } from '@/types/order-item.ts'

export interface Order {
  id: number;
  status: string;
  agent: User | null;
  customer: Customer;
  order_item: OrderItem | null;
  address: string;
  city: string;
  created_at: string;
  updated_at: string;
}
