/** Defaults; override via env. Use getters so values resolve after dotenv in setup scripts. */

export function getE2EUserEmail(): string {
  return process.env.E2E_USER_EMAIL ?? 'e2e-user@test.local';
}

export function getE2EUserPassword(): string {
  return process.env.E2E_USER_PASSWORD ?? 'E2e_pass_1!';
}

export function getE2EUserName(): string {
  return process.env.E2E_USER_NAME ?? 'E2E User';
}
