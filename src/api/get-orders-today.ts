import { api } from '../services/api.ts'

interface GetOrdersTodayResponse {
  ordersToday: number
}

export async function getOrdersToday() {
  const response = await api.get<GetOrdersTodayResponse>('/orders/today')

  return response.data.ordersToday
}
