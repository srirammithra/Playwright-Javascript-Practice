const { test, expect } = require("@playwright/test");

test("TC03 Textbox, Buttons and Get text @WEB", async ({ page }) => {
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    //Enter valid login details
    await page.locator("xpath=//input[@id='username']").type("rahulshettyacademy");
    await page.locator("xpath=//input[@id='password']").type("learning");
    await page.locator("xpath=//input[@id='signInBtn']").click();
    await page.waitForURL("**/angularpractice/shop",{timeout:6000, waitUntil:"domcontentloaded"});
    //await page.waitForTimeout(6000);
    let varPhoneLinkCount = await page.locator("xpath=//h4/a").count();
    for (let i = 0; i < varPhoneLinkCount; i++) {
        console.log(await page.locator("xpath=//h4/a").nth(i).textContent());
    }
    let varPhones = await page.locator("xpath=//h4/a").allTextContents();
    console.log(varPhones);
    console.log(varPhones.includes("Samsung Note 8"));
});