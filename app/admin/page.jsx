import { Shell, Stat, Card, Table, Badge, FilterLinks } from '../components/ui';
import { subscriptions, payments, discounts, plans, products, summary, money, subTotal } from '../lib/data';

export const metadata = { title: 'Admin | Brightloop Billing' };

export default async function AdminPage({ searchParams }) {
  const sp = (await searchParams) || {};
  const status = sp.status;
  const s = summary();
  const subs = status ? subscriptions.filter((x) => x.status === status) : subscriptions;

  return (
    <Shell title="Finance overview" subtitle="Active subscriptions, revenue, payments and overdue invoices, with the setup tools only admins can change.">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Stat label="Active subscriptions" value={s.active} tone="bg-emerald-50" />
        <Stat label="Revenue collected" value={money(s.revenue)} tone="bg-amber-50" />
        <Stat label="Still owed" value={money(s.outstanding)} />
        <Stat label="Overdue invoices" value={s.overdue.length} hint="Chase these first" tone="bg-orange-50" />
      </div>

      <Card title="Subscriptions" action={<FilterLinks base="/admin" options={['Draft', 'Quotation', 'Confirmed', 'Active', 'Closed']} current={status} />}>
        <Table
          rows={subs}
          columns={[
            { key: 'number', label: 'Number' },
            { key: 'customer', label: 'Customer' },
            { key: 'plan', label: 'Plan' },
            { key: 'status', label: 'Status', render: (r) => <Badge>{r.status}</Badge> },
            { key: 'expiry', label: 'Expires' },
            { key: 'total', label: 'Amount', render: (r) => money(subTotal(r)) },
          ]}
        />
      </Card>

      <Card title="Overdue invoices">
        <Table
          rows={s.overdue}
          empty="No overdue invoices."
          columns={[
            { key: 'number', label: 'Invoice' },
            { key: 'customer', label: 'Customer' },
            { key: 'due', label: 'Due' },
            { key: 'owed', label: 'Owed', render: (r) => money(r.total - r.paid) },
            { key: 'flag', label: 'Status', render: () => <Badge>Overdue</Badge> },
          ]}
        />
      </Card>

      <div className="grid gap-8 lg:grid-cols-2">
        <Card title="Products and variants">
          <Table
            rows={products}
            columns={[
              { key: 'name', label: 'Product' },
              { key: 'type', label: 'Type' },
              { key: 'sales', label: 'Sales / cost', render: (r) => `${money(r.sales)} / ${money(r.cost)}` },
              { key: 'variants', label: 'Variants', render: (r) => r.variants.map((v) => (v.extra ? `${v.brand} +${v.extra}` : v.brand)).join(', ') },
            ]}
          />
        </Card>
        <Card title="Plans">
          <Table
            rows={plans}
            columns={[
              { key: 'name', label: 'Plan' },
              { key: 'billing', label: 'Billing' },
              { key: 'minQty', label: 'Min qty' },
              { key: 'to', label: 'Available until' },
              { key: 'rule', label: 'Rule' },
            ]}
          />
        </Card>
      </div>

      <Card title="Discount rules">
        <Table
          rows={discounts}
          columns={[
            { key: 'code', label: 'Code' },
            { key: 'value', label: 'Value', render: (r) => (r.kind === 'Percentage' ? `${r.value}%` : money(r.value)) },
            { key: 'applies', label: 'Applies to' },
            { key: 'minQty', label: 'Min qty' },
            { key: 'window', label: 'Valid', render: (r) => `${r.from} to ${r.to}` },
            { key: 'used', label: 'Used', render: (r) => `${r.used} of ${r.limit}` },
          ]}
        />
      </Card>

      <Card title="Recent payments">
        <Table
          rows={payments}
          columns={[
            { key: 'id', label: 'Payment' },
            { key: 'invoice', label: 'Invoice' },
            { key: 'method', label: 'Method' },
            { key: 'amount', label: 'Amount', render: (r) => money(r.amount) },
            { key: 'date', label: 'Date' },
            { key: 'note', label: 'Note' },
          ]}
        />
      </Card>
    </Shell>
  );
}