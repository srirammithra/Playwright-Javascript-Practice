const { test, expect, chromium } = require("@playwright/test");

test("TC14 Storage State", async () => {
    const objBrowser = await chromium.launch();
    const objContext = await objBrowser.newContext();
    const objPage = await objContext.newPage();

    await test.step("Capture Storage State", async () => {
        await objPage.goto("https://rahulshettyacademy.com/client");
        await objPage.waitForLoadState("networkidle");
        await objPage.locator("xpath=//input[@id='userEmail']").type("srirammithra@gmail.com");
        await objPage.locator("xpath=//input[@id='userPassword']").type("Mar@2023");
        await objPage.locator("xpath=//input[@id='login']").click();
        await objPage.locator("xpath=//div[@class='card-body']").last().waitFor();
        await objContext.storageState({ path: "./storagestate/Login.json" });
    });
});