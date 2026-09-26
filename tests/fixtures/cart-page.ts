import { expect, type Locator, type Page } from '@playwright/test';

export class PlaceOrderModal {
  readonly page: Page;
  readonly modal: Locator;
  readonly nameInput: Locator;
  readonly countryInput: Locator;
  readonly cityInput: Locator;
  readonly creditCardInput: Locator;
  readonly monthInput: Locator;
  readonly yearInput: Locator;
  readonly purchaseButton: Locator;
  readonly closeButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.modal = page.locator('#orderModal');
    this.nameInput = page.locator('#name');
    this.countryInput = page.locator('#country');
    this.cityInput = page.locator('#city');
    this.creditCardInput = page.locator('#card');
    this.monthInput = page.locator('#month');
    this.yearInput = page.locator('#year');
    this.purchaseButton = this.modal.getByRole('button', { name: /^purchase$/i });
    this.closeButton = this.modal.getByRole('button', { name: /^close$/i });
  }

  async expectVisible() {
    await expect(this.modal).toBeVisible();
    await expect(this.nameInput).toBeVisible();
    await expect(this.countryInput).toBeVisible();
    await expect(this.cityInput).toBeVisible();
    await expect(this.creditCardInput).toBeVisible();
    await expect(this.monthInput).toBeVisible();
    await expect(this.yearInput).toBeVisible();
    await expect(this.purchaseButton).toBeVisible();
  }

  async fillDetails(details: {
    name: string;
    country: string;
    city: string;
    card: string;
    month: string;
    year: string;
  }) {
    await this.nameInput.fill(details.name);
    await this.countryInput.fill(details.country);
    await this.cityInput.fill(details.city);
    await this.creditCardInput.fill(details.card);
    await this.monthInput.fill(details.month);
    await this.yearInput.fill(details.year);
  }

  async purchase() {
    await this.purchaseButton.click();
  }

  async close() {
    await this.closeButton.click();
    await expect(this.modal).not.toBeVisible();
  }
}

export class CartPage {
  readonly page: Page;
  readonly pageHeading: Locator;
  readonly cartTable: Locator;
  readonly cartRows: Locator;
  readonly totalLabel: Locator;
  readonly placeOrderButton: Locator;
  readonly emptyState: Locator;
  readonly placeOrderModal: PlaceOrderModal;

  constructor(page: Page) {
    this.page = page;
    this.pageHeading = page.getByRole('heading', { name: 'Products', exact: true });
    this.cartTable = page.locator('table.table');
    this.cartRows = page.locator('#tbodyid tr');
    this.totalLabel = page.locator('#totalp');
    this.placeOrderButton = page.getByRole('button', { name: /place order/i });
    this.emptyState = page.locator('#tbodyid');
    this.placeOrderModal = new PlaceOrderModal(page);
  }

  async goto() {
    await this.page.goto('/cart.html');
    await this.expectLoaded();
  }

  async expectLoaded() {
    await expect(this.pageHeading).toBeVisible();
    await expect(this.cartTable).toBeVisible();
  }

  async expectItemsVisible() {
    await expect(this.cartRows.first()).toBeVisible();
  }

  async openPlaceOrderModal() {
    await this.placeOrderButton.click();
    await this.placeOrderModal.expectVisible();
    return this.placeOrderModal;
  }
}
