import { useMemo, useState } from 'react'
import { available, money, RENTAL_CATEGORIES, type Location, type RentalItem } from '../data'
import { Badge, Field, GhostButton, Icon, inputCls, Modal, PrimaryButton } from '../components/ui'

type Draft = Omit<RentalItem, 'id' | 'sku'>

const EMPTY: Draft = {
  name: '',
  category: 'Tables',
  dailyRate: 10,
  stock: 10,
  reserved: 0,
  condition: 'Good',
  location: 'Both',
}

function dayAvailability(item: RentalItem, offset: number): { label: string; free: number; tone: string } {
  const base = new Date(2026, 10, 25 + offset)
  const label = base.toLocaleDateString('en-CA', { weekday: 'short', day: 'numeric' })
  const weekend = base.getDay() === 0 || base.getDay() === 6
  // Deterministic pseudo-variation so the strip looks realistic and stable.
  let hash = 0
  const key = item.id + offset
  for (let i = 0; i < key.length; i++) hash = (hash * 31 + key.charCodeAt(i)) % 97
  const pressure = (weekend ? 0.85 : 0.55) + (hash % 30) / 100
  const booked = Math.min(item.stock, Math.round(item.reserved * pressure + (hash % 3)))
  const free = Math.max(0, item.stock - booked)
  const ratio = item.stock === 0 ? 0 : free / item.stock
  const tone = ratio > 0.4 ? 'bg-emerald-100 text-emerald-800 border-emerald-200' : ratio > 0.15 ? 'bg-amber-100 text-amber-800 border-amber-200' : 'bg-rose-100 text-rose-800 border-rose-200'
  return { label, free, tone }
}

