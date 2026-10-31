let subscriptionsStore = [
  { id: '1', customerName: 'Acme Corp', plan: 'Enterprise', status: 'ACTIVE', amount: 499, renewalDate: '2026-12-01' },
  { id: '2', customerName: 'Globex Inc', plan: 'Pro', status: 'ACTIVE', amount: 199, renewalDate: '2026-11-15' },
];

export async function GET() {
  return new Response(JSON.stringify(subscriptionsStore), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}

export async function POST(request) {
  try {
    const body = await request.json();
    const newSub = {
      id: Date.now().toString(),
      customerName: body.customerName || 'New Client',
      plan: body.plan || 'Standard',
      status: 'ACTIVE',
      amount: Number(body.amount) || 99,
      renewalDate: body.renewalDate || new Date().toISOString().split('T')[0],
    };

    subscriptionsStore.push(newSub);
    return new Response(JSON.stringify(newSub), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to create subscription' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}