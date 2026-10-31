import { Shell, Stat, Card, Table, Badge } from '../components/ui';
import { subscriptions, invoices, isOverdue, money, subTotal } from '../lib/data';

export const metadata = { title: 'My subscriptions | Brightloop Billing' };

// Demo: the portal shows one customer. Replace with the signed-in customer.
const CUSTOMER = 'Maple & Co';

export default function PortalPage() {
  const mine = subscriptions.filter((s) => s.customer === CUSTOMER);
  const myInvoices = invoices.filter((i) => i.customer === CUSTOMER);
  const owed = myInvoices.filter((i) => i.status !== 'Draft').reduce((n, i) => n + (i.total - i.paid), 0);

  return (
    <Shell title={`Hello, ${CUSTOMER}`} subtitle="Your subscriptions and invoices, without having to email anyone.">
      <div className="grid gap-4 sm:grid-cols-3">
        <Stat label="Active subscriptions" value={mine.filter((s) => s.status === 'Active').length} tone="bg-emerald-50" />
        <Stat label="Balance due" value={money(owed)} tone="bg-amber-50" />
        <Stat label="Invoices" value={myInvoices.length} />
      </div>

      <Card title="Your subscriptions">
        <Table
          rows={mine}
          columns={[
            { key: 'number', label: 'Number' },
            { key: 'plan', label: 'Plan' },
            { key: 'status', label: 'Status', render: (r) => <Badge>{r.status}</Badge> },
            { key: 'expiry', label: 'Expires' },
            { key: 'amount', label: 'Amount', render: (r) => money(subTotal(r)) },
          ]}
        />
      </Card>

      <Card title="Your invoices">
        <Table
          rows={myInvoices}
          columns={[
            { key: 'number', label: 'Invoice' },
            { key: 'issued', label: 'Issued' },
            { key: 'due', label: 'Due' },
            { key: 'total', label: 'Total', render: (r) => money(r.total) },
            { key: 'status', label: 'Status', render: (r) => <Badge>{isOverdue(r) ? 'Overdue' : r.status}</Badge> },
          ]}
        />
      </Card>
    </Shell>
  );
}