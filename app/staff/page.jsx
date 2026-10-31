'use client';
import React, { useState, useEffect } from 'react';

export default function StaffDashboard() {
  const [invoices, setInvoices] = useState([]);
  const [clientName, setClientName] = useState('');
  const [amount, setAmount] = useState('');

  useEffect(() => {
    fetch('/api/billing')
      .then((res) => res.json())
      .then((data) => setInvoices(data))
      .catch((err) => console.error(err));
  }, []);

  const handleIssueInvoice = async (e) => {
    e.preventDefault();
    if (!clientName || !amount) return;

    try {
      const res = await fetch('/api/billing', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ customerName: clientName, amount: Number(amount), status: 'PAID' }),
      });

      if (res.ok) {
        const newInv = await res.json();
        setInvoices([...invoices, newInv]);
        setClientName('');
        setAmount('');
      }
    } catch (err) {
      console.error('Failed to issue invoice', err);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-2xl font-bold text-slate-900 mb-6">Staff Support Desk</h1>
        
        {/* Quick Action: Issue Manual Invoice */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-6">
          <h2 className="text-lg font-semibold text-slate-800 mb-4">Manual Invoice Generator</h2>
          <form onSubmit={handleIssueInvoice} className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input 
              type="text" 
              placeholder="Customer Name" 
              value={clientName} 
              onChange={(e) => setClientName(e.target.value)} 
              className="rounded-lg border border-slate-300 p-2.5 text-sm outline-none focus:border-indigo-500"
              required 
            />
            <input 
              type="number" 
              placeholder="Amount ($)" 
              value={amount} 
              onChange={(e) => setAmount(e.target.value)} 
              className="rounded-lg border border-slate-300 p-2.5 text-sm outline-none focus:border-indigo-500"
              required 
            />
            <button type="submit" className="rounded-lg bg-indigo-600 py-2.5 font-semibold text-white hover:bg-indigo-700 text-sm">
              Issue Invoice
            </button>
          </form>
        </div>

        {/* Support Overview */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h2 className="text-lg font-semibold text-slate-800 mb-4">Recent Client Billing Activity</h2>
          <ul className="divide-y divide-slate-100 text-sm text-slate-700">
            {invoices.map((inv) => (
              <li key={inv.id} className="py-3 flex justify-between items-center">
                <div>
                  <span className="font-medium text-slate-900">{inv.customerName}</span>
                  <p className="text-xs text-slate-500">Invoice ID: {inv.id} • Date: {inv.date}</p>
                </div>
                <span className="font-semibold text-slate-800">${inv.amount}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}