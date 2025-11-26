import { test, expect } from '@playwright/test';

test.describe('Signup form', () => {
  test('renders and validates basic fields', async ({ page }) => {
    await page.goto('http://localhost:3000/signup');

    // Check form fields
    await expect(page.getByLabel('Nama Lengkap')).toBeVisible();
    await expect(page.getByLabel('Pilih Kelas')).toBeVisible();
    await expect(page.getByLabel('Asal Sekolah')).toBeVisible();
    await expect(page.getByLabel('Minat / Interest')).toBeVisible();
    await expect(page.getByLabel('Email')).toBeVisible();
    await expect(page.getByLabel('Password')).toBeVisible();
    await expect(page.getByLabel('Konfirmasi Password')).toBeVisible();

    // Try submitting empty form and expect an error message
    await page.getByRole('button', { name: /Daftar Sekarang/i }).click();
    await expect(page.getByRole('alert')).toBeVisible();
  });
});
