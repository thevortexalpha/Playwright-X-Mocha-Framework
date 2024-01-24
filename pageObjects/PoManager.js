const { LoginPage } = require('../pageObjects/LoginPage.js');
const { DashboardPage } = require('../pageObjects/DashboardPage.js');
const { CartPage } = require('../pageObjects/CartPage.js');
const { PaymentPage } = require('../pageObjects/PaymentPage.js');
const { OrderSummaryPage } = require('../pageObjects/OrderSummaryPage.js');
const { OrderHistoryPage } = require('../pageObjects/OrderHistoryPage.js');
const { ViewOrderPage } = require('../pageObjects/ViewOrderPage.js');

class PoManager{

    /**
     * @param {import('@playwright/test').Page} page 
     */
    constructor(page){
        this.page=page;
        this.loginPage = new LoginPage(page);
        this.dashboardPage = new DashboardPage(page);
        this.cartPage = new CartPage(page);
        this.paymentPage = new PaymentPage(page);
        this.orderSummaryPage = new OrderSummaryPage(page);
        this.orderHistoryPage = new OrderHistoryPage(page);
        this.viewOrderPage = new ViewOrderPage(page);
    }

    getLoginPage(){
        return this.loginPage;
    }

    getdashboardPage(){
        return this.dashboardPage;
    }

    getCartPage(){
        return this.cartPage;
    }

    getPaymentPage(){
        return this.paymentPage;
    }

    getOrderSummaryPage(){
        return this.orderSummaryPage;
    }

    getorderHistoryPage(){
        return this.orderHistoryPage;
    }

    getViewOrderPage(){
        return this.viewOrderPage;
    }

}

module.exports = { PoManager };