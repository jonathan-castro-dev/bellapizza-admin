import { type SubmitEvent } from 'react'
import { Bell, CircleUserRound, Menu, Search } from 'lucide-react'
import { useSearchParams } from 'react-router'

interface HeaderProps {
  isSidebarOpen: boolean
  onOpenSidebar: () => void
}

export function Header({ isSidebarOpen, onOpenSidebar }: HeaderProps) {
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

        nextParams.delete('page')

        return nextParams
      },
      { replace: true },
    )
  }

  function handleSearchSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const value = String(formData.get('clientName') ?? '')
    updateClientName(value)
  }

  return (
    <header className="flex h-16 items-center gap-3 border-b border-bella-border bg-bella-canvas px-4 md:px-6 lg:gap-4 lg:px-8">
      <button
        type="button"
        onClick={onOpenSidebar}
        className="shrink-0 rounded-full p-2 text-bella-subtle lg:hidden cursor-pointer hover:text-bella-brand"
        aria-label="Abrir menu"
        aria-expanded={isSidebarOpen}
        aria-controls="admin-sidebar"
      >
        <Menu className="size-5 shrink-0" />
      </button>
      <form className="relative ml-auto w-full min-w-0 max-w-sm" onSubmit={handleSearchSubmit}>
        <Search className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-bella-placeholder" />
        <input
          type="search"
          name="clientName"
          value={clientName}
          onChange={(event) => updateClientName(event.target.value)}
          placeholder="Buscar cliente..."
          className="w-full rounded-full border border-bella-border bg-bella-muted py-2.5 pl-11 pr-4 text-base text-bella-ink placeholder:text-bella-placeholder"
        />
      </form>
      <button
        type="button"
        className="shrink-0 rounded-full p-2 text-bella-subtle"
        aria-label="Notificações"
      >
        <Bell className="size-5 shrink-0" />
      </button>
      <button
        type="button"
        className="shrink-0 rounded-full p-2 text-bella-subtle"
        aria-label="Perfil"
      >
        <CircleUserRound className="size-5 shrink-0" />
      </button>
    </header>
  )
}
