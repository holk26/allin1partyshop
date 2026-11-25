import { useMemo, useState } from 'react'
import { expenses, money, orders, type Expense, type Invoice, type SettingsState } from '../data'
import { Badge, Field, GhostButton, Icon, inputCls, Modal, PrimaryButton, StatCard } from '../components/ui'

export default function Finance({
  invoices,
  onChange,
  notify,
  settings,
}: {
  invoices: Invoice[]
  onChange: (inv: Invoice[]) => void
  notify: (msg: string) => void
  settings: SettingsState
}) {
  const [filter, setFilter] = useState<'All' | Invoice['status']>('All')
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [showExpense, setShowExpense] = useState(false)
  const [expenseList, setExpenseList] = useState<Expense[]>(expenses)
  const [expDraft, setExpDraft] = useState({ label: '', category: 'Supplies', amount: 50 })

  const filtered = useMemo(() => invoices.filter((i) => filter === 'All' || i.status === filter), [invoices, filter])
  const selected = invoices.find((i) => i.id === selectedId) ?? null

  const collected = invoices.filter((i) => i.status === 'Paid').reduce((s, i) => s + i.amount, 0)
  const outstanding = invoices.filter((i) => i.status !== 'Paid').reduce((s, i) => s + i.amount, 0)
  const overdue = invoices.filter((i) => i.status === 'Overdue').reduce((s, i) => s + i.amount, 0)
  const depositsHeld = orders.filter((o) => o.depositPaid).reduce((s, o) => s + o.deposit, 0)
  const monthExpenses = expenseList.reduce((s, e) => s + e.amount, 0)

  function markPaid(inv: Invoice) {
    onChange(invoices.map((i) => (i.id === inv.id ? { ...i, status: 'Paid' } : i)))
    notify(`${inv.id} marked paid (${money(inv.amount)})`)
  }

  function sendReminder(inv: Invoice) {
    notify(`Reminder sent to ${inv.customer} for ${inv.id}`)
  }

  function addExpense() {
    if (!expDraft.label.trim()) {
      notify('Describe the expense first')
      return
    }
    setExpenseList([
      ...expenseList,
      { id: `e${Date.now().toString().slice(-4)}`, label: expDraft.label, category: expDraft.category, amount: expDraft.amount, date: 'Nov 25, 2026' },
    ])
    setShowExpense(false)
    notify(`Expense recorded — ${expDraft.label} (${money(expDraft.amount)})`)
    setExpDraft({ label: '', category: 'Supplies', amount: 50 })
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold text-ink sm:text-2xl">Finance</h1>
          <p className="text-sm text-slate-500">Invoices, deposits held, payments and expenses. Tax: GST {settings.gst}% + PST {settings.pst}%.</p>
        </div>
        <PrimaryButton onClick={() => setShowExpense(true)}>
          <Icon name="plus" size={16} /> Add expense
        </PrimaryButton>
      </div>

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <StatCard label="Collected (invoices paid)" value={money(collected)} sub="Across all open invoices" accent="bg-mint text-teal-dark" icon="finance" />
        <StatCard label="Outstanding" value={money(outstanding)} sub={`${money(overdue)} overdue`} accent="bg-amber-100 text-amber-700" icon="orders" />
        <StatCard label="Deposits held" value={money(depositsHeld)} sub="Refundable after returns" accent="bg-sky-100 text-sky-700" icon="inventory" />
        <StatCard label="Expenses — November" value={money(monthExpenses)} sub="Fleet, supplies, laundry, marketing" accent="bg-blush text-coral" icon="reports" />
      </div>

      <div className="flex flex-wrap gap-2">
        {(['All', 'Paid', 'Pending', 'Overdue'] as const).map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`rounded-full border px-3 py-1.5 text-sm font-medium ${filter === s ? 'border-coral bg-coral text-white' : 'border-slate-300 bg-white text-slate-600 hover:bg-slate-50'}`}
          >
            {s} ({s === 'All' ? invoices.length : invoices.filter((i) => i.status === s).length})
          </button>
        ))}
      </div>

      <div className="grid gap-5 lg:grid-cols-3">
        <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm lg:col-span-2">
          <table className="w-full min-w-[560px] text-left text-sm">
            <thead>
              <tr className="border-b border-slate-100 text-xs uppercase tracking-wide text-slate-400">
                <th className="px-4 py-3 font-semibold">Invoice</th>
                <th className="px-4 py-3 font-semibold">Customer</th>
                <th className="px-4 py-3 font-semibold">Amount</th>
                <th className="px-4 py-3 font-semibold">Due</th>
                <th className="px-4 py-3 font-semibold">Status</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filtered.map((inv) => (
                <tr key={inv.id} onClick={() => setSelectedId(inv.id)} className="cursor-pointer hover:bg-cream/60">
                  <td className="px-4 py-2.5 font-semibold text-ink">{inv.id}</td>
                  <td className="px-4 py-2.5">{inv.customer}</td>
                  <td className="px-4 py-2.5 font-medium">{money(inv.amount)}</td>
                  <td className="px-4 py-2.5 text-slate-600">{inv.due}</td>
                  <td className="px-4 py-2.5">
                    <Badge tone={inv.status === 'Paid' ? 'green' : inv.status === 'Overdue' ? 'red' : 'amber'}>{inv.status}</Badge>
                  </td>
                  <td className="whitespace-nowrap px-4 py-2.5">
                    {inv.status !== 'Paid' && (
                      <>
                        <button onClick={(e) => { e.stopPropagation(); markPaid(inv) }} className="rounded-lg px-2.5 py-1.5 text-xs font-semibold text-teal-dark hover:bg-mint">
                          Mark paid
                        </button>
                        <button onClick={(e) => { e.stopPropagation(); sendReminder(inv) }} className="rounded-lg px-2.5 py-1.5 text-xs font-semibold text-coral hover:bg-blush">
                          Remind
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-4 py-10 text-center text-slate-400">
                    No invoices in this status.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <h2 className="mb-3 font-bold text-ink">Expenses — November</h2>
          <ul className="space-y-2.5">
            {expenseList.map((e) => (
              <li key={e.id} className="flex items-start justify-between gap-2 text-sm">
                <span>
                  <span className="block font-medium text-ink">{e.label}</span>
                  <span className="text-xs text-slate-400">
                    {e.category} · {e.date}
                  </span>
                </span>
                <span className="font-semibold">{money(e.amount)}</span>
              </li>
            ))}
          </ul>
          <p className="mt-3 border-t border-slate-100 pt-3 text-sm">
            <span className="text-slate-500">Total</span>
            <span className="float-right font-bold">{money(monthExpenses)}</span>
          </p>
        </section>
      </div>

      {selected && (
        <Modal title={`Invoice ${selected.id}`} onClose={() => setSelectedId(null)}>
          <dl className="space-y-2 text-sm">
            <div className="flex justify-between"><dt className="text-slate-500">Order</dt><dd className="font-medium">{selected.orderId}</dd></div>
            <div className="flex justify-between"><dt className="text-slate-500">Customer</dt><dd className="font-medium">{selected.customer}</dd></div>
            <div className="flex justify-between"><dt className="text-slate-500">Amount</dt><dd className="font-bold">{money(selected.amount)}</dd></div>
            <div className="flex justify-between"><dt className="text-slate-500">Due date</dt><dd>{selected.due}</dd></div>
            <div className="flex justify-between"><dt className="text-slate-500">Payment method</dt><dd>{selected.method}</dd></div>
            <div className="flex justify-between"><dt className="text-slate-500">Status</dt><dd><Badge tone={selected.status === 'Paid' ? 'green' : selected.status === 'Overdue' ? 'red' : 'amber'}>{selected.status}</Badge></dd></div>
          </dl>
          <p className="mt-3 rounded-xl bg-cream px-3 py-2 text-xs text-slate-500">
            Demo invoice — in the real system this would open the PDF, payment link and the linked order.
          </p>
          <div className="mt-4 flex justify-end gap-2">
            <GhostButton onClick={() => setSelectedId(null)}>Close</GhostButton>
            {selected.status !== 'Paid' && <PrimaryButton onClick={() => { markPaid(selected); setSelectedId(null) }}>Mark paid</PrimaryButton>}
          </div>
        </Modal>
      )}

      {showExpense && (
        <Modal title="Add expense" onClose={() => setShowExpense(false)}>
          <form
            onSubmit={(e) => { e.preventDefault(); addExpense() }}
            className="space-y-3"
          >
            <Field label="Description">
              <input value={expDraft.label} onChange={(e) => setExpDraft({ ...expDraft, label: e.target.value })} className={inputCls} placeholder="e.g. Propane refill" />
            </Field>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Category">
                <select value={expDraft.category} onChange={(e) => setExpDraft({ ...expDraft, category: e.target.value })} className={inputCls}>
                  <option>Supplies</option>
                  <option>Fleet</option>
                  <option>Operations</option>
                  <option>Repairs</option>
                  <option>Marketing</option>
                  <option>Insurance</option>
                </select>
              </Field>
              <Field label="Amount (CAD)">
                <input type="number" min={0} step="0.01" value={expDraft.amount} onChange={(e) => setExpDraft({ ...expDraft, amount: Number(e.target.value) })} className={inputCls} />
              </Field>
            </div>
            <div className="flex justify-end gap-2 pt-1">
              <GhostButton onClick={() => setShowExpense(false)}>Cancel</GhostButton>
              <PrimaryButton type="submit">Record expense</PrimaryButton>
            </div>
          </form>
        </Modal>
      )}
    </div>
  )
}
