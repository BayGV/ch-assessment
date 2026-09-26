# ch-assessment

Companies House assessment solution for the Senior Test Engineer role.

This document outlines the rationale for the technology choices and the test plan for the core user journeys covered by this automation suite.

## Technology stack

I chose to use Playwright with TypeScript to write the automation tests because Playwright is a robust, fast tool with strong built-in browser automation features.

Key reasons:

- Fast and reliable cross-browser execution
- Built-in selectors such as `getByRole` simplify page interaction
- Widely adopted in the industry with strong community support
- Clear, maintainable test structure using the Page Object Model

## Test plan

The aim of this suite is to validate the core functionality of the web application. The scenarios covered are:

- User can navigate to the home page and assert page objects display
- User can sign up for an account
- User can log in using account credentials
- User can view item details and add to cart
- User can view cart and complete purchase

These scenarios focus on the main user journey and the highest-value business flows. Given the time and scope of this exercise, the suite does not include visual checks, accessibility validation, or negative scenarios.

The rationale is based on the value automation brings: it can run these key checks quickly and consistently, helping to assure the main purpose of the application works as intended.

## Scenarios

### 1. User can navigate to the home page and assert page objects display

- GIVEN I am not on the web application
- WHEN I navigate to the web application
- THEN the home page displays

### 2. User can sign up for an account

- GIVEN I am on the web application
- AND I am not signed into an account
- WHEN I click 'Sign up'
- THEN the 'Sign up' module displays
- WHEN I complete the details in the module
- AND click 'Sign up'
- THEN a success message displays

### 3. User can log in using account credentials

- GIVEN I am on the web application
- AND I am not signed into an account
- AND I have valid account details
- WHEN I click 'Log in'
- THEN the 'Log in' module displays
- WHEN I enter valid account details
- AND click 'Log in'
- THEN a success message displays

### 4. User can view item details and add to cart

- GIVEN I am on the web application home page
- WHEN I click on a product card
- THEN I am navigated to that product's page
- WHEN I click 'Add to cart'
- THEN a success message displays

### 5. User can view cart and complete purchase

- GIVEN I am on the web application
- AND I have added a product to the cart
- WHEN I click on 'Cart'
- THEN I am navigated to the 'Cart' page
- AND I can assert the product is displayed
- WHEN I click 'Place order'
- THEN the 'Place order' module displays
- WHEN I complete the details in the module
- AND click 'Purchase'
- THEN a success message displays