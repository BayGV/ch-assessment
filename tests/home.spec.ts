import { test } from '@playwright/test';
import { HomePage } from './fixtures/home-page';

test('SCENARIO: User can navigate to the home page and assert page objects display', async ({ page }) => {
  const homePage = new HomePage(page);

  await test.step('GIVEN I am not on the web application', async () => {
    await page.goto('about:blank');
  });

  await test.step('WHEN I navigate to the web application', async () => {
    await homePage.goto();
  });

  await test.step('THEN the home page displays', async () => {
    await homePage.expectLoaded();
  });
});
