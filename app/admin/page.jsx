'use client';
import React, { useState, useEffect } from 'react';

export default function AdminDashboard() {
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [customerName, setCustomerName] = useState('');
  const [plan, setPlan] = useState('Pro');
  const [amount, setAmount] = useState('');

  // Fetch subscriptions from the local API on load
  useEffect(() => {
    fetch('/api/subscriptions')
      .then((res) => res.json())
      .then((data) => {
        setSubscriptions(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to fetch subscriptions', err);
        setLoading(false);
      });
  }, []);

  // Handle adding a new subscription via POST request
  const handleAddSubscription = async (e) => {
    e.preventDefault();
    if (!customerName || !amount) return;

    try {
      const res = await fetch('/api/subscriptions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ customerName, plan, amount: Number(amount) }),
      });

      if (res.ok) {
        const newSub = await res.json();
        setSubscriptions([...subscriptions, newSub]);
        setCustomerName('');
        setAmount('');
      }
    } catch (err) {
      console.error('Error creating subscription', err);
    }
  };

  const totalRevenue = subscriptions.reduce((acc, sub) => acc + (Number(sub.amount) || 0), 0);

  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <div className="mx-auto max-w-6xl">
        <h1 className="text-3xl font-bold text-slate-900 mb-6">Subscription Management Admin</h1>
        
        {/* Metric Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <p className="text-sm font-medium text-slate-500">Total Subscriptions</p>
            <h3 className="text-2xl font-bold text-slate-800 mt-1">{subscriptions.length}</h3>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <p className="text-sm font-medium text-slate-500">Monthly Revenue</p>
            <h3 className="text-2xl font-bold text-slate-800 mt-1">${totalRevenue}</h3>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <p className="text-sm font-medium text-slate-500">System Status</p>
            <h3 className="text-2xl font-bold text-emerald-600 mt-1">Operational</h3>
          </div>
        </div>

        {/* Add Subscription Form */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-8">
          <h2 className="text-lg font-semibold text-slate-800 mb-4">Add New Subscription</h2>
          <form onSubmit={handleAddSubscription} className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <input 
              type="text" 
              placeholder="Customer Name" 
              value={customerName} 
              onChange={(e) => setCustomerName(e.target.value)} 
              className="rounded-lg border border-slate-300 p-2.5 text-sm outline-none focus:border-indigo-500"
              required 
            />
            <select 
              value={plan} 
              onChange={(e) => setPlan(e.target.value)} 
              className="rounded-lg border border-slate-300 p-2.5 text-sm outline-none focus:border-indigo-500"
            >
              <option value="Standard">Standard</option>
              <option value="Pro">Pro</option>
              <option value="Enterprise">Enterprise</option>
            </select>
            <input 
              type="number" 
              placeholder="Amount ($)" 
              value={amount} 
              onChange={(e) => setAmount(e.target.value)} 
              className="rounded-lg border border-slate-300 p-2.5 text-sm outline-none focus:border-indigo-500"
              required 
            />
            <button type="submit" className="rounded-lg bg-indigo-600 py-2.5 font-semibold text-white hover:bg-indigo-700 text-sm">
              Add Client
            </button>
          </form>
        </div>

        {/* Data Table */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h2 className="text-lg font-semibold text-slate-800 mb-4">Active Customer Subscriptions</h2>
          {loading ? (
            <p className="text-sm text-slate-500">Loading subscriptions...</p>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 text-xs font-semibold text-slate-500 uppercase">
                  <th className="pb-3">Customer</th>
                  <th className="pb-3">Plan</th>
                  <th className="pb-3">Status</th>
                  <th className="pb-3">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm text-slate-700">
                {subscriptions.map((sub) => (
                  <tr key={sub.id}>
                    <td className="py-3 font-medium">{sub.customerName}</td>
                    <td className="py-3">{sub.plan}</td>
                    <td className="py-3"><span className="px-2 py-1 bg-emerald-50 text-emerald-700 rounded text-xs font-semibold">{sub.status || 'ACTIVE'}</span></td>
                    <td className="py-3">${sub.amount}/mo</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}