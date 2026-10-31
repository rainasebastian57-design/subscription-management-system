import { NextResponse } from 'next/server';
import { randomBytes, scryptSync, timingSafeEqual } from 'node:crypto';

export const runtime = 'nodejs';

// Demo in-memory store. Use a real database in production.
const hash = (pw, salt) => scryptSync(pw, salt, 32);
const makeUser = (email, role, pw) => {
  const salt = randomBytes(16);
  return { email, role, salt, hash: hash(pw, salt) };
};

const users = new Map(
  [
    makeUser('admin@brightloop.com', 'admin', 'Welcome@2026'),
    makeUser('staff@brightloop.com', 'staff', 'Welcome@2026'),
    makeUser('customer@maple.co', 'customer', 'Welcome@2026'),
  ].map((u) => [u.email, u])
);

const redirects = { admin: '/admin', staff: '/staff', customer: '/portal' };

function passwordError(pw) {
  if (typeof pw !== 'string' || pw.length <= 8) return 'Password must be more than 8 characters.';
  if (!/[A-Z]/.test(pw)) return 'Password needs an uppercase letter.';
  if (!/[a-z]/.test(pw)) return 'Password needs a lowercase letter.';
  if (!/[^A-Za-z0-9]/.test(pw)) return 'Password needs a special character.';
  return null;
}

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });
  }
  const action = body.action;
  const email = String(body.email || '').trim().toLowerCase();
  const { password } = body;

  if (!/^\S+@\S+\.\S+$/.test(email)) {
    return NextResponse.json({ error: 'Enter a valid email address.' }, { status: 400 });
  }

  if (action === 'register') {
    const err = passwordError(password);
    if (err) return NextResponse.json({ error: err }, { status: 400 });
    if (users.has(email)) {
      return NextResponse.json({ error: 'This email already has an account.' }, { status: 409 });
    }
    // Public sign-up always creates a customer. Only an admin can add staff.
    users.set(email, makeUser(email, 'customer', password));
    return NextResponse.json({ ok: true }, { status: 201 });
  }

  if (action === 'login') {
    const user = users.get(email);
    const ok =
      user && typeof password === 'string' && timingSafeEqual(hash(password, user.salt), user.hash);
    if (!ok) return NextResponse.json({ error: 'Email or password is incorrect.' }, { status: 401 });
    return NextResponse.json({ ok: true, role: user.role, redirect: redirects[user.role] });
  }

  if (action === 'forgot') {
    // Same reply whether or not the email exists, so accounts cannot be guessed.
    // Connect an email provider here to send the real reset link.
    return NextResponse.json({
      ok: true,
      message: 'If that email has an account, a reset link is on its way.',
    });
  }

  return NextResponse.json({ error: 'Unknown action.' }, { status: 400 });
}