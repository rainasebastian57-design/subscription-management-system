import { PrismaClient } from '@prisma/client';

// One shared client, so Vercel does not open a new connection on every request.
const globalForPrisma = globalThis;

export const prisma = globalForPrisma.__prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.__prisma = prisma;

export const db = prisma;