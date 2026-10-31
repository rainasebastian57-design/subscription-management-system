'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const field =
  'mt-1 w-full rounded-xl border border-stone-200 bg-white px-4 py-3 text-stone-900 placeholder-stone-400 shadow-sm transition focus:border-orange-300 focus:outline-none focus:ring-2 focus:ring-orange-100';

export default function LoginPage() {
  const router = useRouter();
  const [mode, setMode] = useState('login'); // login | register | forgot
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState(null);
  const [busy, setBusy] = useState(false);

  async function submit(e) {
    e.preventDefault();
    setBusy(true);
    setMessage(null);
    try {
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: mode, email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setMessage({ ok: false, text: data.error || 'Something went wrong.' });
      } else if (mode === 'forgot') {
        setMessage({ ok: true, text: data.message });
      } else if (mode === 'register') {
        setMessage({ ok: true, text: 'Account created. You can sign in now.' });
        setMode('login');
      } else {
        router.push(data.redirect);
      }
    } catch {
      setMessage({ ok: false, text: 'Could not reach the server. Try again.' });
    } finally {
      setBusy(false);
    }
  }

  const titles = { login: 'Welcome back', register: 'Create your account', forgot: 'Reset your password' };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-amber-50/60 to-[#FDFBF7] px-4 py-12">
      <div className="w-full max-w-md">
        <Link href="/" className="font-serif text-xl font-semibold text-stone-900">
          Brightloop
        </Link>
        <div className="mt-6 rounded-2xl border border-stone-200 bg-white p-8 shadow-md shadow-amber-900/5">
          <h1 className="font-serif text-2xl font-semibold text-stone-900">{titles[mode]}</h1>
          <form onSubmit={submit} className="mt-6 space-y-4">
            <label className="block text-sm font-medium text-stone-700">
              Email
              <input type="email" required autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@company.com" className={field} />
            </label>
            {mode !== 'forgot' && (
              <label className="block text-sm font-medium text-stone-700">
                Password
                <input type="password" required autoComplete={mode === 'login' ? 'current-password' : 'new-password'} value={password} onChange={(e) => setPassword(e.target.value)} className={field} />
                {mode === 'register' && (
                  <span className="mt-1 block text-xs font-normal text-stone-500">
                    More than 8 characters, with an uppercase letter, a lowercase letter and a special character.
                  </span>
                )}
              </label>
            )}
            {message && (
              <p role="status" className={`rounded-xl border px-4 py-3 text-sm ${message.ok ? 'border-emerald-200 bg-emerald-50 text-emerald-900' : 'border-rose-200 bg-rose-50 text-rose-900'}`}>
                {message.text}
              </p>
            )}
            <button type="submit" disabled={busy} className="w-full rounded-xl bg-stone-900 px-4 py-3 font-medium text-white shadow-sm transition hover:bg-stone-700 disabled:opacity-60">
              {busy ? 'Please wait' : mode === 'login' ? 'Sign in' : mode === 'register' ? 'Create account' : 'Send reset link'}
            </button>
          </form>
          <div className="mt-6 flex flex-wrap justify-between gap-2 text-sm text-stone-600">
            {mode === 'login' ? (
              <>
                <button type="button" onClick={() => setMode('register')} className="underline-offset-4 hover:text-orange-900 hover:underline">Create an account</button>
                <button type="button" onClick={() => setMode('forgot')} className="underline-offset-4 hover:text-orange-900 hover:underline">Forgot password?</button>
              </>
            ) : (
              <button type="button" onClick={() => setMode('login')} className="underline-offset-4 hover:text-orange-900 hover:underline">Back to sign in</button>
            )}
          </div>
        </div>
        <p className="mt-4 rounded-xl bg-amber-50 px-4 py-3 text-xs text-stone-600">
          Demo accounts: admin@brightloop.com, staff@brightloop.com, customer@maple.co. Password for all: Welcome@2026
        </p>
      </div>
    </div>
  );
}