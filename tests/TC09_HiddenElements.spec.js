const { test, expect, chromium } = require("@playwright/test")

test("TC09 Hidden Elemnets", async () => {
    const objBrowser = await chromium.launch();
    const objContext = await objBrowser.newContext();
    const objPage = await objContext.newPage();
    await objPage.goto("https://rahulshettyacademy.com/AutomationPractice/");
    await expect(objPage.locator("xpath=//input[@id='displayed-text']")).toBeVisible();
    //await objPage.screenshot({path:"./screenshots/Before.png", fullPage:true});
    expect(await objPage.screenshot()).toMatchSnapshot("./screenshots/Before.png");
    await objPage.locator("xpath=//input[@id='displayed-text']").screenshot({path:"./screenshots/Element.png"})
    await objPage.locator("xpath=//input[@value='Hide']").click();
    await expect(objPage.locator("xpath=//input[@id='displayed-text']")).toBeHidden();
    //await objPage.screenshot({path:"./screenshots/After.png", fullPage:true});
    expect(await objPage.screenshot()).toMatchSnapshot("./screenshots/After.png");
});