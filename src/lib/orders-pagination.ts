export const ORDERS_PER_PAGE = 6

export function getOrdersPagination(totalCount: number, pageParam: string | null) {
  const pageCount = Math.max(1, Math.ceil(totalCount / ORDERS_PER_PAGE))
  const requestedPage = parsePageParam(pageParam)
  const page = Math.min(requestedPage, pageCount)
  const startIndex = (page - 1) * ORDERS_PER_PAGE

  return {
    page,
    pageCount,
    startIndex,
    perPage: ORDERS_PER_PAGE,
    displayedCount:
      totalCount === 0 ? 0 : Math.min(ORDERS_PER_PAGE, totalCount - startIndex),
  }
}

export function parsePageParam(value: string | null) {
  if (value == null || value === '') {
    return 1
  }

  const page = Number(value)

  if (!Number.isInteger(page) || page < 1) {
    return 1
  }

  return page
}
