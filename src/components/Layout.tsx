import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'
import {
  LayoutDashboard,
  Calendar,
  DoorOpen,
  Users,
  Wrench,
  CreditCard,
  BarChart3,
  ShoppingBag,
  Sparkles,
  Settings,
  Bell,
  Menu,
  X,
  ChevronRight,
} from 'lucide-react'

const NAV = [
  { href: '/studio/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/studio/calendar', label: 'Calendar', icon: Calendar },
  { href: '/studio/rooms', label: 'Rooms', icon: DoorOpen },
  { href: '/studio/clients', label: 'Clients', icon: Users },
  { href: '/studio/equipment', label: 'Equipment', icon: Wrench },
  { href: '/studio/payments', label: 'Payments', icon: CreditCard },
  { href: '/studio/analytics', label: 'Analytics', icon: BarChart3 },
  { href: '/studio/marketplace', label: 'Marketplace', icon: ShoppingBag },
  { href: '/studio/ai-predict', label: 'AI Predict', icon: Sparkles },
  { href: '/studio/settings', label: 'Settings', icon: Settings },
]

export default function Layout({ children }: { children: React.ReactNode }) {
  const { pathname } = useRouter()
  const [open, setOpen] = useState(false)

  return (
    <div className="flex h-screen bg-night-50 overflow-hidden">
      {/* Mobile overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-20 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:static inset-y-0 left-0 z-30 flex flex-col
          w-64 bg-white border-r border-night-100 transition-transform duration-300
          ${open ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        {/* Logo */}
        <div className="flex items-center gap-3 px-5 py-5 border-b border-night-100">
          <Image
            src="/images/logo.png"
            alt="By the Book"
            width={36}
            height={36}
            className="rounded-xl object-contain"
          />
          <div>
            <p className="font-display font-bold text-night-900 text-base leading-tight">
              By the Book
            </p>
            <p className="text-xs text-night-400">Studio Platform</p>
          </div>
          <button
            className="ml-auto lg:hidden text-night-400 hover:text-night-700"
            onClick={() => setOpen(false)}
          >
            <X size={18} />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-0.5 scrollbar-hide">
          {NAV.map(({ href, label, icon: Icon }) => {
            const active = pathname === href || pathname.startsWith(href + '/')
            return (
              <Link
                key={href}
                href={href}
                className={active ? 'sidebar-link-active' : 'sidebar-link'}
              >
                <Icon size={18} className="shrink-0" />
                <span>{label}</span>
                {active && <ChevronRight size={14} className="ml-auto opacity-50" />}
              </Link>
            )
          })}
        </nav>

        {/* Demo badge */}
        <div className="m-3 p-3 rounded-xl bg-gradient-to-br from-primary-50 to-violet-50 border border-primary-100">
          <p className="text-xs font-semibold text-primary-700 mb-0.5">Demo Mode</p>
          <p className="text-xs text-primary-500">SoundForge Studios</p>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Topbar */}
        <header className="flex items-center gap-4 px-6 py-4 bg-white border-b border-night-100">
          <button
            className="lg:hidden text-night-500 hover:text-night-900"
            onClick={() => setOpen(true)}
          >
            <Menu size={22} />
          </button>

          <div className="flex-1" />

          <Link href="/book" className="btn-primary text-sm py-2 px-4">
            + New Booking
          </Link>

          <button className="relative p-2 text-night-500 hover:text-night-900 hover:bg-night-100 rounded-xl transition-colors">
            <Bell size={20} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-orange-500 rounded-full" />
          </button>

          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-500 to-violet-600 flex items-center justify-center text-white font-bold text-sm">
            SF
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  )
}
