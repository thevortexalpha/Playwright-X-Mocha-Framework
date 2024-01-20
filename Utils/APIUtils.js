class APIUtils
{
    /**
     * @param {import('@playwright/test').Page} page 
     * @param {import('@playwright/test').Request} apiContext 
     */
    constructor(apiContext, loginPayload){
        this.apiContext = apiContext,
        this.loginPayload = loginPayload
    }
}

module.exports = { APIUtils };