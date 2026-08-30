import { api } from '../services/api.ts'

interface GetOrdersRevenueResponse {
  total: number
}

export async function getOrdersRevenue() {
  const response = await api.get<GetOrdersRevenueResponse>('/orders/revenue')

  return response.data.total
}
