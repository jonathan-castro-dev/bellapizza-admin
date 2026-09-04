import { useEffect } from 'react'
import { Handbag, LayoutDashboard, Settings } from 'lucide-react'

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  useEffect(() => {
    if (!isOpen) {
      return
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    document.addEventListener('keydown', handleEscape)
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = ''
    }
  }, [isOpen, onClose])

  return (
    <>
      {isOpen ? (
        <div
          className="fixed inset-0 z-30 bg-bella-ink/40 lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      ) : null}

      <aside
        id="admin-sidebar"
        className={`fixed inset-y-0 left-0 z-40 flex w-64 shrink-0 flex-col border-r border-bella-border bg-bella-muted px-6 py-8 transition-transform duration-200 ease-out lg:static lg:translate-x-0 lg:pointer-events-auto ${
          isOpen ? 'translate-x-0' : '-translate-x-full pointer-events-none'
        }`}
      >
        <p className="text-2xl font-bold text-bella-brand">BellaPizza Admin</p>

        <nav className="mt-10 flex flex-col gap-1">
          <a
            href="#"
            onClick={onClose}
            className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-semibold text-bella-subtle"
          >
            <LayoutDashboard className="size-5 shrink-0" />
            Dashboard
          </a>
          <a
            href="#"
            onClick={onClose}
            className="flex items-center gap-3 rounded-lg bg-bella-brand-active px-4 py-3 text-sm font-bold text-bella-nav-on"
          >
            <Handbag className="size-5 shrink-0" />
            Pedidos ativos
          </a>
          <a
            href="#"
            onClick={onClose}
            className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-semibold text-bella-subtle"
          >
            <Settings className="size-5 shrink-0" />
            Configurações
          </a>
        </nav>
      </aside>
    </>
  )
}
