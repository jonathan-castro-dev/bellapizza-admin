import { Banknote, Utensils } from 'lucide-react'

import { formatCurrency } from '../lib/format-currency.ts'

interface SummaryCardsProps {
  ordersToday: number
  ordersRevenue: number
}

export function SummaryCards({ ordersToday, ordersRevenue }: SummaryCardsProps) {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      <div className="flex items-center justify-between rounded-xl border border-bella-border bg-white p-6 shadow-sm">
        <div>
          <p className="text-sm font-semibold text-bella-subtle">Pedidos Hoje</p>
          <p className="mt-1 text-3xl font-bold text-bella-ink">{ordersToday}</p>
        </div>
        <div className="flex size-12 items-center justify-center rounded-full bg-bella-brand/10 text-bella-brand">
          <Utensils className="size-5 shrink-0" />
        </div>
      </div>
      <div className="flex items-center justify-between rounded-xl border border-bella-border bg-white p-6 shadow-sm">
        <div>
          <p className="text-sm font-semibold text-bella-subtle">Total do Mês</p>
          <p className="mt-1 text-3xl font-bold text-bella-ink">
            {formatCurrency(ordersRevenue)}
          </p>
        </div>
        <div className="flex size-12 items-center justify-center rounded-full bg-bella-preparing-accent/20 text-bella-preparing">
          <Banknote className="size-5 shrink-0" />
        </div>
      </div>
    </div>
  )
}
