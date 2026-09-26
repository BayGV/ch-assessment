import { expect, type Locator, type Page } from '@playwright/test';

export class ProductPage {
  readonly page: Page;
  readonly productName: Locator;
  readonly productPrice: Locator;
  readonly productDescription: Locator;
  readonly addToCartButton: Locator;
  readonly productImage: Locator;
  readonly pageHeading: Locator;

  constructor(page: Page) {
    this.page = page;
    this.pageHeading = page.locator('h2.name');
    this.productName = page.locator('h2.name');
    this.productPrice = page.locator('h3.price-container');
    this.productDescription = page.locator('#more-information');
    this.addToCartButton = page.locator('a,button').filter({ hasText: /^Add to cart$/i }).first();
    this.productImage = page.locator('img#imgct');
  }

  async goto(productId: string = '1') {
    await this.page.goto(`/prod.html?idp_=${productId}`);
    await this.expectLoaded();
  }

  async expectLoaded() {
    await expect(this.pageHeading).toBeVisible();
    await expect(this.productName).toBeVisible();
    await expect(this.addToCartButton).toBeVisible();
  }

  async addToCart() {
    await this.addToCartButton.click();
  }
}
