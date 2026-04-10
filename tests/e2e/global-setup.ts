import { seedE2EAuthUser } from './seed-auth-user';

export default async function globalSetup() {
  await seedE2EAuthUser();
}
