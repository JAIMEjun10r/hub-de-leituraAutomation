import { test } from '../support/index';
import data from '../data/errorMessages.json';
const USER_EMAIL = process.env.USER_EMAIL;
const USER_PASSWORD = process.env.USER_PASSWORD;
const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

test.use({ storageState: { cookies: [], origins: [] } });
test.beforeEach(async ({ page }) => {
  await page.goto('/');
});


test('Login with valid standard user', async ({ page }) => {
  await page.login.sucessfulLogin(USER_EMAIL, USER_PASSWORD);
});

test('Login with valid admin user', async ({ page }) => {
  await page.login.sucessfulLogin(ADMIN_EMAIL, ADMIN_PASSWORD);
});

test('Login with invalid email', async ({ page }) => {
  await page.login.invalidCredentials('a', '12');
  await page.login.errorMessageEmail(data.login.invalidEmail);
});
