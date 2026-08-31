import { api } from '../services/api.ts'

interface UpdateOrderStatusParams {
  orderId: string
}

export async function updateOrderStatus({ orderId }: UpdateOrderStatusParams) {
  await api.patch(`/orders/${orderId}/status`)
}
