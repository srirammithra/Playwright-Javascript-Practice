const { test, expect, chromium } = require("@playwright/test");

test("TC07 Multi windows", async () => {
    const objBrowser = await chromium.launch();
    const objContext = await objBrowser.newContext();
    const objPage = await objContext.newPage();
    await objPage.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const [objNewPage] = await Promise.all([
        objContext.waitForEvent("page"),
        objPage.locator("xpath=//a[contains(@href, 'documents-request')]").click()
    ]);
    let varInfo = await objNewPage.locator("xpath=//p[contains(@class, 'red')]").textContent();
    console.log("Extracted info: " + varInfo);
    let varFirstArray = varInfo.split("@");
    let varSecondArray = varFirstArray[1].split(" ");
    await objPage.bringToFront();
    await objPage.locator("xpath=//input[@id='username']").type(varSecondArray[0]);
    await objPage.pause();
});