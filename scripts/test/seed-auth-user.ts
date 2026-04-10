/**
 * CLI entry: `pnpm test:seed` — same logic as Playwright global setup.
 */
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { getE2EUserEmail } from '../../tests/e2e/constants';
import { seedE2EAuthUser } from '../../tests/e2e/seed-auth-user';

async function main() {
  await seedE2EAuthUser();
  console.log(`Seeded E2E user ${getE2EUserEmail()}`);
}

const thisFile = fileURLToPath(import.meta.url);
const invokedDirectly = process.argv.some((arg) => path.resolve(arg) === thisFile);
if (invokedDirectly) {
  void main().catch((err) => {
    console.error(err);
    process.exitCode = 1;
  });
}
