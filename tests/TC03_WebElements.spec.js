const { test, expect } = require("@playwright/test");

test("TC03 Textbox, Buttons and Get text @WEB", async ({ page }) => {
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    await page.locator("xpath=//input[@id='username']").type("SRIRAM");
    await page.locator("xpath=//input[@id='password']").type("A1234");
    await page.locator("xpath=//input[@id='signInBtn']").click();
    //console.log(await page.locator("[style*='block']").textContent());
    await expect(page.locator("[style*='block']")).toContainText("Incorrect");
    //Clear text in textbox
    //await page.pause();
    await page.locator("xpath=//input[@id='username']").fill("");
    await page.locator("xpath=//input[@id='password']").fill("");
});