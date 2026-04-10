import { PrismaPg } from '@prisma/adapter-pg';

import { PrismaClient } from '../app/generated/prisma/client';

declare global {
  // eslint-disable-next-line no-var -- global singleton cache for dev HMR
  var prismaGlobal: PrismaClient | undefined;
}

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});
const prisma =
  globalThis.prismaGlobal ||
  new PrismaClient({
    adapter,
  });
if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = prisma;
export default prisma;
