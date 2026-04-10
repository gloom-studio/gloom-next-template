/**
 * Ensures a known Better Auth email/password user exists for Playwright E2E.
 * Requires DATABASE_URL, BETTER_AUTH_* env, and a running app when using HTTP sign-up.
 */
import { config as loadEnv } from 'dotenv';
import pg from 'pg';

import { getE2EUserEmail, getE2EUserName, getE2EUserPassword } from './constants';

function resolveBaseUrl(): string {
  return (
    process.env.PLAYWRIGHT_BASE_URL ??
    process.env.BETTER_AUTH_URL ??
    'http://localhost:3000'
  ).replace(/\/$/, '');
}

async function waitForAppServer(baseURL: string): Promise<void> {
  const url = new URL('/login', baseURL).toString();
  const attempts = 90;
  for (let i = 0; i < attempts; i++) {
    try {
      const res = await fetch(url, { redirect: 'manual' });
      if (res.status === 200 || res.status === 302 || res.status === 307) return;
    } catch {
      // server not ready yet
    }
    await new Promise((r) => setTimeout(r, 1000));
  }
  throw new Error(`Timed out waiting for Next.js at ${baseURL} (${url})`);
}

async function deleteUserByEmail(email: string): Promise<void> {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error('DATABASE_URL is required to reset the E2E user');
  }
  const client = new pg.Client({ connectionString });
  await client.connect();
  try {
    await client.query('DELETE FROM "user" WHERE email = $1', [email]);
  } finally {
    await client.end();
  }
}

export async function seedE2EAuthUser(): Promise<void> {
  process.env.DOTENV_CONFIG_QUIET = 'true';
  loadEnv({ path: '.env.local' });
  loadEnv();

  const baseURL = resolveBaseUrl();
  await waitForAppServer(baseURL);

  const email = getE2EUserEmail();
  const password = getE2EUserPassword();
  const name = getE2EUserName();

  await deleteUserByEmail(email);

  const signUpUrl = new URL('/api/auth/sign-up/email', baseURL).toString();
  const res = await fetch(signUpUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Origin: baseURL,
    },
    body: JSON.stringify({
      name,
      email,
      password,
    }),
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`E2E seed sign-up failed: ${res.status} ${body}`);
  }
}