export default function Inventory({
  items,
  onChange,
  notify,
}: {
  items: RentalItem[]
  onChange: (items: RentalItem[]) => void
  notify: (msg: string) => void
}) {
  const [q, setQ] = useState('')
  const [cat, setCat] = useState('All')
  const [loc, setLoc] = useState('All')
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [editing, setEditing] = useState<RentalItem | null>(null)
  const [adding, setAdding] = useState(false)
  const [draft, setDraft] = useState<Draft>(EMPTY)

  const filtered = useMemo(
    () =>
      items.filter(
        (i) =>
          (cat === 'All' || i.category === cat) &&
          (loc === 'All' || i.location === loc || i.location === 'Both') &&
          (q.trim() === '' || `${i.name} ${i.sku} ${i.category}`.toLowerCase().includes(q.toLowerCase())),
      ),
    [items, q, cat, loc],
  )

  const selected = items.find((i) => i.id === selectedId) ?? null

  function saveDraft() {
    if (!draft.name.trim()) {
      notify('Give the item a name first')
      return
    }
    if (editing) {
      onChange(items.map((i) => (i.id === editing.id ? { ...editing, ...draft } : i)))
      notify(`Updated “${draft.name}”`)
      setEditing(null)
    } else {
      const id = `r${Date.now().toString().slice(-4)}`
      onChange([...items, { ...draft, id, sku: `NEW-${id.toUpperCase()}` }])
      notify(`Added “${draft.name}” to inventory`)
      setAdding(false)
    }
    setDraft(EMPTY)
  }

  function openEdit(item: RentalItem) {
    setDraft({ name: item.name, category: item.category, dailyRate: item.dailyRate, stock: item.stock, reserved: item.reserved, condition: item.condition, location: item.location })
    setEditing(item)
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold text-ink sm:text-2xl">Inventory</h1>
          <p className="text-sm text-slate-500">{items.length} rental items across Campbell River &amp; Comox.</p>
        </div>
        <PrimaryButton onClick={() => { setDraft(EMPTY); setAdding(true) }}>
          <Icon name="plus" size={16} /> Add item
        </PrimaryButton>
      </div>

      <div className="flex flex-wrap gap-2">
        <div className="relative min-w-52 flex-1 sm:max-w-xs">
          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
            <Icon name="search" size={17} />
          </span>
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search items or SKUs…" className={`${inputCls} pl-9`} />
        </div>
        <select value={cat} onChange={(e) => setCat(e.target.value)} className={`${inputCls} w-auto`} aria-label="Category">
          <option>All</option>
          {RENTAL_CATEGORIES.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
        <select value={loc} onChange={(e) => setLoc(e.target.value)} className={`${inputCls} w-auto`} aria-label="Location">
          <option>All</option>
          <option>Campbell River</option>
          <option>Comox</option>
        </select>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
        <table className="w-full min-w-[560px] text-left text-sm">
          <thead>
            <tr className="border-b border-slate-100 text-xs uppercase tracking-wide text-slate-400">
              <th className="px-4 py-3 font-semibold">Item</th>
              <th className="hidden px-4 py-3 font-semibold md:table-cell">Category</th>
              <th className="px-4 py-3 font-semibold">Rate / day</th>
              <th className="px-4 py-3 font-semibold">Stock</th>
              <th className="px-4 py-3 font-semibold">Available</th>
              <th className="hidden px-4 py-3 font-semibold lg:table-cell">Condition</th>
              <th className="hidden px-4 py-3 font-semibold md:table-cell">Location</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {filtered.map((i) => {
              const free = available(i)
              const low = free / i.stock < 0.25
              return (
                <tr key={i.id} onClick={() => setSelectedId(i.id)} className={`cursor-pointer hover:bg-cream/60 ${selectedId === i.id ? 'bg-blush/50' : ''}`}>
                  <td className="px-4 py-2.5">
                    <span className="block font-medium text-ink">{i.name}</span>
                    <span className="text-xs text-slate-400">{i.sku}</span>
                  </td>
                  <td className="hidden px-4 py-2.5 text-slate-600 md:table-cell">{i.category}</td>
                  <td className="px-4 py-2.5 font-medium">{money(i.dailyRate)}</td>
                  <td className="px-4 py-2.5">{i.stock}</td>
                  <td className="px-4 py-2.5">
                    <Badge tone={low ? 'red' : free / i.stock < 0.5 ? 'amber' : 'green'}>
                      {free} free · {i.reserved} reserved
                    </Badge>
                  </td>
                  <td className="hidden px-4 py-2.5 text-slate-600 lg:table-cell">{i.condition}</td>
                  <td className="hidden px-4 py-2.5 text-slate-600 md:table-cell">{i.location}</td>
                  <td className="px-4 py-2.5">
                    <button
                      onClick={(e) => { e.stopPropagation(); openEdit(i) }}
                      className="rounded-lg px-3 py-2 text-xs font-semibold text-coral hover:bg-blush"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              )
            })}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={8} className="px-4 py-10 text-center text-slate-400">
                  No items match your filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {selected && (
        <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h2 className="font-bold text-ink">{selected.name}</h2>
              <p className="text-sm text-slate-500">
                {selected.sku} · {selected.category} · {money(selected.dailyRate)}/day · {selected.location} · Condition: {selected.condition}
              </p>
            </div>
            <GhostButton onClick={() => openEdit(selected)}>Edit item</GhostButton>
          </div>
          <p className="mb-2 mt-4 text-sm font-semibold text-slate-700">Availability — next 14 days (units free)</p>
          <div className="flex gap-1.5 overflow-x-auto pb-1">
            {Array.from({ length: 14 }, (_, d) => dayAvailability(selected, d)).map((day) => (
              <div key={day.label} className={`min-w-[64px] flex-1 shrink-0 rounded-lg border px-1 py-2 text-center ${day.tone}`}>
                <span className="block text-[11px] font-semibold">{day.label}</span>
                <span className="block text-sm font-bold">{day.free}</span>
              </div>
            ))}
          </div>
          <p className="mt-2 text-xs text-slate-400">Weekends run tighter — the marquee tent and dance floor usually book out 3–4 weeks ahead in summer.</p>
        </section>
      )}

      {(editing || adding) && (
        <Modal title={editing ? `Edit — ${editing.name}` : 'Add rental item'} onClose={() => { setEditing(null); setAdding(false) }}>
          <form
            onSubmit={(e) => { e.preventDefault(); saveDraft() }}
            className="space-y-3"
          >
            <Field label="Item name">
              <input value={draft.name} onChange={(e) => setDraft({ ...draft, name: e.target.value })} className={inputCls} placeholder="e.g. 20' × 20' Frame Tent" />
            </Field>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <Field label="Category">
                <select value={draft.category} onChange={(e) => setDraft({ ...draft, category: e.target.value })} className={inputCls}>
                  {RENTAL_CATEGORIES.map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </select>
              </Field>
              <Field label="Location">
                <select value={draft.location} onChange={(e) => setDraft({ ...draft, location: e.target.value as Location })} className={inputCls}>
                  <option>Campbell River</option>
                  <option>Comox</option>
                  <option>Both</option>
                </select>
              </Field>
              <Field label="Daily rate (CAD)">
                <input type="number" min={0} step="0.25" value={draft.dailyRate} onChange={(e) => setDraft({ ...draft, dailyRate: Number(e.target.value) })} className={inputCls} />
              </Field>
              <Field label="Condition">
                <select value={draft.condition} onChange={(e) => setDraft({ ...draft, condition: e.target.value as RentalItem['condition'] })} className={inputCls}>
                  <option>Excellent</option>
                  <option>Good</option>
                  <option>Fair</option>
                </select>
              </Field>
              <Field label="Total stock">
                <input type="number" min={0} value={draft.stock} onChange={(e) => setDraft({ ...draft, stock: Number(e.target.value) })} className={inputCls} />
              </Field>
              <Field label="Currently reserved">
                <input type="number" min={0} value={draft.reserved} onChange={(e) => setDraft({ ...draft, reserved: Number(e.target.value) })} className={inputCls} />
              </Field>
            </div>
            <div className="flex flex-col-reverse gap-2 pt-1 sm:flex-row sm:justify-end">
              <GhostButton onClick={() => { setEditing(null); setAdding(false) }} className="w-full sm:w-auto">Cancel</GhostButton>
              <PrimaryButton type="submit" className="w-full sm:w-auto">{editing ? 'Save changes' : 'Add item'}</PrimaryButton>
            </div>
          </form>
        </Modal>
      )}
    </div>
  )
}
