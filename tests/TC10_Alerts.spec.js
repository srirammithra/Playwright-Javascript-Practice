const { test, expect, chromium } = require("@playwright/test");

test("TC10 Alerts", async () => {
    const objBrowser = await chromium.launch();
    const objContext = await objBrowser.newContext();
    const objPage = await objContext.newPage();
    await objPage.goto("https://letcode.in/alert");
    objPage.on("dialog", (dialog) => {
        console.log("Message: " + dialog.message());
        console.log("Default: " + dialog.defaultValue());
        console.log("Type: " + dialog.type());
        dialog.accept("SIYA");
    });
    await objPage.locator("xpath=//button[@id='prompt']").click();
    await objPage.pause();
});