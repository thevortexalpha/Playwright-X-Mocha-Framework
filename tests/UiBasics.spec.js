const { test, expect } =  require('@playwright/test');

test('Browser context fixture', async ({browser})=>{
    const context = await browser.newContext();
    const page = await context.newPage();

    const userName = page.locator('input#username');
    const signInButton = page.locator('[name="signin"]')
    const cardTitles = page.locator('div.card-body a');

    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    console.log(await page.title());
    await expect(page).toHaveTitle('LoginPage Practise | Rahul Shetty Academy');
    await userName.fill('vsvatheking');
    await page.locator('input#password').fill('learning');
    await signInButton.click();
    await expect(page.locator('[style*="block"]')).toContainText('Incorrect');
    await userName.fill('rahulshettyacademy');
    await signInButton.click();
    await expect(cardTitles.first()).toHaveText('iphone X');
});

test.only('UI Basics ', async ({browser})=>{
    const context = await browser.newContext();
    const page = await context.newPage();

    const userName = page.locator('input#username');
    const signInButton = page.locator('[name="signin"]');
    const roleSelector = page.locator('select.form-control');
    const checkMarks = page.locator('span.checkmark');
    const okayButton = page.locator('button.btn-success');
    const termsCheckbox = page.locator('#terms');
    const documentLink = page.locator("[href*='documents-request']");

    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    await roleSelector.selectOption('consult');
    await checkMarks.last().click();
    await okayButton.click();
    await termsCheckbox.check();
    await expect(termsCheckbox).toBeChecked();
    await termsCheckbox.uncheck();
    expect(await termsCheckbox.isChecked()).toBeFalsy();
    await expect(documentLink).toHaveAttribute('class', 'blinkingText');

    const [secondPage] = await Promise.all([
        context.waitForEvent('page'),
        documentLink.click()
    ]);

    const textContent = await secondPage.locator('p.red').textContent();
    const theDomainName = textContent.split('@')[1].split(' ')[0];
    console.log(`The domain name is ${theDomainName}`);
    await userName.fill(theDomainName);
})