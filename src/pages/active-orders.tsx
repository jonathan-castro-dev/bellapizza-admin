import { 
  Banknote, 
  Bell, 
  ChevronDown, 
  ChevronLeft,
  ChevronRight,
  CircleUserRound, 
  Handbag, 
  LayoutDashboard, 
  ListFilter, 
  Search, 
  Settings, 
  Utensils 
} from "lucide-react"

const orders = [
  {
    id: "#4582",
    name: "Ricardo Silva",
    address: "Rua das Flores, 123",
    items: ["1x Pizza Calabresa (G)", "1x Coca-Cola 2L"],
    status: "preparing" as const,
  },
  {
    id: "#4581",
    name: "Ana Paula",
    address: "Av. Brasil, 456",
    items: ["2x Pizza Margherita (M)"],
    status: "ready" as const,
  },
  {
    id: "#4580",
    name: "Carlos Mendes",
    address: "Rua XV, 789",
    items: ["1x Pizza 4 Queijos (G)"],
    status: "preparing" as const,
  },
  {
    id: "#4579",
    name: "Juliana Costa",
    address: "Alameda Santos, 321",
    items: ["1x Pizza Frango c/ Catupiry (G)", "1x Guaraná 2L"],
    status: "ready" as const,
  },
  {
    id: "#4578",
    name: "Pedro Oliveira",
    address: "Rua Augusta, 654",
    items: ["3x Pizza Portuguesa (P)"],
    status: "preparing" as const,
  },
  {
    id: "#4577",
    name: "Fernanda Lima",
    address: "Av. Paulista, 1000",
    items: ["1x Pizza Napolitana (G)"],
    status: "ready" as const,
  },
]

export function ActiveOrders() {
  return (
    <div className="flex min-h-full bg-bella-canvas">
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

      <div className="flex min-w-0 flex-1 flex-col">
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

        <main className="mx-auto w-full max-w-7xl flex-1 px-8 py-8">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="flex items-center justify-between rounded-xl border border-bella-border bg-white p-6 shadow-sm">
              <div>
                <p className="text-sm font-semibold text-bella-subtle">Pedidos Hoje</p>
                <p className="mt-1 text-3xl font-bold text-bella-ink">124</p>
              </div>
              <div className="flex size-12 items-center justify-center rounded-full bg-bella-brand/10 text-bella-brand">
                <Utensils className="size-5 shrink-0" />
              </div>
            </div>
            <div className="flex items-center justify-between rounded-xl border border-bella-border bg-white p-6 shadow-sm">
              <div>
                <p className="text-sm font-semibold text-bella-subtle">Total do Mês</p>
                <p className="mt-1 text-3xl font-bold text-bella-ink">R$ 42.850</p>
              </div>
              <div className="flex size-12 items-center justify-center rounded-full bg-bella-preparing-accent/20 text-bella-preparing">
                <Banknote className="size-5 shrink-0" />
              </div>
            </div>
          </div>

          <section className="mt-8 overflow-hidden rounded-xl border border-bella-border bg-white shadow-sm">
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
                  {orders.map((order) => (
                    <tr key={order.id}>
                      <td className="whitespace-nowrap px-6 py-5 font-bold text-bella-brand">
                        {order.id}
                      </td>
                      <td className="px-6 py-5">
                        <p className="font-bold text-bella-ink">{order.name}</p>
                        <p className="mt-0.5 text-xs font-medium text-bella-subtle">{order.address}</p>
                      </td>
                      <td className="px-6 py-5">
                        <div className="flex flex-wrap gap-2">
                          {order.items.map((item) => (
                            <span
                              key={item}
                              className="inline-flex rounded bg-bella-pill px-2 py-0.5 text-xs font-medium text-bella-ink"
                            >
                              {item}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        {order.status === "preparing" ? (
                          <span className="inline-flex items-center gap-1.5 rounded-full bg-bella-preparing-accent/20 px-3 py-1 text-xs font-bold text-bella-preparing">
                            <span className="size-2 rounded-full bg-bella-preparing-accent" aria-hidden="true" />
                            Em preparo
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 rounded-full bg-green-100 px-3 py-1 text-xs font-bold text-green-800">
                            <span className="size-2 rounded-full bg-green-500" aria-hidden="true" />
                            Pronto
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-5 text-right">
                        {order.status === "ready" ? (
                          <button
                            type="button"
                            className="rounded-lg bg-bella-brand px-4 py-2 text-sm font-bold text-white"
                          >
                            Finalizar pedido
                          </button>
                        ) : null}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 border-t border-bella-border bg-bella-muted px-4 py-4 text-xs font-medium text-bella-subtle">
              <p>Exibindo 6 de 18 pedidos ativos</p>
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
        </main>
      </div>
    </div>
  )
}
