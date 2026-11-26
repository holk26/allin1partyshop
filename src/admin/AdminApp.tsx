import { useCallback, useState } from 'react'
import {
  albums as seedAlbums,
  announcements as seedAnnouncements,
  cmsPages as seedPages,
  customers as seedCustomers,
  defaultSettings,
  DEMO_TODAY,
  invoices as seedInvoices,
  orders as seedOrders,
  rentalItems as seedItems,
  saleProducts as seedProducts,
  staff as seedStaff,
  timeOff as seedTimeOff,
  type Album,
  type Announcement,
  type CmsPage,
  type Customer,
  type Invoice,
  type Order,
  type RentalItem,
  type SaleProduct,
  type SettingsState,
  type Staff,
  type TimeOff,
} from './data'
import { Icon, Modal, Toasts, type ToastMsg } from './components/ui'
import Dashboard from './modules/Dashboard'
import Inventory from './modules/Inventory'
import Orders from './modules/Orders'
import Sales from './modules/Sales'
import Finance from './modules/Finance'
import Customers from './modules/Customers'
import HR from './modules/HR'
import Content from './modules/Content'
import Reports from './modules/Reports'
import Settings from './modules/Settings'
import './admin.css'

type Tab = 'dashboard' | 'inventory' | 'orders' | 'sales' | 'finance' | 'customers' | 'hr' | 'content' | 'reports' | 'settings'

const NAV: { id: Tab; label: string; icon: string }[] = [
  { id: 'dashboard', label: 'Dashboard', icon: 'dashboard' },
  { id: 'inventory', label: 'Inventory', icon: 'inventory' },
  { id: 'orders', label: 'Quotes & Orders', icon: 'orders' },
  { id: 'sales', label: 'Retail Sales', icon: 'sales' },
  { id: 'finance', label: 'Finance', icon: 'finance' },
  { id: 'customers', label: 'Customers', icon: 'customers' },
  { id: 'hr', label: 'Human Resources', icon: 'hr' },
  { id: 'content', label: 'Website Content', icon: 'content' },
  { id: 'reports', label: 'Reports', icon: 'reports' },
  { id: 'settings', label: 'Settings', icon: 'settings' },
]

function LoginScreen({ onEnter }: { onEnter: () => void }) {
  const [email, setEmail] = useState('demo@allin1partyshop.com')
  const [password, setPassword] = useState('demo')
  return (
    <div className="admin-scope flex min-h-dvh items-center justify-center bg-gradient-to-br from-cream via-blush to-mint px-4 py-10">
      <div className="w-full max-w-md">
        <div className="mb-6 text-center">
          <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-3xl bg-gradient-to-br from-sun to-coral text-2xl font-black text-white shadow-lg">
            A1
          </div>
          <h1 className="text-2xl font-black tracking-tight text-ink">All in One Party Shop</h1>
          <p className="text-sm font-medium text-ink-soft">Create. Decorate. Celebrate. — Staff CMS</p>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            onEnter()
          }}
          className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl"
        >
          <div className="mb-4 flex items-center justify-center">
            <span className="rounded-full border border-amber-300 bg-amber-100 px-3 py-1 text-xs font-bold text-amber-800">
              DEMO — sample data, no real accounts
            </span>
          </div>
          <label className="mb-3 block">
            <span className="mb-1 block text-sm font-medium text-slate-700">Email</span>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              className="w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-coral focus:ring-2 focus:ring-coral/25"
            />
          </label>
          <label className="mb-4 block">
            <span className="mb-1 block text-sm font-medium text-slate-700">Password</span>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              className="w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-coral focus:ring-2 focus:ring-coral/25"
            />
          </label>
          <button type="submit" className="w-full rounded-xl bg-coral py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-coral-dark">
            Sign in
          </button>
          <button
            type="button"
            onClick={onEnter}
            className="mt-2 w-full rounded-xl border border-slate-300 bg-white py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            Enter demo →
          </button>
          <p className="mt-4 text-center text-xs text-slate-400">
            Any email and password will enter. Nothing here is connected to a real system.
          </p>
        </form>
        <p className="mt-4 text-center text-xs text-slate-500">Campbell River &amp; Comox Valley · Vancouver Island, BC · 1-844-338-6678</p>
      </div>
    </div>
  )
}

