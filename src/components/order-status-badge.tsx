import type { OrderStatus } from '../api/get-orders.ts'

interface OrderStatusBadgeProps {
  status: OrderStatus
}

interface StatusStyle {
  label: string
  badge: string
  dot: string
}

const statusStyles: Record<string, StatusStyle> = {
  preparing: {
    label: 'Em preparo',
    badge: 'bg-bella-preparing-accent/20 text-bella-preparing',
    dot: 'bg-bella-preparing-accent',
  },
  ready: {
    label: 'Pronto',
    badge: 'bg-green-100 text-green-800',
    dot: 'bg-green-500',
  },
  delivered: {
    label: 'Entregue',
    badge: 'bg-bella-pill text-bella-ink',
    dot: 'bg-bella-subtle',
  },
  canceled: {
    label: 'Cancelado',
    badge: 'bg-bella-brand/10 text-bella-brand',
    dot: 'bg-bella-brand',
  },
}

export function OrderStatusBadge({ status }: OrderStatusBadgeProps) {
  const style = statusStyles[status] ?? {
    label: status,
    badge: 'bg-bella-pill text-bella-subtle',
    dot: 'bg-bella-subtle',
  }

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold ${style.badge}`}
    >
      <span className={`size-2 rounded-full ${style.dot}`} aria-hidden="true" />
      {style.label}
    </span>
  )
}
