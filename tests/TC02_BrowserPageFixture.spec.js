const { test } = require("@playwright/test");

test("TC02 Browser Fixture @WEB", async ({ browser }) => {
    const objContext = await browser.newContext();
    const objPage = await objContext.newPage();
    await objPage.goto("https://rahulshettyacademy.com/loginpagePractise/");
});

test("TC02 Page Fixture", async ({ page }) => {
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/")
});