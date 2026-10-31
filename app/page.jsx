import Link from 'next/link';

const entries = [
  { href: '/login', title: 'Sign in', text: 'Log in or create an account with your email.', tone: 'bg-orange-100 text-orange-900' },
  { href: '/admin', title: 'Admin', text: 'Products, plans, taxes, discounts and the finance overview.', tone: 'bg-amber-100 text-amber-900' },
  { href: '/staff', title: 'Staff', text: 'Move subscriptions forward, send invoices and record payments.', tone: 'bg-emerald-50 text-emerald-900' },
  { href: '/portal', title: 'Customer portal', text: 'See your own subscriptions and invoices.', tone: 'bg-stone-100 text-stone-800' },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50/60 to-[#FDFBF7]">
      <main className="mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-24">
        <h1 className="max-w-3xl font-serif text-4xl font-semibold leading-tight text-stone-900 sm:text-6xl">
          Every renewal, invoice and payment, in one calm place.
        </h1>
        <p className="mt-5 max-w-2xl text-lg text-stone-600">
          Brightloop Billing runs the whole life of a subscription: set up plans, turn quotes into
          subscriptions, invoice on billing day and see exactly what is paid and what is owed.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/login" className="rounded-xl bg-stone-900 px-5 py-3 text-sm font-medium text-white shadow-sm transition hover:bg-stone-700">
            Sign in
          </Link>
          <Link href="/admin" className="rounded-xl border border-stone-200 bg-white px-5 py-3 text-sm font-medium text-stone-800 shadow-sm transition hover:bg-stone-50">
            See the finance overview
          </Link>
        </div>

        <div className="mt-14 grid gap-4 sm:grid-cols-2">
          {entries.map((e) => (
            <Link
              key={e.href}
              href={e.href}
              className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm shadow-amber-900/5 transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <span className={`inline-block rounded-xl px-3 py-1 text-sm font-medium ${e.tone}`}>{e.title}</span>
              <p className="mt-3 text-stone-600">{e.text}</p>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}