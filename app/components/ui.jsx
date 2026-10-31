import Link from 'next/link';

const tones = {
  Draft: 'bg-stone-100 text-stone-700 border-stone-200',
  Quotation: 'bg-amber-100 text-amber-900 border-amber-200',
  Confirmed: 'bg-orange-100 text-orange-900 border-orange-200',
  Active: 'bg-emerald-50 text-emerald-800 border-emerald-200',
  Paid: 'bg-emerald-50 text-emerald-800 border-emerald-200',
  Closed: 'bg-stone-100 text-stone-600 border-stone-200',
  Overdue: 'bg-rose-50 text-rose-800 border-rose-200',
};

export function Badge({ children }) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${
        tones[children] || tones.Draft
      }`}
    >
      {children}
    </span>
  );
}

const nav = [
  { href: '/admin', label: 'Admin' },
  { href: '/staff', label: 'Staff' },
  { href: '/portal', label: 'Customer portal' },
];

export function Shell({ title, subtitle, children }) {
  return (
    <div className="min-h-screen bg-[#FDFBF7]">
      <header className="border-b border-stone-200 bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-4 sm:px-6">
          <Link href="/" className="font-serif text-xl font-semibold text-stone-900">
            Brightloop
          </Link>
          <nav className="flex flex-wrap items-center gap-1 text-sm">
            {nav.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                className="rounded-xl px-3 py-1.5 text-stone-700 transition hover:bg-amber-100 hover:text-orange-900"
              >
                {n.label}
              </Link>
            ))}
            <Link
              href="/login"
              className="ml-1 rounded-xl border border-stone-200 bg-white px-3 py-1.5 text-stone-800 shadow-sm transition hover:bg-stone-50"
            >
              Sign in
            </Link>
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <h1 className="font-serif text-3xl font-semibold text-stone-900">{title}</h1>
        {subtitle && <p className="mt-1 max-w-2xl text-stone-600">{subtitle}</p>}
        <div className="mt-8 space-y-8">{children}</div>
      </main>
    </div>
  );
}

export function Stat({ label, value, hint, tone = 'bg-white' }) {
  return (
    <div className={`rounded-2xl border border-stone-200 p-5 shadow-sm shadow-amber-900/5 ${tone}`}>
      <p className="text-sm text-stone-600">{label}</p>
      <p className="mt-2 font-serif text-3xl font-semibold text-stone-900">{value}</p>
      {hint && <p className="mt-1 text-xs text-stone-500">{hint}</p>}
    </div>
  );
}

export function Card({ title, action, children }) {
  return (
    <section className="rounded-2xl border border-stone-200 bg-white shadow-sm shadow-amber-900/5">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-stone-100 px-5 py-4">
        <h2 className="font-serif text-lg font-semibold text-stone-900">{title}</h2>
        {action}
      </div>
      <div className="p-2 sm:p-3">{children}</div>
    </section>
  );
}

export function Table({ columns, rows, empty = 'Nothing here yet.' }) {
  if (!rows.length) return <p className="px-3 py-6 text-sm text-stone-500">{empty}</p>;
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[560px] text-left text-sm">
        <thead>
          <tr className="text-stone-500">
            {columns.map((c) => (
              <th key={c.key} className="px-3 py-2 font-medium">
                {c.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={r.number || r.id || r.code || r.name || i} className="border-t border-stone-100 transition hover:bg-amber-50/50">
              {columns.map((c) => (
                <td key={c.key} className="px-3 py-3 text-stone-800">
                  {c.render ? c.render(r) : r[c.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function FilterLinks({ base, param = 'status', options, current }) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {['All', ...options].map((o) => {
        const active = (current || 'All') === o;
        return (
          <Link
            key={o}
            href={o === 'All' ? base : `${base}?${param}=${encodeURIComponent(o)}`}
            className={`rounded-full border px-3 py-1 text-xs transition ${
              active
                ? 'border-orange-200 bg-orange-100 text-orange-900'
                : 'border-stone-200 bg-white text-stone-600 hover:bg-stone-50'
            }`}
          >
            {o}
          </Link>
        );
      })}
    </div>
  );
}
Where