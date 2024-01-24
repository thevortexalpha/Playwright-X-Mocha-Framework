const { test } = require('@playwright/test');
const { PoManager } = require('../pageObjects/PoManager.js');
const { customTest } = require('../Utils/test-base.js');

let orderId; /**To store the order id */
const dataSet = JSON.parse(JSON.stringify(require('../Utils/PlaceHolder.json')));

for (let data of dataSet){
    test(`Ordering product name => ${data.productName}`, async({page})=>{
        const poManager = new PoManager(page);
        const loginPage = poManager.getLoginPage();
        const dashboardPage = poManager.getdashboardPage();
        const cartPage = poManager.getCartPage();
        const paymentPage = poManager.getPaymentPage();
        const orderSummaryPage = poManager.getOrderSummaryPage();
        const orderHistoryPage = poManager.getorderHistoryPage();
        const viewOrderPage = poManager.getViewOrderPage();
    
        await loginPage.goTo();
        await loginPage.validLogin(data.emailId, data.password);
        await dashboardPage.addProductToCart(data.productName);
        await dashboardPage.navigateToCart();
    
        await cartPage.checkoutProduct(data.productName);
    
        await paymentPage.applyCoupon();
        await paymentPage.selectCountryFromDropdown();
        await paymentPage.placeTheOrder();
    
        await orderSummaryPage.orderValidation();
        orderId = await orderSummaryPage.orderIdRetrival();
        await orderSummaryPage.navigateToOrderHistoryPage();
    
        await orderHistoryPage.viewOrderedItem(orderId);
    
        await viewOrderPage.orderedItemValidation(data.emailId, data.country);
    });
}
customTest.only(`Ordering a Iphone`, async({page, testDataIphone})=>{
    const poManager = new PoManager(page);
    const loginPage = poManager.getLoginPage();
    const dashboardPage = poManager.getdashboardPage();
    const cartPage = poManager.getCartPage();
    const paymentPage = poManager.getPaymentPage();
    const orderSummaryPage = poManager.getOrderSummaryPage();
    const orderHistoryPage = poManager.getorderHistoryPage();
    const viewOrderPage = poManager.getViewOrderPage();

    await loginPage.goTo();
    await loginPage.validLogin(testDataIphone.emailId, testDataIphone.password);
    await dashboardPage.addProductToCart(testDataIphone.productName);
    await dashboardPage.navigateToCart();

    await cartPage.checkoutProduct(testDataIphone.productName);

    await paymentPage.applyCoupon();
    await paymentPage.selectCountryFromDropdown();
    await paymentPage.placeTheOrder();

    await orderSummaryPage.orderValidation();
    orderId = await orderSummaryPage.orderIdRetrival();
    await orderSummaryPage.navigateToOrderHistoryPage();

    await orderHistoryPage.viewOrderedItem(orderId);

    await viewOrderPage.orderedItemValidation(testDataIphone.emailId, testDataIphone.country);
})

