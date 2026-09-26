import { expect, type Locator, type Page } from '@playwright/test';

export class LoginModal {
  readonly page: Page;
  readonly modal: Locator;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly closeButton: Locator;
  readonly loginButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.modal = page.locator('#logInModal');
    this.usernameInput = page.locator('#loginusername');
    this.passwordInput = page.locator('#loginpassword');
    this.closeButton = page.locator('#logInModal .close');
    this.loginButton = this.modal.getByRole('button', { name: /^log in$/i });
  }

  async expectVisible() {
    await expect(this.modal).toBeVisible();
    await expect(this.usernameInput).toBeVisible();
    await expect(this.passwordInput).toBeVisible();
    await expect(this.loginButton).toBeVisible();
  }

  async fillCredentials(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
  }

  async submit() {
    await this.loginButton.click();
  }

  async close() {
    await this.closeButton.click();
    await expect(this.modal).not.toBeVisible();
  }
}

export class SignUpModal {
  readonly page: Page;
  readonly modal: Locator;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly closeButton: Locator;
  readonly signUpButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.modal = page.locator('#signInModal');
    this.usernameInput = page.locator('#sign-username');
    this.passwordInput = page.locator('#sign-password');
    this.closeButton = page.locator('#signInModal .close');
    this.signUpButton = this.modal.getByRole('button', { name: /^sign up$/i });
  }

  async expectVisible() {
    await expect(this.modal).toBeVisible();
    await expect(this.usernameInput).toBeVisible();
    await expect(this.passwordInput).toBeVisible();
    await expect(this.signUpButton).toBeVisible();
  }

  async fillCredentials(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
  }

  async submit() {
    await this.signUpButton.click();
  }

  async close() {
    await this.closeButton.click();
    await expect(this.modal).not.toBeVisible();
  }
}

export class HomePage {
  readonly page: Page;
  readonly logoLink: Locator;
  readonly homeLink: Locator;
  readonly cartLink: Locator;
  readonly loginLink: Locator;
  readonly signUpLink: Locator;
  readonly categories: Locator;
  readonly productCards: Locator;
  readonly loginModal: LoginModal;
  readonly signUpModal: SignUpModal;

  constructor(page: Page) {
    this.page = page;
    this.logoLink = page.getByRole('link', { name: /product store/i });
    this.homeLink = page.getByRole('link', { name: /home/i });
    this.cartLink = page.locator('#cartur');
    this.loginLink = page.getByRole('link', { name: /log in/i });
    this.signUpLink = page.getByRole('link', { name: /sign up/i });
    this.categories = page.locator('#itemc');
    this.productCards = page.locator('div.card-block h4.card-title');
    this.loginModal = new LoginModal(page);
    this.signUpModal = new SignUpModal(page);
  }

  async goto() {
    await this.page.goto('/');
    await this.expectLoaded();
  }

  async expectLoaded() {
    await expect(this.page).toHaveTitle(/store/i);
    await expect(this.logoLink).toBeVisible();
    await expect(this.homeLink).toBeVisible();
  }

  async openCategory(categoryName: 'Phones' | 'Laptops' | 'Monitors') {
    const categoryLink = this.page.getByRole('link', { name: categoryName, exact: true });
    await expect(categoryLink).toBeVisible();
    await categoryLink.click();
  }

  async openProduct(productName: string) {
    const productLink = this.page.getByRole('link', { name: new RegExp(productName, 'i') }).first();
    await expect(productLink).toBeVisible();
    await productLink.click();
  }

  async openLoginModal() {
    await this.loginLink.click();
    await this.loginModal.expectVisible();
    return this.loginModal;
  }

  async openSignUpModal() {
    await this.signUpLink.click();
    await this.signUpModal.expectVisible();
    return this.signUpModal;
  }

  async goToCart() {
    await this.cartLink.click();
    await expect(this.page).toHaveURL(/cart\.html$/i);
  }
}
