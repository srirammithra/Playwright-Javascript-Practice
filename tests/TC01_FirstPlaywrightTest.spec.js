const { test, chromium } = require("@playwright/test");

test("TC01 First Playwright Test @WEB", async () => {
    const objBrowser = await chromium.launch({ headless: false, channel: "chrome" });
    const objContext = await objBrowser.newContext();
    const objPage = await objContext.newPage();
    await objPage.goto("https://rahulshettyacademy.com/loginpagePractise/");
});