import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { nextCookies } from 'better-auth/next-js';

import prisma from '@/lib/prisma';

const betterAuthBaseUrl = process.env.BETTER_AUTH_URL;
if (!betterAuthBaseUrl) {
  throw new Error('BETTER_AUTH_URL is required');
}

export const auth = betterAuth({
  baseURL: betterAuthBaseUrl,
  database: prismaAdapter(prisma, {
    provider: 'postgresql',
  }),
  plugins: [nextCookies()],
  emailAndPassword: {
    enabled: true,
  },
  // Social Providers - Disabling this since we rarely use them in projects
  // socialProviders: {
  //   google: {
  //     clientId: process.env.GOOGLE_CLIENT_ID as string,
  //     clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
  //   },
  // },
});
