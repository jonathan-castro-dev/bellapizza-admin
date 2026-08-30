export function OrderTableRowSkeleton() {
  return (
    <tr className="animate-pulse">
      <td className="px-6 py-5">
        <div className="h-4 w-16 rounded bg-bella-pill" />
      </td>
      <td className="px-6 py-5">
        <div className="h-4 w-32 rounded bg-bella-pill" />
        <div className="mt-2 h-3 w-40 rounded bg-bella-pill" />
      </td>
      <td className="px-6 py-5">
        <div className="flex flex-wrap gap-2">
          <div className="h-5 w-28 rounded bg-bella-pill" />
          <div className="h-5 w-20 rounded bg-bella-pill" />
        </div>
      </td>
      <td className="px-6 py-5">
        <div className="h-6 w-24 rounded-full bg-bella-pill" />
      </td>
      <td className="px-6 py-5">
        <div className="ml-auto h-9 w-32 rounded-lg bg-bella-pill" />
      </td>
    </tr>
  )
}
