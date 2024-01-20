const {test, expect} = require('@playwright/test');

test('Client application', async({page})=>{
    const emailId = 'kovey86773@grassdev.com';
    const productName = 'IPHONE 13 PRO';
    const cardTitles = page.locator('div.card-body b');
    const cardBody = page.locator('div.card-body'); 
    const cart = page.locator("[routerlink*='cart']");
    const cartDelete = page.locator('.btn-danger');
    const productNameCart = page.locator('div.cartSection h3');
    const checkOut = page.getByRole('button', {name: 'Checkout'});
    const coupInput = page.locator("[name='coupon']");
    const applyCoupon = page.locator("[type='submit']");
    const couponApplied = page.locator("[style='color: green;']");
    const selectCountry = page.getByPlaceholder('Select Country');
    const countryResults = page.locator('button span');
    const placeOrder = page.locator('a.btnn');
    const successText = page.locator('.hero-primary');
    const orderIdElement = page.locator('td label').last();
    const orderHistory = page.locator('td label').first();
    const orderIds = page.locator('tbody tr th');
    const viewButton = page.locator('tbody button.btn-primary');
    const orderSummaryTitle = page.locator('div.email-title');
    const summaryEmail = page.locator('div.address p.text').first();
    const summaryCountry = page.locator('div.address p.text').nth(1);
    
    await page.goto('https://rahulshettyacademy.com/client');
    await page.getByPlaceholder('email@example.com').fill(emailId);
    await page.locator('input#userPassword').fill('NoPeaking>--<');
    await page.locator("[value='Login']").click();
    await cardTitles.first().waitFor();
    console.log(await cardTitles.allTextContents());

    var itemCount = await cardBody.count();
    for(var i=0; i<itemCount; i++){
        var currentText = await cardBody.locator('b').nth(i).textContent();
        if(currentText === productName){
            await cardBody.nth(i).getByRole('button', {name: ' Add To Cart'}).click();
            break;
        }
    }

    await cart.click();
    await cartDelete.waitFor();
    await expect(productNameCart).toHaveText(productName);
    await checkOut.click();

    await coupInput.waitFor();
    await coupInput.fill('rahulshettyacademy');
    await applyCoupon.click();
    await expect(couponApplied).toContainText('Coupon Applied');

    await selectCountry.pressSequentially('Ind', {delay:100});
    await countryResults.first().waitFor();
    itemCount = await countryResults.count();
    for(var i=0; i<itemCount; i++){
        var currentText = await countryResults.nth(i).textContent();
        if(currentText === ' India'){
            await countryResults.nth(i).click();
            break;
        }
    }
    await placeOrder.click();

    await expect(successText).toContainText('Thankyou for the order.');
    const orderId = await orderIdElement.textContent();
    console.log(`The order ID is ${orderId}`);
    
    await orderHistory.click();
    await orderIds.last().waitFor();
    itemCount = await orderIds.count();
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
    await expect(summaryCountry).toContainText('India');
})