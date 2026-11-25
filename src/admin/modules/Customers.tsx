import { useMemo, useState } from 'react'
import { money, orders, type Customer, type SettingsState } from '../data'
import { Badge, Icon, inputCls } from '../components/ui'
import { orderTotal } from '../data'

export default function Customers({
  customers,
  ordersList,
  settings,
}: {
  customers: Customer[]
  ordersList: typeof orders
  settings: SettingsState
}) {
  const [q, setQ] = useState('')
  const [selectedId, setSelectedId] = useState<string | null>(null)

  const filtered = useMemo(
    () =>
      customers.filter(
        (c) => q.trim() === '' || `${c.name} ${c.email} ${c.town}`.toLowerCase().includes(q.toLowerCase()),
      ),
    [customers, q],
  )
  const selected = customers.find((c) => c.id === selectedId) ?? null
  const history = selected ? ordersList.filter((o) => o.customerId === selected.id) : []

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-xl font-bold text-ink sm:text-2xl">Customers</h1>
        <p className="text-sm text-slate-500">Repeat clients, corporate accounts and community groups across Vancouver Island.</p>
      </div>

      <div className="relative max-w-sm">
        <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
          <Icon name="search" size={17} />
        </span>
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search name, email or town…" className={`${inputCls} pl-9`} />
      </div>

      <div className="grid gap-5 lg:grid-cols-5">
        <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm lg:col-span-3">
          <table className="w-full min-w-[480px] text-left text-sm">
            <thead>
              <tr className="border-b border-slate-100 text-xs uppercase tracking-wide text-slate-400">
                <th className="px-4 py-3 font-semibold">Customer</th>
                <th className="hidden px-4 py-3 font-semibold md:table-cell">Town</th>
                <th className="hidden px-4 py-3 font-semibold sm:table-cell">Events</th>
                <th className="px-4 py-3 font-semibold">Lifetime value</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filtered.map((c) => (
                <tr key={c.id} onClick={() => setSelectedId(c.id)} className={`cursor-pointer hover:bg-cream/60 ${selectedId === c.id ? 'bg-blush/50' : ''}`}>
                  <td className="px-4 py-2.5">
                    <span className="block font-medium text-ink">{c.name}</span>
                    <span className="text-xs text-slate-400">{c.email}</span>
                  </td>
                  <td className="hidden px-4 py-2.5 text-slate-600 md:table-cell">{c.town}</td>
                  <td className="hidden px-4 py-2.5 sm:table-cell">{c.events}</td>
                  <td className="px-4 py-2.5 font-medium">{money(c.lifetime)}</td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-4 py-10 text-center text-slate-400">
                    No customers match your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm lg:col-span-2">
          {selected ? (
            <div className="space-y-3">
              <div>
                <h2 className="font-bold text-ink">{selected.name}</h2>
                <p className="text-sm text-slate-500">
                  {selected.email} · {selected.phone}
                </p>
                <p className="text-sm text-slate-500">
                  {selected.town} · Last event {selected.lastEvent}
                </p>
              </div>
              <p className="rounded-xl bg-cream px-3 py-2 text-sm text-slate-600">{selected.notes}</p>
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-xl bg-slate-50 p-3">
                  <p className="text-xs text-slate-500">Events</p>
                  <p className="text-lg font-bold">{selected.events}</p>
                </div>
                <div className="rounded-xl bg-slate-50 p-3">
                  <p className="text-xs text-slate-500">Lifetime value</p>
                  <p className="text-lg font-bold">{money(selected.lifetime)}</p>
                </div>
              </div>
              <div>
                <h3 className="mb-2 text-sm font-bold text-ink">Order history</h3>
                {history.length === 0 ? (
                  <p className="text-sm text-slate-400">No orders in this demo window — earlier history lives in the old books.</p>
                ) : (
                  <ul className="space-y-2">
                    {history.map((o) => (
                      <li key={o.id} className="flex items-center justify-between gap-2 text-sm">
                        <span className="min-w-0 flex-1 truncate">
                          <span className="font-semibold">{o.id}</span>
                          <span className="text-slate-500"> · {o.eventDate} · {o.venue}</span>
                        </span>
                        <span className="flex shrink-0 items-center gap-2">
                          <span className="font-medium">{money(orderTotal(o, settings))}</span>
                          <Badge tone={o.status === 'Completed' ? 'green' : o.status === 'Cancelled' ? 'red' : 'sky'}>{o.status}</Badge>
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          ) : (
            <p className="py-8 text-center text-sm text-slate-400">Select a customer to see contact details and order history.</p>
          )}
        </section>
      </div>
    </div>
  )
}
