const {expect} = require('@playwright/test');
class OrderSummaryPage{

    /**
     * @param {import('@playwright/test').Page} page 
     */
    constructor(page){
        this.page = page;
        this.successText = page.locator('.hero-primary');
        this.orderIdElement = page.locator('td label').last();
        this.orderHistory = page.locator('td label').first();
    }

    async orderValidation(){
        await expect(this.successText).toContainText('Thankyou for the order.');
    }

    async orderIdRetrival(){
        const orderId = await this.orderIdElement.textContent();
        return orderId;
    }

    async navigateToOrderHistoryPage(){
        await this.orderHistory.click();
    }
}

module.exports = { OrderSummaryPage };