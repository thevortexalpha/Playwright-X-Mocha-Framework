class LoginPage{

    /**
     * @param {import('@playwright/test').Page} page 
     */
    constructor(page){
        this.page = page;
        this.emailField = page.getByPlaceholder('email@example.com');
        this.passwordField = page.locator('input#userPassword');
        this.signInButton = page.locator("[value='Login']");
    }

    async goTo(){
        await this.page.goto('https://rahulshettyacademy.com/client');
    }

    async validLogin(emailId, password){
        await this.emailField.fill(emailId);
        await this.passwordField.fill(password);
        await this.signInButton.click();
    }
}

module.exports = { LoginPage }