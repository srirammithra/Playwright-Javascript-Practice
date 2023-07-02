const{test, expect, chromium} = require("@playwright/test");

test("TC15 Storage State", async()=>{
    const objBrowser = await chromium.launch();
    const objContext = await objBrowser.newContext({storageState:"./storagestate/Login.json"});
    const objPage = await objContext.newPage();

    await test.step("Use Storage State", async()=>{
        await objPage.goto("https://rahulshettyacademy.com/client");
        await objPage.locator("xpath=//div[@class='card-body']").last().waitFor();
    });
});