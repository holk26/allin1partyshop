import { useMemo, useState } from 'react'
import { money, type SaleProduct } from '../data'
import { Badge, Field, GhostButton, Icon, inputCls, Modal, PrimaryButton } from '../components/ui'

export default function Sales({
  products,
  onChange,
  notify,
}: {
  products: SaleProduct[]
  onChange: (p: SaleProduct[]) => void
  notify: (msg: string) => void
}) {
  const [q, setQ] = useState('')
  const [cat, setCat] = useState('All')
  const [clearanceOnly, setClearanceOnly] = useState(false)
  const [editing, setEditing] = useState<SaleProduct | null>(null)
  const [adding, setAdding] = useState(false)
  const [draft, setDraft] = useState({ name: '', category: 'Balloons', price: 9.99, compareAt: 0, stock: 10, clearance: false })

  const cats = useMemo(() => ['All', ...Array.from(new Set(products.map((p) => p.category)))], [products])
  const filtered = products.filter(
    (p) =>
      (cat === 'All' || p.category === cat) &&
      (!clearanceOnly || p.clearance) &&
      (q.trim() === '' || p.name.toLowerCase().includes(q.toLowerCase())),
  )
  const monthRevenue = products.reduce((s, p) => s + p.sold * p.price, 0)

  function save() {
    if (!draft.name.trim()) {
      notify('Give the product a name first')
      return
    }
    if (editing) {
      onChange(products.map((p) => (p.id === editing.id ? { ...editing, ...draft, compareAt: draft.compareAt || undefined } : p)))
      notify(`Updated “${draft.name}”`)
      setEditing(null)
    } else {
      const id = `s${Date.now().toString().slice(-4)}`
      onChange([...products, { ...draft, id, compareAt: draft.compareAt || undefined, sold: 0 }])
      notify(`Added “${draft.name}” to retail`)
      setAdding(false)
    }
    setDraft({ name: '', category: 'Balloons', price: 9.99, compareAt: 0, stock: 10, clearance: false })
  }

  function markSold(p: SaleProduct) {
    if (p.stock <= 0) {
      notify(`“${p.name}” is out of stock`)
      return
    }
    onChange(products.map((x) => (x.id === p.id ? { ...x, stock: x.stock - 1, sold: x.sold + 1 } : x)))
    notify(`Recorded sale — ${p.name} (${money(p.price)})`)
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold text-ink sm:text-2xl">Retail Sales</h1>
          <p className="text-sm text-slate-500">Balloons, birthday &amp; wedding supplies sold in the showrooms.</p>
        </div>
        <PrimaryButton onClick={() => setAdding(true)}>
          <Icon name="plus" size={16} /> Add product
        </PrimaryButton>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <p className="text-sm text-slate-500">Retail revenue (all time, demo)</p>
          <p className="text-xl font-bold text-ink">{money(monthRevenue)}</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <p className="text-sm text-slate-500">Units sold</p>
          <p className="text-xl font-bold text-ink">{products.reduce((s, p) => s + p.sold, 0).toLocaleString()}</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <p className="text-sm text-slate-500">Clearance lines</p>
          <p className="text-xl font-bold text-ink">{products.filter((p) => p.clearance).length}</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <div className="relative min-w-52 flex-1 sm:max-w-xs">
          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
            <Icon name="search" size={17} />
          </span>
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search products…" className={`${inputCls} pl-9`} />
        </div>
        {cats.map((c) => (
          <button
            key={c}
            onClick={() => setCat(c)}
            className={`rounded-full border px-3 py-2 text-sm font-medium ${cat === c ? 'border-coral bg-coral text-white' : 'border-slate-300 bg-white text-slate-600 hover:bg-slate-50'}`}
          >
            {c}
          </button>
        ))}
        <button
          onClick={() => setClearanceOnly(!clearanceOnly)}
          className={`rounded-full border px-3 py-2 text-sm font-medium ${clearanceOnly ? 'border-rose-400 bg-rose-100 text-rose-800' : 'border-slate-300 bg-white text-slate-600 hover:bg-slate-50'}`}
        >
          Clearance only
        </button>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
        <table className="w-full min-w-[560px] text-left text-sm">
          <thead>
            <tr className="border-b border-slate-100 text-xs uppercase tracking-wide text-slate-400">
              <th className="px-4 py-3 font-semibold">Product</th>
              <th className="hidden px-4 py-3 font-semibold md:table-cell">Category</th>
              <th className="px-4 py-3 font-semibold">Price</th>
              <th className="px-4 py-3 font-semibold">Stock</th>
              <th className="hidden px-4 py-3 font-semibold md:table-cell">Sold</th>
              <th className="px-4 py-3 font-semibold">Flags</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {filtered.map((p) => (
              <tr key={p.id} className="hover:bg-cream/60">
                <td className="px-4 py-2.5 font-medium text-ink">{p.name}</td>
                <td className="hidden px-4 py-2.5 text-slate-600 md:table-cell">{p.category}</td>
                <td className="px-4 py-2.5">
                  <span className="font-medium">{money(p.price)}</span>
                  {p.compareAt && <span className="ml-2 text-xs text-slate-400 line-through">{money(p.compareAt)}</span>}
                </td>
                <td className="px-4 py-2.5">
                  <Badge tone={p.stock < 20 ? 'red' : 'green'}>{p.stock} on hand</Badge>
                </td>
                <td className="hidden px-4 py-2.5 md:table-cell">{p.sold}</td>
                <td className="px-4 py-2.5">{p.clearance && <Badge tone="rose">Clearance</Badge>}</td>
                <td className="whitespace-nowrap px-4 py-2.5">
                  <button onClick={() => markSold(p)} className="rounded-lg px-3 py-2 text-xs font-semibold text-teal-dark hover:bg-mint">
                    Record sale
                  </button>
                  <button
                    onClick={() => { setDraft({ name: p.name, category: p.category, price: p.price, compareAt: p.compareAt ?? 0, stock: p.stock, clearance: p.clearance }); setEditing(p) }}
                    className="rounded-lg px-3 py-2 text-xs font-semibold text-coral hover:bg-blush"
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={7} className="px-4 py-10 text-center text-slate-400">
                  No products match your filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {(editing || adding) && (
        <Modal title={editing ? `Edit — ${editing.name}` : 'Add retail product'} onClose={() => { setEditing(null); setAdding(false) }}>
          <form
            onSubmit={(e) => { e.preventDefault(); save() }}
            className="space-y-3"
          >
            <Field label="Product name">
              <input value={draft.name} onChange={(e) => setDraft({ ...draft, name: e.target.value })} className={inputCls} />
            </Field>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <Field label="Category">
                <select value={draft.category} onChange={(e) => setDraft({ ...draft, category: e.target.value })} className={inputCls}>
                  <option>Balloons</option>
                  <option>Birthday</option>
                  <option>Wedding</option>
                  <option>Clearance</option>
                </select>
              </Field>
              <Field label="Price (CAD)">
                <input type="number" min={0} step="0.01" value={draft.price} onChange={(e) => setDraft({ ...draft, price: Number(e.target.value) })} className={inputCls} />
              </Field>
              <Field label="Compare-at price (optional)">
                <input type="number" min={0} step="0.01" value={draft.compareAt} onChange={(e) => setDraft({ ...draft, compareAt: Number(e.target.value) })} className={inputCls} />
              </Field>
              <Field label="Stock on hand">
                <input type="number" min={0} value={draft.stock} onChange={(e) => setDraft({ ...draft, stock: Number(e.target.value) })} className={inputCls} />
              </Field>
            </div>
            <label className="flex items-center gap-2 text-sm font-medium text-slate-700">
              <input type="checkbox" checked={draft.clearance} onChange={(e) => setDraft({ ...draft, clearance: e.target.checked })} className="h-4 w-4 accent-rose-500" />
              Mark as clearance item
            </label>
            <div className="flex flex-col-reverse gap-2 pt-1 sm:flex-row sm:justify-end">
              <GhostButton onClick={() => { setEditing(null); setAdding(false) }} className="w-full sm:w-auto">Cancel</GhostButton>
              <PrimaryButton type="submit" className="w-full sm:w-auto">{editing ? 'Save changes' : 'Add product'}</PrimaryButton>
            </div>
          </form>
        </Modal>
      )}
    </div>
  )
}
