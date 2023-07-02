const { test, expect } = require("@playwright/test");

test("TC06 Dropdown, Radio Buttons and Checkbox", async ({ page }) => {
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    await page.locator("xpath=//select[@class='form-control']").selectOption("Consultant");
    await page.locator("xpath=//span[contains(text(), 'User')]").click();
    await page.locator("xpath=//button[@id='okayBtn']").click();
    //Print if checked
    console.log(await page.locator("xpath=//span[contains(text(), 'User')]").isChecked());
    //Assert if checked
    await expect(page.locator("xpath=//span[contains(text(), 'User')]")).toBeChecked();
    await page.locator("xpath=//input[@id='terms']").check();
    await expect(page.locator("xpath=//input[@id='terms']")).toBeChecked();
    await page.locator("xpath=//input[@id='terms']").uncheck();
    console.log(await page.locator("xpath=//input[@id='terms']").isChecked());
    expect(await page.locator("xpath=//input[@id='terms']").isChecked()).toBeFalsy();
    console.log(await page.locator("xpath=//a[contains(@href, 'documents-request')]").getAttribute("class"));
    await expect(page.locator("xpath=//a[contains(@href, 'documents-request')]")).toHaveAttribute("class", "blinkingText");
    await page.waitForTimeout(5000); 
});