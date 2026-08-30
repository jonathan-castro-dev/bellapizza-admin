import { type FormEvent } from 'react'
import { Bell, CircleUserRound, Search } from 'lucide-react'
import { useSearchParams } from 'react-router'

export function Header() {
  const [searchParams, setSearchParams] = useSearchParams()
  const clientName = searchParams.get('clientName') ?? ''

  function updateClientName(value: string) {
    setSearchParams(
      (state) => {
        const nextParams = new URLSearchParams(state)

        if (value) {
          nextParams.set('clientName', value)
        } else {
          nextParams.delete('clientName')
        }

        return nextParams
      },
      { replace: true },
    )
  }

  function handleSearchSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const value = String(formData.get('clientName') ?? '')
    updateClientName(value)
  }

  return (
    <header className="flex h-16 items-center justify-end gap-4 border-b border-bella-border bg-bella-canvas px-8">
      <form className="relative w-full max-w-sm" onSubmit={handleSearchSubmit}>
        <Search className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-bella-placeholder" />
        <input
          type="search"
          name="clientName"
          value={clientName}
          onChange={(event) => updateClientName(event.target.value)}
          placeholder="Buscar ID ou Cliente..."
          className="w-full rounded-full border border-bella-border bg-bella-muted py-2.5 pl-11 pr-4 text-base text-bella-ink placeholder:text-bella-placeholder"
        />
      </form>
      <button type="button" className="rounded-full p-2 text-bella-subtle" aria-label="Notificações">
        <Bell className="size-5 shrink-0" />
      </button>
      <button type="button" className="rounded-full p-2 text-bella-subtle" aria-label="Perfil">
        <CircleUserRound className="size-5 shrink-0" />
      </button>
    </header>
  )
}
