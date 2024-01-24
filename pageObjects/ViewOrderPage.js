const { expect } = require('@playwright/test');
class ViewOrderPage{

    /**
     * @param {import('@playwright/test').Page} page 
     */
    constructor(page){
        this.page=page;
        this.orderSummaryTitle = page.locator('div.email-title');
        this.summaryEmail = page.locator('div.address p.text').first();
        this.summaryCountry = page.locator('div.address p.text').nth(1);
    }

    async orderedItemValidation(emailId, country){
        await this.orderSummaryTitle.waitFor();
        await expect(this.summaryEmail).toContainText(emailId);
        await expect(this.summaryCountry).toContainText(country);
    }
}

module.exports = { ViewOrderPage };