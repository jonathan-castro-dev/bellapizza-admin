import { Banknote, Utensils } from 'lucide-react'

import { formatCurrency } from '../lib/format-currency.ts'
import { SummaryCardValueSkeleton } from './summary-card-value-skeleton.tsx'

interface SummaryCardsProps {
  ordersToday: number
  ordersRevenue: number
  isOrdersTodayLoading: boolean
  isOrdersTodayError: boolean
  isOrdersRevenueLoading: boolean
  isOrdersRevenueError: boolean
  onRetryOrdersToday: () => void
  onRetryOrdersRevenue: () => void
}

export function SummaryCards({
  ordersToday,
  ordersRevenue,
  isOrdersTodayLoading,
  isOrdersTodayError,
  isOrdersRevenueLoading,
  isOrdersRevenueError,
  onRetryOrdersToday,
  onRetryOrdersRevenue,
}: SummaryCardsProps) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:gap-6">
      <div className="flex items-center justify-between gap-4 rounded-xl border border-bella-border bg-white p-5 shadow-sm lg:p-6">
        <div className="min-w-0">
          <p className="text-sm font-semibold text-bella-subtle">Pedidos Hoje</p>
          {isOrdersTodayLoading ? <SummaryCardValueSkeleton /> : null}

          {isOrdersTodayError ? (
            <>
              <p className="mt-1 font-semibold text-bella-ink">
                Não foi possível carregar os pedidos de hoje.
              </p>
              <button
                type="button"
                onClick={onRetryOrdersToday}
                className="mt-3 rounded-lg bg-bella-brand px-4 py-2 text-sm font-bold text-white"
              >
                Tentar novamente
              </button>
            </>
          ) : null}

          {!isOrdersTodayLoading && !isOrdersTodayError ? (
            <p className="mt-1 text-3xl font-bold text-bella-ink">{ordersToday}</p>
          ) : null}
        </div>
        <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-bella-brand/10 text-bella-brand">
          <Utensils className="size-5 shrink-0" />
        </div>
      </div>
      <div className="flex items-center justify-between gap-4 rounded-xl border border-bella-border bg-white p-5 shadow-sm lg:p-6">
        <div className="min-w-0">
          <p className="text-sm font-semibold text-bella-subtle">Total do Mês</p>
          {isOrdersRevenueLoading ? <SummaryCardValueSkeleton /> : null}

          {isOrdersRevenueError ? (
            <>
              <p className="mt-1 font-semibold text-bella-ink">
                Não foi possível carregar o total do mês.
              </p>
              <button
                type="button"
                onClick={onRetryOrdersRevenue}
                className="mt-3 rounded-lg bg-bella-brand px-4 py-2 text-sm font-bold text-white cursor-pointer"
              >
                Tentar novamente
              </button>
            </>
          ) : null}

          {!isOrdersRevenueLoading && !isOrdersRevenueError ? (
            <p className="mt-1 text-3xl font-bold text-bella-ink">
              {formatCurrency(ordersRevenue)}
            </p>
          ) : null}
        </div>
        <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-bella-preparing-accent/20 text-bella-preparing">
          <Banknote className="size-5 shrink-0" />
        </div>
      </div>
    </div>
  )
}
