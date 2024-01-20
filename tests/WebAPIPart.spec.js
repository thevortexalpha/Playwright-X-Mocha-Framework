const {test, expect, request} = require('@playwright/test');

const { APIUtils } = require('../Utils/APIUtils.js');

const loginPayload = {userEmail: "kovey86773@grassdev.com", userPassword: "NoPeaking>--<"};
const orderPayload = {orders: [{country: "Netherlands", productOrderedId: "6581cade9fd99c85e8ee7ff5"}]}

// let token, orderId;
let response;

test.beforeAll(async ()=>{
    const apiContext = await request.newContext();
    const apiUtils = new APIUtils(apiContext, loginPayload);
    response = await apiUtils.createOrder(orderPayload);
})

test('Client application', async({page})=>{
    const orderHistory = page.locator("[routerlink*='myorders']").first();
    const orderIds = page.locator('tbody tr th');
    const viewButton = page.locator('tbody button.btn-primary');
    const orderSummaryTitle = page.locator('div.email-title');
    const summaryEmail = page.locator('div.address p.text').first();
    const summaryCountry = page.locator('div.address p.text').nth(1);

    page.addInitScript(value => {
        window.localStorage.setItem('token', value);
    }, response.token);
    
    await page.goto('https://rahulshettyacademy.com/client');
    
    await orderHistory.click();
    await orderIds.nth(0).waitFor();
    var itemCount = await orderIds.count();
    for(var i=0; i<itemCount; i++){
        var currentText = await orderIds.nth(i).textContent();
        if(response.orderId.includes(currentText)){
            await viewButton.nth(i).click();
            break;
        }
    }

    await orderSummaryTitle.waitFor();
    await expect(summaryEmail).toContainText(loginPayload.userEmail);
    await expect(summaryCountry).toContainText(orderPayload.orders[0].country);
})  