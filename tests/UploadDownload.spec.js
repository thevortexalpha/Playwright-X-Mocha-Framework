const path = require('path');
const { test, expect } = require('@playwright/test');
const { ExcelMethods } = require('../Utils/ExcelMethods');

const excelMethods = new ExcelMethods();

const textSearch = "Mango";
const updateValue = "350";

test('Upload download excel validation', async({browser}) => {

    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto("https://rahulshettyacademy.com/upload-download-test/index.html");

    const downloadPromise = page.waitForEvent("download");
    await page.getByRole("button", {name: "Download"}).click();
    const download = await downloadPromise;
    const filePath = path.join(process.cwd(), 'downloads', download.suggestedFilename());
    await download.saveAs(filePath);
    await excelMethods.writeExcel("./downloads/download.xlsx", textSearch, updateValue, {rowChange: 0, colChange: 2});
    await page.locator("#fileinput").click();
    await page.locator("#fileinput").setInputFiles("./downloads/download.xlsx");
    const textLocator = page.getByText(textSearch);
    const desiredRow = page.getByRole('row').filter({has: textLocator});
    await expect(desiredRow.locator("#cell-4-undefined")).toContainText(updateValue);
})