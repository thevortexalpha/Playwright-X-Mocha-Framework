class OrderHistoryPage{

    /**
     * @param {import('@playwright/test').Page} page 
     */
    constructor(page){
        this.page = page;
        this.orderIds = page.locator('tbody tr th');
        this.viewButton = page.locator('tbody button.btn-primary');
    }

    async viewOrderedItem(orderId){
        await this.orderIds.last().waitFor();
        var itemCount = await this.orderIds.count();
        for(var i=0; i<itemCount; i++){
            var currentText = await this.orderIds.nth(i).textContent();
            if(orderId.includes(currentText)){
                await this.viewButton.nth(i).click();
                break;
            }
        }
    }
}
module.exports = { OrderHistoryPage };