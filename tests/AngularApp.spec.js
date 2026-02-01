import 'dotenv/config'
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

    await page.goto(process.env.ANGULAR_PRACTICE);
    await nameField.fill(process.env.AP_USERNAME);
    await emailField.fill(process.env.AP_EMAIL);
    await passwordField.fill(process.env.AP_PASSWORD);
    await checkBoxx.check();
    await genderSelect.selectOption('Male');
    await employmentStatus.check();
    await submitButton.click();
    await successMessage.click();
    await shopLink.click();
    await nokiaPhoneAdd.click();
})