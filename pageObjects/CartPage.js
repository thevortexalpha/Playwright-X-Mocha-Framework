const { expect } = require('@playwright/test');
class CartPage{
    /**
     * @param {import('@playwright/test').Page} page 
     */
    constructor(page){
        this.page = page;
        this.cartDelete = page.locator('.btn-danger');
        this.productNameCart = page.locator('div.cartSection h3');
        this.checkOut = page.getByRole('button', {name: 'Checkout'});
    }

    async checkoutProduct(productName){
        await this.cartDelete.waitFor();
        await expect(this.productNameCart).toHaveText(productName);
        await this.checkOut.click();
    }
}

module.exports = { CartPage };