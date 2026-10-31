import { Shell, Stat, Card, Table, Badge, FilterLinks } from '../components/ui';
import { subscriptions, invoices, isOverdue, money, subTotal } from '../lib/data';

export const metadata = { title: 'Staff | Brightloop Billing' };

const stages = ['Quotation', 'Confirmed', 'Active'];

export default async function StaffPage({ searchParams }) {
  const sp = (await searchParams) || {};
  const state = sp.invoice;
  const list = invoices.filter((i) => {
    if (!state) return true;
    if (state === 'Overdue') return isOverdue(i);
    if (state === 'Outstanding') return i.status !== 'Paid' && i.status !== 'Draft';
    return i.status === state;
  });

  return (
    <Shell title="Day to day" subtitle="See where every subscription stands and which invoices still need attention.">
      <div className="grid gap-4 sm:grid-cols-3">
        {stages.map((st) => (
          <Stat key={st} label={st} value={subscriptions.filter((x) => x.status === st).length} hint="subscriptions" />
        ))}
      </div>

      <Card title="Subscription pipeline">
        <Table
          rows={subscriptions}
          columns={[
            { key: 'number', label: 'Number' },
            { key: 'customer', label: 'Customer' },
            { key: 'plan', label: 'Plan' },
            { key: 'status', label: 'Stage', render: (r) => <Badge>{r.status}</Badge> },
            { key: 'start', label: 'Starts' },
            { key: 'terms', label: 'Terms' },
            { key: 'amount', label: 'Amount', render: (r) => money(subTotal(r)) },
          ]}
        />
      </Card>

      <Card
        title="Invoices"
        action={<FilterLinks base="/staff" param="invoice" options={['Draft', 'Confirmed', 'Paid', 'Outstanding', 'Overdue']} current={state} />}
      >
        <Table
          rows={list}
          columns={[
            { key: 'number', label: 'Invoice' },
            { key: 'customer', label: 'Customer' },
            { key: 'due', label: 'Due' },
            { key: 'total', label: 'Total', render: (r) => money(r.total) },
            { key: 'owed', label: 'Owed', render: (r) => money(r.total - r.paid) },
            { key: 'status', label: 'Status', render: (r) => <Badge>{isOverdue(r) ? 'Overdue' : r.status}</Badge> },
          ]}
        />
      </Card>
    </Shell>
  );
}