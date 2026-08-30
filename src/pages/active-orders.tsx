import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'react-router'

import { getOrders } from '../api/get-orders.ts'
import { Header } from '../components/header.tsx'
import { OrdersTable } from '../components/orders-table.tsx'
import { Sidebar } from '../components/sidebar.tsx'
import { SummaryCards } from '../components/summary-cards.tsx'
import { useDebounce } from '../hooks/use-debounce.ts'

export function ActiveOrders() {
  const [searchParams] = useSearchParams()
  const clientName = searchParams.get('clientName')
  const status = searchParams.get('status')
  const debouncedClientName = useDebounce(clientName, 300)

  const {
    data: orders,
    isPending,
    isError,
    refetch,
  } = useQuery({
    queryKey: ['orders', debouncedClientName, status],
    queryFn: () => getOrders({ clientName: debouncedClientName, status }),
  })

  return (
    <div className="flex min-h-full bg-bella-canvas">
      <Sidebar />

      <div className="flex min-w-0 flex-1 flex-col">
        <Header />

        <main className="mx-auto w-full max-w-7xl flex-1 px-8 py-8">
          <SummaryCards />

          <div className="mt-8">
            <OrdersTable
              orders={orders ?? []}
              isLoading={isPending}
              isError={isError}
              onRetry={() => void refetch()}
            />
          </div>
        </main>
      </div>
    </div>
  )
}
