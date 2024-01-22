const {test, expect, request} = require('@playwright/test');

const { APIUtils } = require('../Utils/APIUtils.js');

const loginPayload = {userEmail: "kovey86773@grassdev.com", userPassword: "NoPeaking>--<"};
const orderPayload = {orders: [{country: "Netherlands", productOrderedId: "6581cade9fd99c85e8ee7ff5"}]};
const noOrderPayload = { data: [], message: "No Orders" };

let response;

test.beforeAll(async ()=>{
    const apiContext = await request.newContext();
    const apiUtils = new APIUtils(apiContext, loginPayload);
    response = await apiUtils.createOrder(orderPayload);
})

test('Client application', async({page})=>{
    const orderHistory = page.locator("[routerlink*='myorders']").first();

    page.addInitScript(value => {
        window.localStorage.setItem('token', value);
    }, response.token);
    
    await page.goto('https://rahulshettyacademy.com/client');

    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*", async route=>{

        const response = await page.request.fetch(route.request());
        let body = JSON.stringify(noOrderPayload);
        route.fulfill({
            response,
            body,
        })
    })

    await orderHistory.click();
    await page.waitForResponse("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*");
    console.log(await page.locator(".mt-4").textContent());
    // await page.pause();
})  