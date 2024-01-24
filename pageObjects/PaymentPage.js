const {expect} = require('@playwright/test');
class PaymentPage{

    /**
     * @param {import('@playwright/test').Page} page 
     */
    constructor(page) {
        this.page = page;
        this.coupInput = page.locator("[name='coupon']");
        this.applyCouponEle = page.locator("[type='submit']");
        this.couponApplied = page.locator("[style='color: green;']");
        this.selectCountry = page.getByPlaceholder('Select Country');
        this.countryResults = page.locator('button span');
        this.placeOrder = page.locator('a.btnn');
    }

    async applyCoupon(){
        await this.coupInput.waitFor();
        await this.coupInput.fill('rahulshettyacademy');
        await this.applyCouponEle.click();
        await expect(this.couponApplied).toContainText('Coupon Applied');
    }

    async selectCountryFromDropdown(){
        await this.selectCountry.pressSequentially('Ind', {delay:100});
        await this.countryResults.first().waitFor();
        var itemCount = await this.countryResults.count();
        for(var i=0; i<itemCount; i++){
            var currentText = await this.countryResults.nth(i).textContent();
            if(currentText === ' India'){
                await this.countryResults.nth(i).click();
                break;
            }
        }
    }

    async placeTheOrder(){
        await this.placeOrder.click();
    }
}

module.exports = { PaymentPage };