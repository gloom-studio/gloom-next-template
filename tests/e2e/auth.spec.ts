import { expect, test } from '@playwright/test';

import { getE2EUserEmail, getE2EUserPassword } from './constants';

test.describe('auth', () => {
  test('redirects unauthenticated users away from /dashboard', async ({ page }) => {
    await page.goto('/dashboard');
    await expect(page).toHaveURL(/\/login/);
  });

  test('logs in and shows dashboard', async ({ page }) => {
    await page.goto('/login');
    await page.locator('input[name="email"]').fill(getE2EUserEmail());
    await page.locator('input[name="password"]').fill(getE2EUserPassword());
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page).toHaveURL(/\/dashboard/);
    await expect(page.getByText('User from session:')).toBeVisible();
  });

  test('signs out back to login', async ({ page }) => {
    await page.goto('/login');
    await page.locator('input[name="email"]').fill(getE2EUserEmail());
    await page.locator('input[name="password"]').fill(getE2EUserPassword());
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page).toHaveURL(/\/dashboard/);

    await page.getByRole('button', { name: 'Sign out' }).click();
    await expect(page).toHaveURL(/\/login/);
    await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible();
  });
});
