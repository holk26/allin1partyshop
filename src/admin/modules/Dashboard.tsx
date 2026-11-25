import { activity, available, money, orders, rentalItems, revenueByMonth, STATUS_COLORS, type Order } from '../data'
import { Badge, HBarList, Icon, StatCard, VBarChart } from '../components/ui'

export default function Dashboard({ go }: { go: (tab: string, orderId?: string) => void }) {
  const pending = orders.filter((o) => o.status === 'Requested')
  const upcoming = orders
    .filter((o) => ['Confirmed', 'Out for delivery', 'On site'].includes(o.status))
    .slice()
    .sort((a, b) => a.eventDate.localeCompare(b.eventDate))
    .slice(0, 6)
  const lowStock = rentalItems
    .filter((i) => available(i) / i.stock < 0.25)
    .sort((a, b) => available(a) / a.stock - available(b) / b.stock)
    .slice(0, 5)
  const reservedUnits = rentalItems.reduce((s, i) => s + i.reserved, 0)
  const totalUnits = rentalItems.reduce((s, i) => s + i.stock, 0)
  const utilization = Math.round((reservedUnits / totalUnits) * 100)

  const revenueByCategory = [
    { label: 'Tents', value: 18200, color: 'bg-coral' },
    { label: 'Chairs & Tables', value: 8400, color: 'bg-sun' },
    { label: 'Linen & Tableware', value: 5300, color: 'bg-teal' },
    { label: 'Lighting & Staging', value: 3900, color: 'bg-sky-400' },
    { label: 'Retail sales', value: 2600, color: 'bg-violet-400' },
  ]

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-xl font-bold text-ink sm:text-2xl">Good morning, Tessa</h1>
        <p className="text-sm text-slate-500">Here's what's happening across both showrooms today, Wednesday, November 25, 2026.</p>
      </div>

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <StatCard label="Revenue — November" value={money(38400)} sub="+12% vs October" accent="bg-blush text-coral" icon="finance" />
        <StatCard label="Upcoming events" value="18" sub="Next 30 days, both locations" accent="bg-mint text-teal-dark" icon="hr" />
        <StatCard label="Quotes awaiting reply" value={String(pending.length)} sub="2 need a deposit to confirm" accent="bg-amber-100 text-amber-700" icon="orders" />
        <StatCard label="Fleet utilization" value={`${utilization}%`} sub={`${reservedUnits.toLocaleString()} of ${totalUnits.toLocaleString()} units reserved`} accent="bg-sky-100 text-sky-700" icon="inventory" />
      </div>

      <div className="grid gap-5 lg:grid-cols-3">
        <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm lg:col-span-2">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="font-bold text-ink">Revenue by month</h2>
            <span className="text-xs font-medium text-slate-400">CAD, rentals + retail</span>
          </div>
          <VBarChart data={revenueByMonth.map((r) => ({ label: r.month, value: r.revenue }))} format={(n) => `$${Math.round(n / 1000)}k`} />
          <p className="mt-3 text-xs text-slate-500">
            December is pacing ahead of last year thanks to holiday parties already on the books. Peak season runs June–September.
          </p>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <h2 className="mb-3 font-bold text-ink">Low-stock alerts</h2>
          <ul className="space-y-2.5">
            {lowStock.map((i) => (
              <li key={i.id}>
                <button onClick={() => go('inventory')} className="flex w-full items-center justify-between gap-2 rounded-xl px-2 py-2 text-left hover:bg-cream">
                  <span className="min-w-0">
                    <span className="block truncate text-sm font-medium text-ink">{i.name}</span>
                    <span className="text-xs text-slate-500">{i.location}</span>
                  </span>
                  <Badge tone="red">
                    {available(i)} / {i.stock} left
                  </Badge>
                </button>
              </li>
            ))}
          </ul>
          <button onClick={() => go('inventory')} className="mt-3 text-sm font-semibold text-coral hover:underline">
            Open inventory →
          </button>
        </section>
      </div>

      <div className="grid gap-5 lg:grid-cols-3">
        <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm lg:col-span-2">
          <div className="mb-2 flex items-center justify-between">
            <h2 className="font-bold text-ink">Upcoming deliveries &amp; pickups</h2>
            <button onClick={() => go('orders')} className="text-sm font-semibold text-coral hover:underline">
              All orders →
            </button>
          </div>
          <ul className="divide-y divide-slate-100">
            {upcoming.map((o: Order) => (
              <li key={o.id}>
                <button onClick={() => go('orders', o.id)} className="flex w-full items-center gap-3 py-2.5 text-left hover:bg-cream/60 rounded-lg px-1">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-mint text-teal-dark">
                    <Icon name="truck" size={19} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-semibold text-ink">
                      {o.customer} — {o.venue}
                    </span>
                    <span className="text-xs text-slate-500">
                      {o.eventDate} · {o.location} · {o.lines.reduce((s, l) => s + l.qty, 0)} items
                    </span>
                  </span>
                  <span className={`hidden shrink-0 rounded-full border px-2 py-0.5 text-xs font-semibold sm:inline ${STATUS_COLORS[o.status]}`}>
                    {o.status}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <h2 className="mb-3 font-bold text-ink">Recent activity</h2>
          <ul className="space-y-3">
            {activity.slice(0, 6).map((a) => (
              <li key={a.id} className="flex gap-2.5 text-sm">
                <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-coral" />
                <span>
                  <span className="text-slate-700">{a.text}</span>
                  <span className="block text-xs text-slate-400">{a.time}</span>
                </span>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <h2 className="mb-3 font-bold text-ink">Revenue by category — November</h2>
        <HBarList data={revenueByCategory} format={(n) => money(n)} />
      </section>
    </div>
  )
}
