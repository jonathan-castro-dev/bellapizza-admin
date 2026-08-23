import { ChevronDown, ChevronLeft, ChevronRight, ListFilter } from 'lucide-react'

import type { Order } from '../api/get-orders.ts'
import { OrderTableRow } from './order-table-row.tsx'
import { OrderTableRowSkeleton } from './order-table-row-skeleton.tsx'

interface OrdersTableProps {
  orders: Order[]
  isLoading: boolean
  isError: boolean
  onRetry: () => void
}

export function OrdersTable({ orders, isLoading, isError, onRetry }: OrdersTableProps) {
  return (
    <section className="overflow-hidden rounded-xl border border-bella-border bg-white shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-bella-border px-6 py-5">
        <h1 className="text-2xl font-bold text-bella-ink">Pedidos Ativos</h1>
        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-lg border border-bella-border bg-bella-canvas px-4 py-2 text-sm font-semibold text-bella-ink"
        >
          <ListFilter className="size-4 text-bella-subtle" />
          Todos status
          <ChevronDown className="size-4 text-bella-subtle" />
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left text-sm">
          <thead>
            <tr className="bg-bella-muted text-xs font-semibold uppercase tracking-wide text-bella-subtle">
              <th className="px-6 py-4 font-medium">ID</th>
              <th className="px-6 py-4 font-medium">Cliente</th>
              <th className="px-6 py-4 font-medium">Itens</th>
              <th className="px-6 py-4 font-medium">Status</th>
              <th className="px-6 py-4 font-medium">
                <span className="sr-only">Ações</span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-bella-border">
            {isLoading
              ? Array.from({ length: 5 }).map((_, index) => (
                  <OrderTableRowSkeleton key={index} />
                ))
              : null}

            {isError ? (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center">
                  <p className="font-semibold text-bella-ink">
                    Não foi possível carregar os pedidos.
                  </p>
                  <button
                    type="button"
                    onClick={onRetry}
                    className="mt-3 rounded-lg bg-bella-brand px-4 py-2 text-sm font-bold text-white"
                  >
                    Tentar novamente
                  </button>
                </td>
              </tr>
            ) : null}

            {!isLoading && !isError && orders.length === 0 ? (
              <tr>
                <td
                  colSpan={5}
                  className="px-6 py-12 text-center font-semibold text-bella-subtle"
                >
                  Nenhum pedido ativo no momento.
                </td>
              </tr>
            ) : null}

            {!isError
              ? orders.map((order) => <OrderTableRow key={order.id} order={order} />)
              : null}
          </tbody>
        </table>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4 border-t border-bella-border bg-bella-muted px-4 py-4 text-xs font-medium text-bella-subtle">
        <p>
          Exibindo {orders.length}{' '}
          {orders.length === 1 ? 'pedido ativo' : 'pedidos ativos'}
        </p>
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="rounded-lg p-2 text-bella-subtle opacity-30"
            aria-label="Página anterior"
          >
            <ChevronLeft className="size-4" />
          </button>
          <button
            type="button"
            className="rounded-lg p-2 text-bella-subtle"
            aria-label="Próxima página"
          >
            <ChevronRight className="size-4" />
          </button>
        </div>
      </div>
    </section>
  )
}
