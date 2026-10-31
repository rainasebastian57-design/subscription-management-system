'use client';
import React, { useState, useEffect } from 'react';

export default function CustomerPortal() {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/billing')
      .then((res) => res.json())
      .then((data) => {
        setInvoices(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to load billing records', err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-2xl font-bold text-slate-900 mb-6">Customer Billing Portal</h1>
        
        {/* Active Plan Overview */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-6 space-y-4">
          <div className="flex justify-between items-center border-b pb-4">
            <div>
              <h3 className="font-semibold text-slate-800">Current Plan: Enterprise Pro</h3>
              <p className="text-sm text-slate-500">Renews automatically on Dec 1, 2026</p>
            </div>
            <span className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-xs font-semibold">Active</span>
          </div>
          <div>
            <h4 className="font-medium text-slate-700 mb-1">Payment Method</h4>
            <p className="text-sm text-slate-600">Mastercard ending in **** 4242</p>
          </div>
        </div>

        {/* Invoices List */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h2 className="text-lg font-semibold text-slate-800 mb-4">Billing Invoices</h2>
          {loading ? (
            <p className="text-sm text-slate-500">Loading invoices...</p>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 text-xs font-semibold text-slate-500 uppercase">
                  <th className="pb-3">Invoice ID</th>
                  <th className="pb-3">Client</th>
                  <th className="pb-3">Amount</th>
                  <th className="pb-3">Status</th>
                  <th className="pb-3">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm text-slate-700">
                {invoices.map((inv) => (
                  <tr key={inv.id}>
                    <td className="py-3 font-medium text-indigo-600">{inv.id}</td>
                    <td className="py-3">{inv.customerName}</td>
                    <td className="py-3">${inv.amount}</td>
                    <td className="py-3">
                      <span className={`px-2 py-1 rounded text-xs font-semibold ${
                        inv.status === 'PAID' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'
                      }`}>
                        {inv.status}
                      </span>
                    </td>
                    <td className="py-3 text-slate-500">{inv.date}</td>
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