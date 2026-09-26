import { expect, test } from '@playwright/test';
import { HomePage } from './fixtures/home-page';
import { ProductPage } from './fixtures/product-page';
import { CartPage } from './fixtures/cart-page';

test.describe('Cart journeys', () => {
  test('SCENARIO: User can view item details and add to cart', async ({ page }) => {
    const homePage = new HomePage(page);
    const productPage = new ProductPage(page);

    await test.step('GIVEN I am on the web application home page', async () => {
      await homePage.goto();
    });

    await test.step('WHEN I click on a product card', async () => {
      await homePage.openProduct('Samsung galaxy s6');
    });

    await test.step('THEN I am navigated to that products page', async () => {
      await expect(page).toHaveURL(/prod\.html\?idp_=1/i);
      await productPage.expectLoaded();
    });

    await test.step('WHEN I click \'Add to cart\'', async () => {
      const dialogPromise = page.waitForEvent('dialog');
      await productPage.addToCart();
      const dialog = await dialogPromise;
      expect(dialog.message().toLowerCase()).toMatch(/product added|added to cart|success/i);
      await dialog.accept();
    });

    await test.step('THEN a success message displays', async () => {
      await expect(page.locator('a,button').filter({ hasText: /^Add to cart$/i }).first()).toBeVisible();
    });
  });

  test('SCENARIO: User can view cart and complete purchase', async ({ page }) => {
    const homePage = new HomePage(page);
    const productPage = new ProductPage(page);
    const cartPage = new CartPage(page);

    await test.step('GIVEN I am on the web application', async () => {
      await homePage.goto();
    });

    await test.step('AND I have added a product to the cart', async () => {
      await homePage.openProduct('Samsung galaxy s6');
      const dialogPromise = page.waitForEvent('dialog');
      await productPage.addToCart();
      const dialog = await dialogPromise;
      expect(dialog.message().toLowerCase()).toMatch(/product added|added to cart|success/i);
      await dialog.accept();
    });

    await test.step('WHEN I click on \'Cart\'', async () => {
      await homePage.goToCart();
    });

    await test.step('THEN I am navigated to the \'Cart\' page', async () => {
      await expect(page).toHaveURL(/cart\.html$/i);
      await cartPage.expectLoaded();
    });

    await test.step('AND I can assert the product is displayed', async () => {
      await cartPage.expectItemsVisible();
    });

    await test.step('WHEN I click \'Place order\'', async () => {
      const orderModal = await cartPage.openPlaceOrderModal();
      await orderModal.fillDetails({
        name: 'Test User',
        country: 'UK',
        city: 'London',
        card: '1234567890123456',
        month: '12',
        year: '2028',
      });
    });

    await test.step('THEN the \'Place order\' module displays', async () => {
      await cartPage.placeOrderModal.expectVisible();
    });

    await test.step('WHEN I complete the details in the module', async () => {
      await cartPage.placeOrderModal.fillDetails({
        name: 'Test User',
        country: 'UK',
        city: 'London',
        card: '1234567890123456',
        month: '12',
        year: '2028',
      });
    });

    await test.step('AND click \'Purchase\'', async () => {
      await cartPage.placeOrderModal.purchase();
    });

    await test.step('THEN a success message displays', async () => {
      await expect(page.getByText(/thank you for your purchase!/i)).toBeVisible();
    });
  });
});
