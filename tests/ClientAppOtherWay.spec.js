const {test, expect} = require('@playwright/test');

test('Client application v2', async({browser}) => {
    const emailId = 'kovey86773@grassdev.com';
    const password = 'NoPeaking>--<';
    const productName = 'IPHONE 13 PRO';

    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto("https://rahulshettyacademy.com/client");

    /** Logging into the application */
    await page.getByPlaceholder("email@example.com").fill(emailId);
    await page.getByPlaceholder("enter your passsword").fill(password);
    await page.getByRole('button', {name: 'Login'}).click();

    /** Waiting for the products to load */
    await page.waitForLoadState('networkidle');
    await page.locator(".card-body b").first().waitFor();

    /** Selecting desired product to cart & Navigating to cart page*/
    await page.locator(".card-body").filter({hasText: productName}).getByRole('button', {name: 'Add To Cart'}).click();
    await page.getByRole("listitem").getByRole("button", {name: 'Cart'}).click();

    /** Validate product added in cart page & checkout the product*/
    await expect(page.getByText(productName)).toBeVisible();
    await page.getByRole("button", {name: "Checkout"}).click();

    /** Select countr & Applying coupon */
    await page.getByPlaceholder("Select Country").pressSequentially("Ind");
    await page.getByRole("button", {name: "India"}).nth(1).click();
    await page.locator("[name='coupon']").fill("rahulshettyacademy");
    await page.getByRole("button", {name: "Apply Coupon"}).click();
    await expect(page.getByText("* Coupon Applied")).toBeVisible();

    /** Placing the order */
    await page.getByText("PLACE ORDER").click();

    /** Placed order validation */
    await expect(page.getByText("Thankyou for the order.")).toBeVisible();
    
    /** Order ID retrival */
    let orderId = await page.locator("td label").nth(1).textContent();
    orderId = orderId.split('| ')[1].trim();
    console.log(`The order ID is ${orderId}`);

    /** Navigate to order history page */
    await page.locator("[routerlink='/dashboard/myorders']").nth(1).click();

    /** Opening the order details we placed now */
    await page.getByRole("row").filter({hasText: orderId}).getByRole("button", {name: "View"}).first().click();

    /** Validating the email and country name */
    await expect(page.locator("div.address p.text").first()).toContainText(emailId);
    await expect(page.locator("div.address p.text").nth(1)).toContainText('India');
})