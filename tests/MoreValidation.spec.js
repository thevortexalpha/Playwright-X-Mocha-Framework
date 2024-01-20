const { test, expect } = require('@playwright/test');

test('Popup validation', async function({browser}){
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto('https://rahulshettyacademy.com/AutomationPractice/');
    // await page.goto('https://www.google.nl');
    // await page.goBack();
    // await page.goForward();

    await expect(page.getByPlaceholder('Hide/Show Example')).toBeVisible();
    await page.locator('#hide-textbox').click();
    await expect(page.getByPlaceholder('Hide/Show Example')).toBeHidden();

    page.on('dialog', dialog=>dialog.accept());
    await page.locator('#alertbtn').click();

    await page.locator('#mousehover').hover();
    
    const framePage = page.frameLocator('#courses-iframe');
    const firstCount = await framePage.locator('span.count-text:visible').first().textContent();
    console.log(firstCount);
});