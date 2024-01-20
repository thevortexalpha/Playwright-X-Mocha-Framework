const {test, expect, request} = require('@playwright/test');

const loginPayload = {userEmail: "vsvatheking@gmail.com", userPassword: "Rockvibin123"};
const orderPayload = {orders: [{country: "Netherlands", productOrderedId: "6581cade9fd99c85e8ee7ff5"}]}

let token, orderId;

test.beforeAll(async ()=>{
    const apiContext = await request.newContext();
    const loginResponse = await apiContext.post(
        "https://rahulshettyacademy.com/api/ecom/auth/login", 
        {data: loginPayload}
    )
    expect(loginResponse.ok()).toBeTruthy();
    const loginResponseJson = await loginResponse.json();
    token = loginResponseJson.token;
    console.log('Token is '+token);
    
    const orderResponse = await apiContext.post(
        "https://rahulshettyacademy.com/api/ecom/order/create-order",
        {
            data: orderPayload,
            headers: {
                'Authorization': token,
                'Content-Type' : 'application/json'
            }
        }
    )
    // console.log('the response 0 is '+orderResponse);
    const orderResponseJson = await orderResponse.json();
    // console.log('the response is '+orderResponseJson);
    orderId = orderResponseJson.orders[0];
    console.log('Order id is '+orderId);
})

test('Client application', async({page})=>{
    const emailId = 'vsvatheking@gmail.com';
    const orderHistory = page.locator("[routerlink*='myorders']").first();
    const orderIds = page.locator('tbody tr th');
    const viewButton = page.locator('tbody button.btn-primary');
    const orderSummaryTitle = page.locator('div.email-title');
    const summaryEmail = page.locator('div.address p.text').first();
    const summaryCountry = page.locator('div.address p.text').nth(1);

    page.addInitScript(value => {
        window.localStorage.setItem('token', value);
    }, token);
    
    await page.goto('https://rahulshettyacademy.com/client');
    
    await orderHistory.click();
    await orderIds.nth(4).waitFor();
    // await page.locator("tbody").waitFor();
    var itemCount = await orderIds.count();
    for(var i=0; i<itemCount; i++){
        var currentText = await orderIds.nth(i).textContent();
        console.log(`The current order ID is ${currentText}`);
        if(orderId.includes(currentText)){
            await viewButton.nth(i).click();
            break;
        }
    }

    await orderSummaryTitle.waitFor();
    await expect(summaryEmail).toContainText(emailId);
    await expect(summaryCountry).toContainText('Netherlands');
})  