export default function AdminApp() {
  const [authed, setAuthed] = useState(false)
  const [tab, setTab] = useState<Tab>('dashboard')
  const [focusOrderId, setFocusOrderId] = useState<string | null>(null)
  const [toasts, setToasts] = useState<ToastMsg[]>([])
  const [moreOpen, setMoreOpen] = useState(false)

  const [items, setItems] = useState<RentalItem[]>(seedItems)
  const [ordersList, setOrdersList] = useState<Order[]>(seedOrders)
  const [products, setProducts] = useState<SaleProduct[]>(seedProducts)
  const [invoiceList, setInvoiceList] = useState<Invoice[]>(seedInvoices)
  const [timeOffList, setTimeOffList] = useState<TimeOff[]>(seedTimeOff)
  const [pages, setPages] = useState<CmsPage[]>(seedPages)
  const [albums, setAlbums] = useState<Album[]>(seedAlbums)
  const [announcements, setAnnouncements] = useState<Announcement[]>(seedAnnouncements)
  const [settings, setSettings] = useState<SettingsState>(defaultSettings)
  const [customers] = useState<Customer[]>(seedCustomers)
  const [staffList] = useState<Staff[]>(seedStaff)

  const notify = useCallback((text: string) => {
    setToasts([{ id: Date.now(), text }])
  }, [])

  function go(next: string, orderId?: string) {
    setMoreOpen(false)
    setTab(next as Tab)
    if (orderId) setFocusOrderId(orderId)
    window.scrollTo({ top: 0 })
  }

  if (!authed) return <LoginScreen onEnter={() => setAuthed(true)} />

  return (
    <div className="admin-scope flex min-h-dvh flex-col">
      {/* Top bar */}
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex w-full max-w-[1600px] items-center gap-3 px-4 py-3 sm:px-6">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-sun to-coral text-base font-black text-white">
            A1
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-bold leading-tight text-ink sm:text-base">{settings.businessName} — Staff CMS</p>
            <p className="truncate text-xs text-slate-400">{settings.tagline}</p>
          </div>
          <span className="ml-1 hidden shrink-0 rounded-full border border-amber-300 bg-amber-100 px-2.5 py-1 text-[11px] font-bold text-amber-800 sm:inline">
            DEMO — sample data
          </span>
          <div className="ml-auto flex shrink-0 items-center gap-2 sm:gap-3">
            <span className="hidden text-xs font-medium text-slate-500 md:inline">{DEMO_TODAY}</span>
            <span className="hidden items-center gap-2 rounded-full bg-cream px-3 py-1.5 text-sm font-medium text-ink sm:flex">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-coral text-[11px] font-bold text-white">TT</span>
              Tessa · Owner
            </span>
            <a href="/" title="View storefront" className="hidden items-center gap-1.5 rounded-xl border border-slate-300 px-2.5 py-2 text-sm font-semibold text-slate-600 outline-none hover:bg-slate-50 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-coral/60 sm:flex">
              <Icon name="external" size={16} />
              <span className="hidden md:inline">Store</span>
            </a>
            <button
              onClick={() => setAuthed(false)}
              className="flex items-center gap-1.5 rounded-xl border border-slate-300 px-2.5 py-2 text-sm font-semibold text-slate-600 outline-none hover:bg-slate-50 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-coral/60"
              title="Log out of the demo"
            >
              <Icon name="logout" size={16} />
              <span className="hidden sm:inline">Log out</span>
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto flex w-full max-w-[1600px] flex-1 items-start">
        {/* Sidebar */}
        <aside className="sticky top-[65px] hidden w-60 shrink-0 flex-col self-stretch border-r border-slate-200 bg-white px-3 py-4 lg:flex">
          <nav className="space-y-1" aria-label="Sections">
            {NAV.map((n) => (
              <button
                key={n.id}
                onClick={() => go(n.id)}
                className={`flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-left text-sm font-medium transition outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-coral/70 ${
                  tab === n.id ? 'bg-ink text-white shadow-sm' : 'text-slate-600 hover:bg-cream hover:text-ink'
                }`}
              >
                <Icon name={n.icon} size={18} />
                {n.label}
                {n.id === 'orders' && ordersList.filter((o) => o.status === 'Requested').length > 0 && (
                  <span className="ml-auto rounded-full bg-coral px-2 py-0.5 text-[11px] font-bold text-white">
                    {ordersList.filter((o) => o.status === 'Requested').length}
                  </span>
                )}
              </button>
            ))}
          </nav>
          <div className="mt-auto pt-6">
          <div className="rounded-2xl bg-cream p-3 text-xs leading-relaxed text-slate-600">
            <p className="font-bold text-ink">Showrooms</p>
            <p className="mt-1">Campbell River — {settings.addrCR}</p>
            <p className="mt-1">Comox — {settings.addrComox}</p>
            <p className="mt-1 font-semibold text-ink">{settings.phone}</p>
            <p className="mt-1 text-slate-400">{settings.hours}</p>
          </div>
          <a href="/" className="mt-3 flex items-center gap-1.5 px-1 text-xs font-semibold text-coral hover:underline">
            View storefront <Icon name="external" size={13} />
          </a>
          </div>
        </aside>

        {/* Content */}
        <main className="min-w-0 flex-1 px-4 pb-24 pt-5 sm:px-6 lg:pb-6 xl:px-8">
          {tab === 'dashboard' && <Dashboard go={go} />}
          {tab === 'inventory' && <Inventory items={items} onChange={setItems} notify={notify} />}
          {tab === 'orders' && <Orders orders={ordersList} onChange={setOrdersList} notify={notify} settings={settings} focusOrderId={focusOrderId} />}
          {tab === 'sales' && <Sales products={products} onChange={setProducts} notify={notify} />}
          {tab === 'finance' && <Finance invoices={invoiceList} onChange={setInvoiceList} notify={notify} settings={settings} />}
          {tab === 'customers' && <Customers customers={customers} ordersList={ordersList} settings={settings} />}
          {tab === 'hr' && <HR staffList={staffList} timeOffList={timeOffList} onTimeOff={setTimeOffList} notify={notify} />}
          {tab === 'content' && (
            <Content pages={pages} albums={albums} announcements={announcements} onPages={setPages} onAlbums={setAlbums} onAnnouncements={setAnnouncements} notify={notify} />
          )}
          {tab === 'reports' && <Reports ordersList={ordersList} settings={settings} />}
          {tab === 'settings' && <Settings settings={settings} onChange={setSettings} notify={notify} />}
          <footer className="mt-8 border-t border-slate-200 pt-4 text-center text-xs text-slate-400">
            Demo dashboard for All in One Party Shop · Sample data only — nothing here affects the real business · Built for demonstration
          </footer>
        </main>
      </div>

      {/* Mobile bottom navigation: the 4 most-used sections + a sheet with the rest */}
      <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-white/95 pb-[env(safe-area-inset-bottom)] backdrop-blur lg:hidden" aria-label="Sections">
        <div className="grid grid-cols-5">
          {[
            { id: 'dashboard', label: 'Dashboard', icon: 'dashboard' },
            { id: 'inventory', label: 'Inventory', icon: 'inventory' },
            { id: 'orders', label: 'Orders', icon: 'orders' },
            { id: 'finance', label: 'Finance', icon: 'finance' },
          ].map((n) => (
            <button
              key={n.id}
              onClick={() => go(n.id)}
              aria-current={tab === n.id ? 'page' : undefined}
              className={`relative flex flex-col items-center gap-0.5 rounded-lg py-2.5 text-[11px] font-semibold outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-coral/60 ${tab === n.id ? 'text-coral' : 'text-slate-500'}`}
            >
              <span className="relative">
                <Icon name={n.icon} size={20} />
                {n.id === 'orders' && ordersList.filter((o) => o.status === 'Requested').length > 0 && (
                  <span className="absolute -right-2.5 -top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-coral px-1 text-[10px] font-bold text-white">
                    {ordersList.filter((o) => o.status === 'Requested').length}
                  </span>
                )}
              </span>
              {n.label}
            </button>
          ))}
          <button onClick={() => setMoreOpen(true)} className="flex flex-col items-center gap-0.5 rounded-lg py-2.5 text-[11px] font-semibold text-slate-500 outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-coral/60">
            <Icon name="more" size={20} />
            More
          </button>
        </div>
      </nav>

      {moreOpen && (
        <Modal title="All sections" onClose={() => setMoreOpen(false)}>
          <div className="grid gap-1">
            {NAV.map((n) => (
              <button
                key={n.id}
                onClick={() => go(n.id)}
                className={`flex items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-medium outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-coral/60 ${tab === n.id ? 'bg-blush/60 text-ink' : 'text-slate-600 hover:bg-cream'}`}
              >
                <Icon name={n.icon} size={18} />
                {n.label}
                {n.id === 'orders' && ordersList.filter((o) => o.status === 'Requested').length > 0 && (
                  <span className="ml-auto rounded-full bg-coral px-2 py-0.5 text-[11px] font-bold text-white">
                    {ordersList.filter((o) => o.status === 'Requested').length}
                  </span>
                )}
              </button>
            ))}
            <a href="/" className="flex items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-medium text-slate-600 outline-none hover:bg-cream focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-coral/60">
              <Icon name="external" size={18} />
              View storefront
            </a>
            <button onClick={() => { setAuthed(false); setMoreOpen(false) }} className="flex items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-medium text-rose-700 outline-none hover:bg-rose-50 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-coral/60">
              <Icon name="logout" size={18} />
              Log out
            </button>
          </div>
        </Modal>
      )}

      <Toasts toasts={toasts} />
    </div>
  )
}
