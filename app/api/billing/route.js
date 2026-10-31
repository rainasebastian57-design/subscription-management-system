let billingStore = [
  { id: 'inv-101', customerName: 'Acme Corp', amount: 499, status: 'PAID', date: '2026-10-01' },
  { id: 'inv-102', customerName: 'Globex Inc', amount: 199, status: 'PENDING', date: '2026-10-15' },
];

export async function GET() {
  return new Response(
    JSON.stringify(billingStore),
    { status: 200, headers: { 'Content-Type': 'application/json' } }
  );
}

export async function POST(request) {
  try {
    const body = await request.json();
    const newInvoice = {
      id: `inv-${Date.now().toString().slice(-4)}`,
      customerName: body.customerName || 'General Client',
      amount: Number(body.amount) || 99,
      status: body.status || 'PAID',
      date: new Date().toISOString().split('T')[0],
    };

    billingStore.push(newInvoice);
    return new Response(
      JSON.stringify(newInvoice),
      { status: 201, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: 'Failed to record billing data' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}