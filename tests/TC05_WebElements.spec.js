const { test, expect } = require("@playwright/test");

test("TC05 Wait, Get Multiple Text values", async ({ page }) => {
    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator("xpath=//input[@id='userEmail']").type("srirammithra@gmail.com");
    await page.locator("xpath=//input[@id='userPassword']").type("Mar@2023");
    await page.locator("xpath=//input[@id='login']").click();
    await page.waitForLoadState("networkidle");
    let varProducts = await page.locator("xpath=//div[@class='card-body']/h5/b").allTextContents();
    console.log(varProducts);
});