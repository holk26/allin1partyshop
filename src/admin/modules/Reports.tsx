import { useMemo } from 'react'
import { available, money, rentalItems, type Order, type SettingsState } from '../data'
import { HBarList, StatCard } from '../components/ui'
import { orderSubtotal } from '../data'

const BAR_COLORS = ['bg-coral', 'bg-sun', 'bg-teal', 'bg-sky-400', 'bg-violet-400', 'bg-emerald-400', 'bg-rose-300']

export default function Reports({ ordersList, settings }: { ordersList: Order[]; settings: SettingsState }) {
  const active = ordersList.filter((o) => o.status !== 'Cancelled')

  // One shared category list for both columns: same rows, same order, same
  // color per category, so the two panels read as a single integrated view
  // instead of two unrelated lists.
  const categories = useMemo(() => {
    const byCat = new Map<string, { stock: number; reserved: number }>()
    for (const item of rentalItems) {
      const cur = byCat.get(item.category) ?? { stock: 0, reserved: 0 }
      cur.stock += item.stock
      cur.reserved += item.reserved
      byCat.set(item.category, cur)
    }
    const revenue = new Map<string, number>()
    for (const o of active) {
      for (const l of o.lines) {
        const item = rentalItems.find((i) => i.id === l.itemId)
        const cat = item?.category ?? 'Retail'
        revenue.set(cat, (revenue.get(cat) ?? 0) + l.qty * l.rate * l.days)
      }
    }
    const pct = (label: string) => {
      const v = byCat.get(label)
      return !v || v.stock === 0 ? 0 : Math.round((v.reserved / v.stock) * 100)
    }
    const labels = [...new Set([...byCat.keys(), ...revenue.keys()])]
    labels.sort((a, b) => (revenue.get(b) ?? 0) - (revenue.get(a) ?? 0) || pct(b) - pct(a) || a.localeCompare(b))
    return labels.map((label, i) => ({
      label,
      color: BAR_COLORS[i % BAR_COLORS.length],
      utilization: pct(label),
      revenue: revenue.get(label) ?? 0,
    }))
  }, [active])

  const utilization = categories.map((c) => ({ label: c.label, value: c.utilization, color: c.color }))
  const revenueByCat = categories.map((c) => ({ label: c.label, value: c.revenue, color: c.color }))

  const topItems = useMemo(() => {
    const tally = new Map<string, { name: string; qty: number; revenue: number }>()
    for (const o of active) {
      for (const l of o.lines) {
        const cur = tally.get(l.name) ?? { name: l.name, qty: 0, revenue: 0 }
        cur.qty += l.qty
        cur.revenue += l.qty * l.rate * l.days
        tally.set(l.name, cur)
      }
    }
    return [...tally.values()].sort((a, b) => b.revenue - a.revenue).slice(0, 8)
  }, [active])

  const totalRevenue = active.reduce((s, o) => s + orderSubtotal(o), 0)
  const avgOrder = active.length === 0 ? 0 : totalRevenue / active.length
  const lowAvail = rentalItems.filter((i) => available(i) / i.stock < 0.25).length

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-xl font-bold text-ink sm:text-2xl">Reports</h1>
        <p className="text-sm text-slate-500">Utilization, revenue mix and top performers for the current demo window (all non-cancelled quotes &amp; orders).</p>
      </div>

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <StatCard label="Booked revenue (pre-tax)" value={money(totalRevenue)} sub={`${active.length} active quotes & orders`} accent="bg-blush text-coral" icon="finance" />
        <StatCard label="Average order value" value={money(avgOrder)} sub="Pre-tax, rentals" accent="bg-mint text-teal-dark" icon="orders" />
        <StatCard label="Items with low availability" value={String(lowAvail)} sub="Under 25% free" accent="bg-amber-100 text-amber-700" icon="alert" />
        <StatCard label="Tax collected (est.)" value={money((totalRevenue * (settings.gst + settings.pst)) / 100)} sub={`GST ${settings.gst}% + PST ${settings.pst}%`} accent="bg-sky-100 text-sky-700" icon="reports" />
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        <section className="min-w-0 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <h2 className="mb-3 font-bold text-ink">Fleet utilization by category</h2>
          <p className="mb-3 text-xs text-slate-400">Share of units reserved across the current booking window.</p>
          <HBarList data={utilization} format={(n) => `${n}%`} />
        </section>
        <section className="min-w-0 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <h2 className="mb-3 font-bold text-ink">Revenue by category</h2>
          <p className="mb-3 text-xs text-slate-400">Pre-tax rental revenue from active quotes &amp; orders.</p>
          <HBarList data={revenueByCat} format={(n) => money(n)} />
        </section>
      </div>

      <section className="min-w-0 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <h2 className="mb-3 font-bold text-ink">Top rented items</h2>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[520px] text-left text-sm">
            <thead>
              <tr className="border-b border-slate-100 text-xs uppercase tracking-wide text-slate-400">
                <th className="py-2 pr-4 font-semibold">#</th>
                <th className="py-2 pr-4 font-semibold">Item</th>
                <th className="py-2 pr-4 font-semibold">Units booked</th>
                <th className="py-2 text-right font-semibold">Revenue</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {topItems.map((t, i) => (
                <tr key={t.name}>
                  <td className="py-2 pr-4 text-slate-400">{i + 1}</td>
                  <td className="py-2 pr-4 font-medium text-ink">{t.name}</td>
                  <td className="py-2 pr-4">{t.qty}</td>
                  <td className="py-2 text-right font-medium">{money(t.revenue)}</td>
                </tr>
              ))}
              {topItems.length === 0 && (
                <tr>
                  <td colSpan={4} className="py-8 text-center text-slate-400">
                    No rental lines yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}
