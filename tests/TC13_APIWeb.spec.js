const { test, expect, request, chromium } = require("@playwright/test");
const APIUtils = require("../utils/APIUtils");
const varLoginRequestPayload = { userEmail: "srirammithra@gmail.com", userPassword: "Mar@2023" };
const varCreateOrderPayload = { orders: [{ country: "India", productOrderedId: "6262e9d9e26b7e1a10e89c04" }] };
let varToken;
let varOrderID;

test.beforeAll(async () => {
    const objAPIContext = await request.newContext({ ignoreHTTPSErrors: true });
    const objAPIUtils = new APIUtils(objAPIContext, varLoginRequestPayload);
    varToken = await objAPIUtils.GetToken();
    varOrderID = await objAPIUtils.CreateOrderID(varCreateOrderPayload);
});

test("TC13 API Web", async () => {
    const objBrowser = await chromium.launch();
    const objContext = await objBrowser.newContext();
    const objPage = await objContext.newPage();

    await test.step("Use API to login", async () => {
        objPage.addInitScript(value => {
            window.localStorage.setItem("token", value)
        }, varToken);
        await objPage.goto("https://rahulshettyacademy.com/client");
        await objPage.waitForTimeout(5000);
        await objPage.locator("xpath=//button[contains(@routerlink, 'myorders')]").click();
        await objPage.locator("xpath=//button[@routerlink='/dashboard']").waitFor();
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


});