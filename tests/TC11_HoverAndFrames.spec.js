const { test, expect, chromium } = require("@playwright/test");

test("TC11 Hover and Frames", async ({page}) => {
    //const objBrowser = await chromium.launch();
    //const objContext = await objBrowser.newContext();
    //const objPage = await objContext.newPage();
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    await page.locator("xpath=//button[@id='mousehover']").hover();
    await page.locator("xpath=//div[@class='mouse-hover-content']/a[text()='Reload']").click();
    await page.locator("xpath=//legend[text()='iFrame Example']").scrollIntoViewIfNeeded();
    const objFrame = page.frameLocator("#courses-iframe");
    await objFrame?.locator("xpath=(//a[text()='All Access plan'])[1]").click();
    let varText = await objFrame?.locator("xpath=//div[@class='text']/h2").textContent();
    console.log(varText);
    let varValues = varText.split(" ");
    console.log(varValues[1]);
});