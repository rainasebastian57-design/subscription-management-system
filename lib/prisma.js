// Simple in-memory fallback to avoid any TypeScript or Prisma engine delays
export const db = {
  subscriptions: [
    { id: '1', customerName: 'Acme Corp', plan: 'Enterprise', status: 'ACTIVE', amount: 499 },
    { id: '2', customerName: 'Globex Inc', plan: 'Pro', status: 'ACTIVE', amount: 199 }
  ]
};