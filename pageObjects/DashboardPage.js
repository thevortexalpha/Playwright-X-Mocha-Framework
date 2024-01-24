class DashboardPage{

    /**
     * @param {import('@playwright/test').Page} page 
     */
    constructor(page){
        this.page = page;
        this.cardTitles = page.locator('div.card-body b');
        this.cardBody = page.locator('div.card-body'); 
        this.cart = page.locator("[routerlink*='cart']");
    }

    async addProductToCart(productName){
        await this.cardTitles.first().waitFor();
        console.log(await this.cardTitles.allTextContents());
        var itemCount = await this.cardBody.count();
        for(var i=0; i<itemCount; i++){
            var currentText = await this.cardBody.locator('b').nth(i).textContent();
            if(currentText === productName){
                await this.cardBody.nth(i).getByRole('button', {name: ' Add To Cart'}).click();
                break;
            }
        }
    }

    async navigateToCart(){
        await this.cart.click();
    }

}

module.exports = { DashboardPage };