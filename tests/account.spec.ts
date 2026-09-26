import { expect, test } from '@playwright/test';
import { HomePage } from './fixtures/home-page';

const storedAccount = {
  username: '',
  password: '',
};

function generateRandomAccount() {
  const suffix = `${Date.now()}${Math.random().toString(36).slice(2, 8)}`;
  return {
    username: `user_${suffix}`,
    password: `Pass${Math.random().toString(36).slice(2, 8)}!`,
  };
}

async function signUpUser(page: any, homePage: HomePage, account: { username: string; password: string }) {
  await homePage.goto();
  await homePage.openSignUpModal();
  await homePage.signUpModal.fillCredentials(account.username, account.password);
  const dialogPromise = page.waitForEvent('dialog');
  await homePage.signUpModal.submit();
  const dialog = await dialogPromise;
  expect(dialog.message().toLowerCase()).toMatch(/successful|success/i);
  await dialog.accept();
  storedAccount.username = account.username;
  storedAccount.password = account.password;
}

test.describe.serial('Account flows', () => {
  test('SCENARIO: User can sign up for an account', async ({ page }) => {
    const homePage = new HomePage(page);
    const account = generateRandomAccount();

    await test.step('GIVEN I am on the web applcation', async () => {
      await homePage.goto();
    });

    await test.step('AND I am not signed into an account', async () => {
      await expect(page.getByRole('link', { name: /log in/i })).toBeVisible();
      await expect(page.getByRole('link', { name: /sign up/i })).toBeVisible();
    });

    await test.step('WHEN I click \'Sign up\'', async () => {
      await homePage.openSignUpModal();
    });

    await test.step('THEN the \'Sign up\' module displays', async () => {
      await homePage.signUpModal.expectVisible();
    });

    await test.step('WHEN I complete the details in the module', async () => {
      await homePage.signUpModal.fillCredentials(account.username, account.password);
    });

    await test.step('AND click \'Sign up\'', async () => {
      const dialogPromise = page.waitForEvent('dialog');
      await homePage.signUpModal.submit();
      const dialog = await dialogPromise;
      expect(dialog.message().toLowerCase()).toMatch(/successful|success/i);
      await dialog.accept();
    });

    await test.step('THEN a success message displays', async () => {
      await expect(page.getByRole('link', { name: /log in/i })).toBeVisible();
    });

    storedAccount.username = account.username;
    storedAccount.password = account.password;
  });

  test('SCENARIO: User can log in using account credentials', async ({ page }) => {
    const homePage = new HomePage(page);
    const account = storedAccount.username && storedAccount.password
      ? storedAccount
      : generateRandomAccount();

    if (!storedAccount.username || !storedAccount.password) {
      await signUpUser(page, homePage, account);
    }

    await test.step('GIVEN I am on the web application', async () => {
      await homePage.goto();
    });

    await test.step('AND I am not signed into an account', async () => {
      await expect(page.getByRole('link', { name: /log in/i })).toBeVisible();
      await expect(page.getByRole('link', { name: /sign up/i })).toBeVisible();
    });

    await test.step('AND I have valid account details', async () => {
      expect(account.username).not.toBe('');
      expect(account.password).not.toBe('');
    });

    await test.step('WHEN I click \'Log in\'', async () => {
      await homePage.openLoginModal();
    });

    await test.step('THEN the \'Log in\' module displays', async () => {
      await homePage.loginModal.expectVisible();
    });

    await test.step('WHEN I enter valid account details', async () => {
      await homePage.loginModal.fillCredentials(account.username, account.password);
    });

    await test.step('AND click \'Log in\'', async () => {
      await homePage.loginModal.submit();
    });

    await test.step('THEN a success message displays', async () => {
      await expect(page.getByText(/welcome\s+/i)).toBeVisible();
      await expect(page.getByRole('link', { name: /log out/i })).toBeVisible();
    });
  });
});
