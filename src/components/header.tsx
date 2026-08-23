import { Bell, CircleUserRound, Search } from 'lucide-react'

export function Header() {
  return (
    <header className="flex h-16 items-center justify-end gap-4 border-b border-bella-border bg-bella-canvas px-8">
      <div className="relative w-full max-w-sm">
        <Search className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-bella-placeholder" />
        <input
          type="search"
          readOnly
          placeholder="Buscar ID ou Cliente..."
          className="w-full rounded-full border border-bella-border bg-bella-muted py-2.5 pl-11 pr-4 text-base text-bella-ink placeholder:text-bella-placeholder"
        />
      </div>
      <button type="button" className="rounded-full p-2 text-bella-subtle" aria-label="Notificações">
        <Bell className="size-5 shrink-0" />
      </button>
      <button type="button" className="rounded-full p-2 text-bella-subtle" aria-label="Perfil">
        <CircleUserRound className="size-5 shrink-0" />
      </button>
    </header>
  )
}
