const { test, expect } = require("@playwright/test");

test.describe.configure({ mode: "parallel" });
test("TC19 Parallel Mode, Buttons and Get text", async ({ page }) => {
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

test("TC19 Parallel Mode, Get Multiple Text values", async ({ page }) => {
    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator("xpath=//input[@id='userEmail']").type("srirammithra@gmail.com");
    await page.locator("xpath=//input[@id='userPassword']").type("Mar@2023");
    await page.locator("xpath=//input[@id='login']").click();
    await page.waitForLoadState("networkidle");
    let varProducts = await page.locator("xpath=//div[@class='card-body']/h5/b").allTextContents();
    console.log(varProducts);
});