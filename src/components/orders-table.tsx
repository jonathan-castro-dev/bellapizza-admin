import { useEffect, useRef, useState } from 'react'
import { ChevronDown, ListFilter } from 'lucide-react'
import { useSearchParams } from 'react-router'

import type { Order, OrderStatus } from '../api/get-orders.ts'
import { getOrdersPagination, ORDERS_PER_PAGE } from '../lib/orders-pagination.ts'
import { OrderTableRow } from './order-table-row.tsx'
import { OrderTableRowSkeleton } from './order-table-row-skeleton.tsx'
import { OrdersPagination } from './orders-pagination.tsx'

const STATUS_FILTERS = [
  { label: 'Todos status', value: '' },
  { label: 'Em preparo', value: 'preparing' },
  { label: 'Pronto', value: 'ready' },
] as const satisfies ReadonlyArray<{ label: string; value: '' | OrderStatus }>

interface OrdersTableProps {
  orders: Order[]
  isLoading: boolean
  isError: boolean
  onRetry: () => void
}

export function OrdersTable({ orders, isLoading, isError, onRetry }: OrdersTableProps) {
  const [searchParams, setSearchParams] = useSearchParams()
  const [isStatusMenuOpen, setIsStatusMenuOpen] = useState(false)
  const statusMenuRef = useRef<HTMLDivElement>(null)

  const selectedStatus = searchParams.get('status') ?? ''
  const selectedStatusLabel =
    STATUS_FILTERS.find((option) => option.value === selectedStatus)?.label ?? 'Todos status'
  const { startIndex, perPage } = getOrdersPagination(
    orders.length,
    searchParams.get('page'),
  )
  const visibleOrders = orders.slice(startIndex, startIndex + perPage)

  function handleStatusChange(value: string) {
    setSearchParams((state) => {
      const nextParams = new URLSearchParams(state)

      if (value) {
        nextParams.set('status', value)
      } else {
        nextParams.delete('status')
      }

      nextParams.delete('page')

      return nextParams
    })
    setIsStatusMenuOpen(false)
  }

  useEffect(() => {
    if (!isStatusMenuOpen) {
      return
    }

    function handlePointerDown(event: MouseEvent) {
      if (
        statusMenuRef.current &&
        !statusMenuRef.current.contains(event.target as Node)
      ) {
        setIsStatusMenuOpen(false)
      }
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsStatusMenuOpen(false)
      }
    }

    document.addEventListener('mousedown', handlePointerDown)
    document.addEventListener('keydown', handleEscape)

    return () => {
      document.removeEventListener('mousedown', handlePointerDown)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [isStatusMenuOpen])

  return (
    <section className="overflow-hidden rounded-xl border border-bella-border bg-white shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-bella-border px-6 py-5">
        <h1 className="text-2xl font-bold text-bella-ink">Pedidos Ativos</h1>
        <div className="relative" ref={statusMenuRef}>
          <button
            type="button"
            aria-haspopup="listbox"
            aria-expanded={isStatusMenuOpen}
            onClick={() => setIsStatusMenuOpen((open) => !open)}
            className="inline-flex items-center gap-2 rounded-lg border border-bella-border bg-bella-canvas px-4 py-2 text-sm font-semibold text-bella-ink cursor-pointer"
          >
            <ListFilter className="size-4 text-bella-subtle" />
            {selectedStatusLabel}
            <ChevronDown className="size-4 text-bella-subtle" />
          </button>

          {isStatusMenuOpen ? (
            <ul
              role="listbox"
              className="absolute right-0 z-10 mt-2 min-w-full overflow-hidden rounded-lg border border-bella-border bg-white py-1 shadow-lg"
            >
              {STATUS_FILTERS.map((option) => (
                <li key={option.label}>
                  <button
                    type="button"
                    role="option"
                    aria-selected={option.value === selectedStatus}
                    onClick={() => handleStatusChange(option.value)}
                    className={`block w-full px-4 py-2 text-left text-sm font-semibold ${
                      option.value === selectedStatus
                        ? 'bg-bella-muted text-bella-ink'
                        : 'text-bella-ink hover:bg-bella-canvas'
                    }`}
                  >
                    {option.label}
                  </button>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left text-sm">
          <thead>
            <tr className="bg-bella-muted text-xs font-semibold uppercase tracking-wide text-bella-subtle">
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
              ? Array.from({ length: ORDERS_PER_PAGE }).map((_, index) => (
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
                    className="mt-3 rounded-lg bg-bella-brand px-4 py-2 text-sm font-bold text-white cursor-pointer"
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
              ? visibleOrders.map((order) => (
                  <OrderTableRow key={order.id} order={order} />
                ))
              : null}
          </tbody>
        </table>
      </div>

      <OrdersPagination totalCount={orders.length} />
    </section>
  )
}
