import { useEffect, useMemo, useState } from 'react'
import {
  customers,
  money,
  orderSubtotal,
  orderTax,
  orderTotal,
  rentalItems,
  STATUS_COLORS,
  STATUS_FLOW,
  type Order,
  type OrderStatus,
  type SettingsState,
} from '../data'
import { Badge, Field, GhostButton, Icon, inputCls, Modal, PrimaryButton } from '../components/ui'

const ALL_STATUSES: Array<OrderStatus | 'All'> = ['All', ...STATUS_FLOW, 'Cancelled']

export default function Orders({
  orders,
  onChange,
  notify,
  settings,
  focusOrderId,
}: {
  orders: Order[]
  onChange: (orders: Order[]) => void
  notify: (msg: string) => void
  settings: SettingsState
  focusOrderId: string | null
}) {
  const [filter, setFilter] = useState<OrderStatus | 'All'>('All')
  const [q, setQ] = useState('')
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [showNew, setShowNew] = useState(false)
  const [newCustomer, setNewCustomer] = useState(customers[0].name)
  const [newDate, setNewDate] = useState('2026-12-11')
  const [newVenue, setNewVenue] = useState('')
  const [newLocation, setNewLocation] = useState<'Campbell River' | 'Comox'>('Comox')
  const [lineItem, setLineItem] = useState(rentalItems[0].id)
  const [lineQty, setLineQty] = useState(1)
  const [lineDays, setLineDays] = useState(4)

  useEffect(() => {
    if (focusOrderId) setSelectedId(focusOrderId)
  }, [focusOrderId])

  const filtered = useMemo(
    () =>
      orders.filter(
        (o) =>
          (filter === 'All' || o.status === filter) &&
          (q.trim() === '' || `${o.id} ${o.customer} ${o.venue}`.toLowerCase().includes(q.toLowerCase())),
      ),
    [orders, filter, q],
  )

  const selected = orders.find((o) => o.id === selectedId) ?? null

  function update(order: Order, patch: Partial<Order>, msg?: string) {
    onChange(orders.map((o) => (o.id === order.id ? { ...o, ...patch } : o)))
    if (msg) notify(msg)
  }

  function advance(order: Order) {
    const idx = STATUS_FLOW.indexOf(order.status)
    if (idx >= 0 && idx < STATUS_FLOW.length - 1) {
      update(order, { status: STATUS_FLOW[idx + 1] }, `${order.id} moved to “${STATUS_FLOW[idx + 1]}”`)
    }
  }

  function createOrder() {
    const id = `Q-${2424 + orders.length}`
    const customer = customers.find((c) => c.name === newCustomer) ?? customers[0]
    const order: Order = {
      id,
      customer: customer.name,
      customerId: customer.id,
      eventDate: new Date(`${newDate}T12:00:00`).toLocaleDateString('en-CA', { month: 'short', day: 'numeric', year: 'numeric' }),
      venue: newVenue || 'To be confirmed',
      location: newLocation,
      lines: [],
      deposit: 0,
      depositPaid: false,
      status: 'Requested',
      kind: 'Rental',
      notes: 'New web quote request.',
      created: 'Nov 25, 2026',
    }
    onChange([order, ...orders])
    setShowNew(false)
    setSelectedId(id)
    notify(`${id} created — add items in the detail view`)
  }

  function addLine(order: Order) {
    const item = rentalItems.find((i) => i.id === lineItem)
    if (!item) return
    update(order, {
      lines: [...order.lines, { itemId: item.id, name: item.name, qty: lineQty, rate: item.dailyRate, days: lineDays }],
    }, `Added ${lineQty} × ${item.name}`)
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold text-ink sm:text-2xl">Quotes &amp; Orders</h1>
          <p className="text-sm text-slate-500">Rentals run Friday–Monday (4-day minimum). Quotes become orders on confirmation.</p>
        </div>
        <PrimaryButton onClick={() => setShowNew(true)}>
          <Icon name="plus" size={16} /> New quote
        </PrimaryButton>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        {ALL_STATUSES.map((s) => {
          const count = s === 'All' ? orders.length : orders.filter((o) => o.status === s).length
          return (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`rounded-full border px-3 py-1.5 text-sm font-medium transition ${
                filter === s ? 'border-coral bg-coral text-white' : 'border-slate-300 bg-white text-slate-600 hover:bg-slate-50'
              }`}
            >
              {s} <span className="opacity-70">({count})</span>
            </button>
          )
        })}
        <div className="relative ml-auto w-full sm:w-64">
          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
            <Icon name="search" size={17} />
          </span>
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search quotes…" className={`${inputCls} pl-9`} />
        </div>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
        <table className="w-full min-w-[820px] text-left text-sm">
          <thead>
            <tr className="border-b border-slate-100 text-xs uppercase tracking-wide text-slate-400">
              <th className="px-4 py-3 font-semibold">Quote</th>
              <th className="px-4 py-3 font-semibold">Customer</th>
              <th className="px-4 py-3 font-semibold">Event date</th>
              <th className="px-4 py-3 font-semibold">Venue</th>
              <th className="px-4 py-3 font-semibold">Total (incl. tax)</th>
              <th className="px-4 py-3 font-semibold">Deposit</th>
              <th className="px-4 py-3 font-semibold">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {filtered.map((o) => (
              <tr key={o.id} onClick={() => setSelectedId(o.id)} className="cursor-pointer hover:bg-cream/60">
                <td className="px-4 py-2.5 font-semibold text-ink">{o.id}</td>
                <td className="px-4 py-2.5">{o.customer}</td>
                <td className="px-4 py-2.5 text-slate-600">{o.eventDate}</td>
                <td className="max-w-56 truncate px-4 py-2.5 text-slate-600">{o.venue}</td>
                <td className="px-4 py-2.5 font-medium">{money(orderTotal(o, settings))}</td>
                <td className="px-4 py-2.5">
                  <Badge tone={o.depositPaid ? 'green' : 'amber'}>{o.depositPaid ? `Paid ${money(o.deposit)}` : `${money(o.deposit)} due`}</Badge>
                </td>
                <td className="px-4 py-2.5">
                  <span className={`rounded-full border px-2 py-0.5 text-xs font-semibold ${STATUS_COLORS[o.status]}`}>{o.status}</span>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={7} className="px-4 py-10 text-center text-slate-400">
                  No quotes in this status.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {selected && (
        <Modal title={`${selected.id} — ${selected.customer}`} onClose={() => setSelectedId(null)} wide>
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className={`rounded-full border px-2.5 py-1 text-xs font-semibold ${STATUS_COLORS[selected.status]}`}>{selected.status}</span>
              <Badge tone="sky">{selected.location}</Badge>
              <span className="text-sm text-slate-500">
                {selected.eventDate} · {selected.venue} · requested {selected.created}
              </span>
            </div>
            <p className="rounded-xl bg-cream px-3 py-2 text-sm text-slate-600">{selected.notes}</p>

            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-slate-100 text-xs uppercase tracking-wide text-slate-400">
                  <th className="py-2 font-semibold">Item</th>
                  <th className="py-2 font-semibold">Qty</th>
                  <th className="py-2 font-semibold">Rate</th>
                  <th className="py-2 font-semibold">Days</th>
                  <th className="py-2 text-right font-semibold">Line total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {selected.lines.map((l, i) => (
                  <tr key={i}>
                    <td className="py-2">{l.name}</td>
                    <td className="py-2">{l.qty}</td>
                    <td className="py-2">{money(l.rate)}</td>
                    <td className="py-2">{l.days}</td>
                    <td className="py-2 text-right font-medium">{money(l.qty * l.rate * l.days)}</td>
                  </tr>
                ))}
                {selected.lines.length === 0 && (
                  <tr>
                    <td colSpan={5} className="py-4 text-center text-slate-400">
                      No items yet — add the first one below.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>

            <div className="flex flex-wrap items-end gap-2 rounded-xl bg-slate-50 p-3">
              <div className="min-w-44 flex-1">
                <Field label="Add rental item">
                  <select value={lineItem} onChange={(e) => setLineItem(e.target.value)} className={inputCls}>
                    {rentalItems.map((i) => (
                      <option key={i.id} value={i.id}>
                        {i.name} — {money(i.dailyRate)}/day
                      </option>
                    ))}
                  </select>
                </Field>
              </div>
              <div className="w-20">
                <Field label="Qty">
                  <input type="number" min={1} value={lineQty} onChange={(e) => setLineQty(Number(e.target.value))} className={inputCls} />
                </Field>
              </div>
              <div className="w-20">
                <Field label="Days">
                  <input type="number" min={1} value={lineDays} onChange={(e) => setLineDays(Number(e.target.value))} className={inputCls} />
                </Field>
              </div>
              <GhostButton onClick={() => addLine(selected)}>Add item</GhostButton>
            </div>

            <div className="space-y-1 border-t border-slate-100 pt-3 text-sm">
              <div className="flex justify-between text-slate-600">
                <span>Subtotal</span>
                <span>{money(orderSubtotal(selected))}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Tax (GST {settings.gst}% + PST {settings.pst}%)</span>
                <span>{money(orderTax(selected, settings))}</span>
              </div>
              <div className="flex justify-between font-bold text-ink">
                <span>Total</span>
                <span>{money(orderTotal(selected, settings))}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Deposit ({settings.depositPct}%)</span>
                <span>
                  {money(selected.deposit)} — {selected.depositPaid ? 'paid' : 'unpaid'}
                </span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 pt-1">
              {selected.status === 'Requested' && (
                <PrimaryButton onClick={() => update(selected, { status: 'Confirmed' }, `${selected.id} confirmed — quote converted to order`)}>
                  <Icon name="check" size={16} /> Confirm order
                </PrimaryButton>
              )}
              {STATUS_FLOW.includes(selected.status) && selected.status !== 'Completed' && (
                <GhostButton onClick={() => advance(selected)}>Advance to next stage →</GhostButton>
              )}
              <GhostButton onClick={() => update(selected, { depositPaid: !selected.depositPaid }, selected.depositPaid ? 'Deposit marked unpaid' : `Deposit ${money(selected.deposit)} marked paid`)}>
                {selected.depositPaid ? 'Mark deposit unpaid' : 'Mark deposit paid'}
              </GhostButton>
              {selected.status !== 'Cancelled' && selected.status !== 'Completed' && (
                <GhostButton danger onClick={() => update(selected, { status: 'Cancelled' }, `${selected.id} cancelled`)}>
                  Cancel order
                </GhostButton>
              )}
            </div>
          </div>
        </Modal>
      )}

      {showNew && (
        <Modal title="New quote" onClose={() => setShowNew(false)}>
          <form
            onSubmit={(e) => { e.preventDefault(); createOrder() }}
            className="space-y-3"
          >
            <Field label="Customer">
              <select value={newCustomer} onChange={(e) => setNewCustomer(e.target.value)} className={inputCls}>
                {customers.map((c) => (
                  <option key={c.id}>{c.name}</option>
                ))}
              </select>
            </Field>
            <Field label="Event date">
              <input type="date" value={newDate} onChange={(e) => setNewDate(e.target.value)} className={inputCls} />
            </Field>
            <Field label="Venue">
              <input value={newVenue} onChange={(e) => setNewVenue(e.target.value)} className={inputCls} placeholder="e.g. Filberg Park — Comox" />
            </Field>
            <Field label="Pickup / delivery location">
              <select value={newLocation} onChange={(e) => setNewLocation(e.target.value as 'Campbell River' | 'Comox')} className={inputCls}>
                <option>Campbell River</option>
                <option>Comox</option>
              </select>
            </Field>
            <div className="flex justify-end gap-2 pt-1">
              <GhostButton onClick={() => setShowNew(false)}>Cancel</GhostButton>
              <PrimaryButton type="submit">Create quote</PrimaryButton>
            </div>
          </form>
        </Modal>
      )}
    </div>
  )
}
