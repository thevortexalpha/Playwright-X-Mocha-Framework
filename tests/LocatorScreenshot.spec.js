const { test, expect } = require('@playwright/test');

test.describe.configure({mode: 'parallel'});
test('Full screen screenshot', async function({browser}){
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto('https://rahulshettyacademy.com/AutomationPractice/');

    await expect(page.getByPlaceholder('Hide/Show Example')).toBeVisible();
    await page.screenshot({path:'wholescreen.png'});
    await page.locator('#hide-textbox').click();
    await expect(page.getByPlaceholder('Hide/Show Example')).toBeHidden();

});

test('Locator screenshot', async function({browser}){
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto('https://rahulshettyacademy.com/AutomationPractice/');

    await expect(page.getByPlaceholder('Hide/Show Example')).toBeVisible();
    await page.locator('#displayed-text').screenshot({path: 'inputBox.png'})
    await page.locator('#hide-textbox').click();
    await expect(page.getByPlaceholder('Hide/Show Example')).toBeHidden();

});

test('Visual testing', async function({browser}){
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto('https://www.google.com');
    expect(await page.screenshot()).toMatchSnapshot('google.png');
})