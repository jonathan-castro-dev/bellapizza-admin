import { api } from '../services/api.ts'

export type OrderStatus = 'preparing' | 'ready'

export interface OrderItem {
  quantity: number
  productId: string
  productName: string
}

export interface OrderAddress {
  street: string
  number: string
}

export interface Order {
  id: string
  status: OrderStatus
  created_at: string
  clientName: string
  address: OrderAddress | null
  items: OrderItem[]
}

// The endpoint may answer with a bare array or wrap it in an `orders` envelope.
type GetOrdersResponse = Order[] | { formattedOrders: Order[] }

export async function getOrders() {
  const response = await api.get<GetOrdersResponse>('/orders')

  return Array.isArray(response.data)
    ? response.data : response.data.formattedOrders
}
