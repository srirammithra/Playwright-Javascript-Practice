const { test, expect, chromium } = require("@playwright/test");

test("TC08 E2E Test", async () => {
  const objBrowser = await chromium.launch();
  const objContext = await objBrowser.newContext();
  const objPage = await objContext.newPage();

  await objPage.goto("https://rahulshettyacademy.com/client");
  await objPage.waitForLoadState("networkidle");
  await objPage.locator("xpath=//input[@id='userEmail']").type("srirammithra@gmail.com");
  await objPage.locator("xpath=//input[@id='userPassword']").type("Mar@2023");
  await objPage.locator("xpath=//input[@id='login']").click();
  //await objPage.waitForLoadState("domcontentloaded");
  //await objPage.pause();
  await objPage.locator("xpath=//div[@class='card-body']").last().waitFor();
  let varProducts = objPage.locator("xpath=//div[@class='card-body']");
  for (let i = 0; i < (await varProducts.count()); i++) {
    if ((await varProducts.nth(i).locator("xpath=//h5/b").textContent()) === "adidas original") {
      await varProducts.nth(i).locator("xpath=//button[contains(text(), 'Add To Cart')]").click();
      break;
    }
  }
  await objPage.locator("xpath=//li/button[contains(text(), 'Cart')]").click();
  await objPage.locator("xpath=//div//li").last().waitFor();
  expect(await objPage.locator("h3:has-text('adidas original')").isVisible()).toBeTruthy();
  await objPage.locator("xpath=//button[text()='Checkout']").click();
  await objPage.locator("xpath=//div/a[text()='Place Order ']").waitFor();
  await objPage.locator("xpath=//div[contains(text(), 'Credit Card Number')]/following-sibling::input").fill("");
  await objPage.locator("xpath=//div[contains(text(), 'Credit Card Number')]/following-sibling::input").type("4012999999999999", { delay: 300 });
  await objPage.locator("xpath=//div[contains(text(), 'Expiry Date')]/following-sibling::select").first().selectOption("10");
  await objPage.locator("xpath=//div[contains(text(), 'Expiry Date')]/following-sibling::select").last().selectOption("25");
  await objPage.locator("xpath=//div[contains(text(), 'Name on Card')]/following-sibling::input").type("SIYA");
  console.log(await objPage.locator("xpath=//div[contains(@class, 'user')]/input").inputValue());
  await objPage.locator("xpath=//input[@placeholder='Select Country']").type("India", { delay: 300 });
  await objPage.locator("xpath=//section[contains(@class, 'ta-results')]//button[span[text()=' India']]").dblclick();
  await objPage.locator("xpath=//div/a[text()='Place Order ']").click();
  await objPage.waitForLoadState("networkidle");
  let varSuccessMSG = await objPage.locator("xpath=//h1[@class='hero-primary']").textContent();
  varSuccessMSG = varSuccessMSG.trim();
  await expect(varSuccessMSG).toBe("Thankyou for the order.");
  let varOrderID = await objPage.locator("xpath=//label[@class='ng-star-inserted']").textContent();
  varOrderID = varOrderID.replaceAll("|", "");
  varOrderID = varOrderID.trim();
  await objPage.locator("xpath=//button[contains(@routerlink, 'myorders')]").click();
  await objPage.locator("xpath=//button[@routerlink='/dashboard']").waitFor();
  debugger
  let varOrderRows = await objPage.locator("xpath=//tbody/tr");
  for (let i = 1; i <= await varOrderRows.count(); i++) {
    let varRowOrderID = await varOrderRows.nth(i).locator("th").textContent();
    if (varRowOrderID === varOrderID) {
      await varOrderRows.nth(i).locator("xpath=//td/button[text()='View']").click();
      break;
    }
  }
  await objPage.locator("xpath=//div[@class='email-title']").waitFor();
  await expect(objPage.locator("xpath=//div/small[text()='Order Id']/following-sibling::div")).toHaveText(varOrderID);
  await objPage.pause();
});
