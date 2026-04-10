import { PrismaPg } from '@prisma/adapter-pg';

import { PrismaClient } from '../app/generated/prisma/client';

declare global {
  // eslint-disable-next-line no-var -- global singleton cache for dev HMR
  var prismaGlobal: PrismaClient | undefined;
}

let prismaModuleCache: PrismaClient | undefined;

function createPrismaClient(): PrismaClient {
  const databaseUrl = process.env.DATABASE_URL;
  if (typeof databaseUrl !== 'string' || databaseUrl.trim() === '') {
    throw new Error(
      'DATABASE_URL is required. Set it in your environment (see .env.example). For CI or builds that touch Prisma, provide a valid PostgreSQL connection string.',
    );
  }
  const adapter = new PrismaPg({ connectionString: databaseUrl });
  return new PrismaClient({ adapter });
}

function getPrisma(): PrismaClient {
  if (process.env.NODE_ENV !== 'production' && globalThis.prismaGlobal) {
    return globalThis.prismaGlobal;
  }
  if (prismaModuleCache) {
    return prismaModuleCache;
  }
  const client = createPrismaClient();
  if (process.env.NODE_ENV !== 'production') {
    globalThis.prismaGlobal = client;
  }
  prismaModuleCache = client;
  return client;
}

/* eslint-disable @typescript-eslint/no-unsafe-type-assertion -- Proxy defers client construction until first property access */
const prisma = new Proxy({} as PrismaClient, {
  get(_target, prop) {
    const client = getPrisma();
    return Reflect.get(client, prop, client);
  },
});
/* eslint-enable @typescript-eslint/no-unsafe-type-assertion */

export default prisma;
