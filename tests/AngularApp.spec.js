const { test, expect } = require('@playwright/test');

test('Angular application test', async function({browser}){
    const context = await browser.newContext();
    const page = await context.newPage();

    const nameField = page.locator("[name='name']").first();
    const emailField = page.locator("[name='email']");
    const passwordField = page.getByPlaceholder('Password');
    const checkBoxx = page.getByLabel('Check me out if you Love IceCreams!');
    const genderSelect = page.getByLabel('Gender');
    const employmentStatus = page.getByLabel('Employed');
    const submitButton = page.getByRole('button', {name: 'Submit'});
    const successMessage = page.getByText('Success! The Form has been submitted successfully!.');
    const shopLink = page.getByRole('link', {name: 'Shop'});
    const nokiaPhoneAdd = page.locator('app-card').filter({hasText: 'Nokia Edge'}).getByRole('button',{name:'Add'});

    await page.goto('https://rahulshettyacademy.com/angularpractice/');
    await nameField.fill('Vibin Abishek Vijayakumar');
    await emailField.fill('kovey86773@grassdev.com');
    await passwordField.fill('rahulshettyacademy');
    await checkBoxx.check();
    await genderSelect.selectOption('Male');
    await employmentStatus.check();
    await submitButton.click();
    await successMessage.click();
    await shopLink.click();
    await nokiaPhoneAdd.click();
})