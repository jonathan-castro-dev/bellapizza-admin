import { Handbag, LayoutDashboard, Settings } from 'lucide-react'

export function Sidebar() {
  return (
    <aside className="flex w-64 shrink-0 flex-col border-r border-bella-border bg-bella-muted px-6 py-8">
      <p className="text-2xl font-bold text-bella-brand">BellaPizza Admin</p>

      <nav className="mt-10 flex flex-col gap-1">
        <a
          href="#"
          className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-semibold text-bella-subtle"
        >
          <LayoutDashboard className="size-5 shrink-0" />
          Dashboard
        </a>
        <a
          href="#"
          className="flex items-center gap-3 rounded-lg bg-bella-brand-active px-4 py-3 text-sm font-bold text-bella-nav-on"
        >
          <Handbag className="size-5 shrink-0" />
          Pedidos ativos
        </a>
        <a
          href="#"
          className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-semibold text-bella-subtle"
        >
          <Settings className="size-5 shrink-0" />
          Configurações
        </a>
      </nav>
    </aside>
  )
}
