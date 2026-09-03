import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useEffect } from 'react'
import { useSearchParams } from 'react-router'

import {
  getOrdersPagination,
  parsePageParam,
} from '../lib/orders-pagination.ts'

function useOrdersPagination(totalCount: number) {
  const [searchParams, setSearchParams] = useSearchParams()
  const pagination = getOrdersPagination(totalCount, searchParams.get('page'))
  const requestedPage = parsePageParam(searchParams.get('page'))

  useEffect(() => {
    if (requestedPage === pagination.page) {
      return
    }

    setSearchParams(
      (state) => {
        const nextParams = new URLSearchParams(state)

        if (pagination.page <= 1) {
          nextParams.delete('page')
        } else {
          nextParams.set('page', String(pagination.page))
        }

        return nextParams
      },
      { replace: true },
    )
  }, [pagination.page, requestedPage, setSearchParams])

  function goToPage(nextPage: number) {
    setSearchParams((state) => {
      const nextParams = new URLSearchParams(state)
      const { page } = getOrdersPagination(totalCount, String(nextPage))

      if (page <= 1) {
        nextParams.delete('page')
      } else {
        nextParams.set('page', String(page))
      }

      return nextParams
    })
  }

  return {
    ...pagination,
    canGoPrevious: pagination.page > 1,
    canGoNext: pagination.page < pagination.pageCount,
    goToPage,
  }
}

interface OrdersPaginationProps {
  totalCount: number
}

export function OrdersPagination({ totalCount }: OrdersPaginationProps) {
  const { displayedCount, page, canGoPrevious, canGoNext, goToPage } =
    useOrdersPagination(totalCount)

  return (
    <div className="flex flex-wrap items-center justify-between gap-4 border-t border-bella-border bg-bella-muted px-4 py-4 text-xs font-medium text-bella-subtle">
      <p>
        Exibindo {displayedCount} de {totalCount}{' '}
        {totalCount === 1 ? 'pedido ativo' : 'pedidos ativos'}
      </p>
      <div className="flex items-center gap-2">
        <button
          type="button"
          disabled={!canGoPrevious}
          onClick={() => goToPage(page - 1)}
          className="rounded-lg p-2 text-bella-subtle cursor-pointer disabled:cursor-not-allowed disabled:opacity-30"
          aria-label="Página anterior"
        >
          <ChevronLeft className="size-4" />
        </button>
        <button
          type="button"
          disabled={!canGoNext}
          onClick={() => goToPage(page + 1)}
          className="rounded-lg p-2 text-bella-subtle cursor-pointer disabled:cursor-not-allowed disabled:opacity-30"
          aria-label="Próxima página"
        >
          <ChevronRight className="size-4" />
        </button>
      </div>
    </div>
  )
}
