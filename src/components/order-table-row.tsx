import { useMutation, useQueryClient } from '@tanstack/react-query'

import type { Order } from '../api/get-orders.ts'
import { updateOrderStatus } from '../api/update-order-status.ts'
import { OrderStatusBadge } from './order-status-badge.tsx'

interface OrderTableRowProps {
  order: Order
}

export function OrderTableRow({ order }: OrderTableRowProps) {
  const queryClient = useQueryClient()

  const { mutate: updateOrderStatusFn, isPending: isUpdatingOrderStatus } =
    useMutation({
      mutationFn: updateOrderStatus,
      async onSuccess() {
        await queryClient.invalidateQueries({ queryKey: ['orders'] })
      },
    })

  return (
    <tr>
      <td className="px-6 py-5">
        <p className="font-bold text-bella-ink">{order.clientName}</p>
        <p className="mt-0.5 text-xs font-medium text-bella-subtle">
          {order.address?.street && order.address?.number
            ? `${order.address.street}, ${order.address.number}`
            : 'Endereço não informado'}
        </p>
      </td>
      <td className="px-6 py-5">
        <div className="flex flex-wrap gap-2">
          {order.items.map((item) => (
            <span
              key={item.productId}
              className="inline-flex rounded bg-bella-pill px-2 py-0.5 text-xs font-medium text-bella-ink"
            >
              {item.quantity}x {item.productName}
            </span>
          ))}
        </div>
      </td>
      <td className="px-6 py-5 whitespace-nowrap">
        <OrderStatusBadge status={order.status} />
      </td>
      <td className="px-6 py-5 text-right">
        {order.status === 'preparing' ? (
          <button
            type="button"
            disabled={isUpdatingOrderStatus}
            onClick={() => updateOrderStatusFn({ orderId: order.id })}
            className="rounded-lg bg-bella-brand px-4 py-2 text-sm font-bold text-white cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
          >
            Finalizar pedido
          </button>
        ) : null}
      </td>
    </tr>
  )
}
