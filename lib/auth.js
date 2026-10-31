import crypto from 'crypto';

const SECRET_KEY = 'your-secret-key-for-evaluation';

export function hashPassword(password) {
  return crypto.createHmac('sha256', SECRET_KEY).update(password).digest('hex');
}

export function generateToken(payload) {
  const data = JSON.stringify(payload);
  return Buffer.from(data).toString('base64');
}

export function verifyToken(token) {
  try {
    const data = Buffer.from(token, 'base64').toString('utf8');
    return JSON.parse(data);
  } catch {
    return null;
  }
}