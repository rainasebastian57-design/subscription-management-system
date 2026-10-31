// Demo data and helpers shared by pages and API routes.
// Replace with a real database before going to production.

export const TODAY = '2026-10-31';

export const money = (n) =>
  '$' + Number(n).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

export const products = [
  {
    name: 'Brightloop CRM',
    type: 'Software',
    sales: 1200,
    cost: 480,
    notes: 'Core CRM seat, billed per user.',
    variants: [{ brand: 'Standard', extra: 0 }, { brand: 'Odoo', extra: 560 }],
  },
  {
    name: 'Analytics Add-on',
    type: 'Add-on',
    sales: 300,
    cost: 90,
    notes: 'Can be switched on and off any month.',
    variants: [{ brand: 'Standard', extra: 0 }],
  },
];

export const plans = [
  { name: 'Business Monthly', billing: 'Monthly', minQty: 1, from: '2026-01-01', to: '2027-12-31', rule: 'Pausable' },
  { name: 'Enterprise Yearly', billing: 'Yearly', minQty: 10, from: '2026-01-01', to: '2027-12-31', rule: 'Renewable' },
  { name: 'Trial Weekly', billing: 'Weekly', minQty: 1, from: '2026-09-01', to: '2026-12-31', rule: 'Closes automatically' },
];

export const subscriptions = [
  { number: 'SUB-0001', customer: 'Maple & Co', plan: 'Business Monthly', status: 'Active', start: '2026-08-01', expiry: '2027-07-31', terms: 'Net 15', qty: 5, unit: 1200, tax: 0.18, nextBilling: '2026-10-31' },
  { number: 'SUB-0002', customer: 'Northwind Traders', plan: 'Enterprise Yearly', status: 'Active', start: '2026-03-01', expiry: '2027-02-28', terms: 'Net 30', qty: 40, unit: 1760, tax: 0.18, nextBilling: '2027-03-01' },
  { number: 'SUB-0003', customer: 'Juniper Studio', plan: 'Business Monthly', status: 'Confirmed', start: '2026-11-05', expiry: '2027-11-04', terms: 'Net 15', qty: 3, unit: 1200, tax: 0.18, nextBilling: '2026-11-05' },
  { number: 'SUB-0004', customer: 'Maple & Co', plan: 'Business Monthly', status: 'Quotation', start: '2026-11-15', expiry: '2027-11-14', terms: 'Net 15', qty: 2, unit: 300, tax: 0.18, nextBilling: '2026-11-15' },
  { number: 'SUB-0005', customer: 'Kestrel Logistics', plan: 'Enterprise Yearly', status: 'Draft', start: '2026-12-01', expiry: '2027-11-30', terms: 'Net 30', qty: 25, unit: 1760, tax: 0.18, nextBilling: '2026-12-01' },
  { number: 'SUB-0006', customer: 'Harbor Books', plan: 'Trial Weekly', status: 'Closed', start: '2026-06-01', expiry: '2026-08-31', terms: 'Due on receipt', qty: 1, unit: 300, tax: 0.18, nextBilling: '2026-08-31' },
];

export const invoices = [
  { number: 'INV-1001', subscription: 'SUB-0001', customer: 'Maple & Co', status: 'Paid', issued: '2026-08-01', due: '2026-08-16', total: 7080, paid: 7080 },
  { number: 'INV-1002', subscription: 'SUB-0001', customer: 'Maple & Co', status: 'Paid', issued: '2026-09-01', due: '2026-09-16', total: 7080, paid: 7080 },
  { number: 'INV-1003', subscription: 'SUB-0002', customer: 'Northwind Traders', status: 'Confirmed', issued: '2026-09-15', due: '2026-10-15', total: 83072, paid: 40000 },
  { number: 'INV-1004', subscription: 'SUB-0001', customer: 'Maple & Co', status: 'Confirmed', issued: '2026-10-01', due: '2026-10-16', total: 7080, paid: 0 },
  { number: 'INV-1005', subscription: 'SUB-0002', customer: 'Northwind Traders', status: 'Draft', issued: '2026-10-31', due: '2026-11-30', total: 3540, paid: 0 },
];

export const payments = [
  { id: 'PAY-501', invoice: 'INV-1001', method: 'Bank transfer', amount: 7080, date: '2026-08-10', note: 'Matched to August statement' },
  { id: 'PAY-502', invoice: 'INV-1002', method: 'Card', amount: 7080, date: '2026-09-03', note: 'Auto charge' },
  { id: 'PAY-503', invoice: 'INV-1003', method: 'Cheque', amount: 40000, date: '2026-10-02', note: 'First instalment' },
];

export const discounts = [
  { code: 'SEATS10', kind: 'Percentage', value: 10, minQty: 10, from: '2026-09-01', to: '2026-12-31', limit: 50, used: 12, applies: 'Whole subscriptions' },
  { code: 'WELCOME200', kind: 'Fixed amount', value: 200, minQty: 1, from: '2026-01-01', to: '2026-12-31', limit: 100, used: 100, applies: 'Brightloop CRM' },
];

export const isOverdue = (inv) => inv.status !== 'Paid' && inv.status !== 'Draft' && inv.due < TODAY && inv.total - inv.paid > 0;

export function summary() {
  const active = subscriptions.filter((s) => s.status === 'Active').length;
  const revenue = payments.reduce((sum, p) => sum + p.amount, 0);
  const outstanding = invoices
    .filter((i) => i.status !== 'Draft')
    .reduce((sum, i) => sum + (i.total - i.paid), 0);
  const overdue = invoices.filter(isOverdue);
  return { active, revenue, outstanding, overdue };
}

export const subTotal = (s) => s.qty * s.unit;