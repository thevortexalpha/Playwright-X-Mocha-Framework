const {test, expect} = require('@playwright/test');

test('Client application', async({page})=>{
    const emailId = 'kovey86773@grassdev.com';
    const cardTitles = page.locator('div.card-body b');
    const orderHistory = page.locator("[routerlink*='myorders']").first();

    
    await page.goto('https://rahulshettyacademy.com/client');
    await page.getByPlaceholder('email@example.com').fill(emailId);
    await page.locator('input#userPassword').fill('NoPeaking>--<');
    await page.locator("[value='Login']").click();
    await cardTitles.first().waitFor();
    await orderHistory.click();

    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*", route=>route.continue({
        url: 'https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=65ae9f0aa86f8f74dc5db8f4'
    }));
    await page.getByRole('button', {name:'View'}).first().click();
    await expect(page.locator('p.blink_me')).toHaveText('You are not authorize to view this order');
})