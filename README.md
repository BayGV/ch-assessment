# ch-assessment
Companies House assessment solution for Senior Test Engineer role

Below outlines the rationale for the technologies used, alongside a Test Plan which will give reasoning as to what the core functionality is I have chosen to test.

Technology stack.
I have chosen to use Playwright with TypeScript to write the automation tests as Playwright is a robust tool that executes quickly, whilst having useful bundled tools within.
The built in selector options such as getByRole are very useful and make interacting with webpages simple and consistent. It is also quickly becoming an industry standard with ever growing communities and support to help with more complex implementations.

Test Plan:
The aim of this suite of tests is to validate the core functionality of the web application, these scenarios are:
- User can navigate to the home page and assert page objects display
- User can sign up for an account
- User can log in using account credentials
- User can view item details and add to cart
- User can view cart and complete purchase

These scenario's aim to validate the main user journey can be completed successfully. With the limited time/scope of this suite, it does not include visual checks, accessibility, or negative scenario's.
My rationale is based on what value the automation brings, i.e. it can run these key checks incredibly quickly, and validate the application works consistenly. This means quality is being assured automatically on the main purpose of the application.

SCENARIO: User can navigate to the home page and assert page objects display
GIVEN I am not on the web application
WHEN I navigate to the web application
THEN the home page displays

SCENARIO: User can sign up for an account
GIVEN I am on the web applcation
AND I am not signed into an account
WHEN I click 'Sign up'
THEN the 'Sign up' module displays
WHEN I complete the details in the module
AND click 'Sign up'
THEN a success message displays

SCENARIO: User can log in using account credentials
GIVEN I am on the web application
AND I am not signed into an account
AND I have valid account details
WHEN I click 'Log in'
THEN the 'Log in' module displays
WHEN I enter valid account details
AND click 'Log in'
THEN a success message displays

SCENARIO: User can view item details and add to cart
GIVEN I am on the web application home page
WHEN I click on a product card
THEN I am navigated to that products page
WHEN I click 'Add to cart'
THEN a success message displays

SCENARIO: User can view cart and complete purchase
GIVEN I am on the web application
AND I have added a product to the cart
WHEN I click on 'Cart'
THEN I am navigated to the 'Cart' page
AND I can assert the product is displayed
WHEN I click 'Place order'
THEN the 'Place order' module displays
WHEN I complete the details in the module
AND click 'Purchase'
THEN a success message displays