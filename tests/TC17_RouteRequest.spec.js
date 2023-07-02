const { test, expect, chromium, request } = require("@playwright/test");
const APIUtils = require("../utils/APIUtils");
const varLoginRequestPayload = { userEmail: "srirammithra@gmail.com", userPassword: "Mar@2023" };
let varToken;

test.beforeAll(async () => {
    const objAPIContext = await request.newContext({ ignoreHTTPSErrors: true });
    const objAPIUtils = new APIUtils(objAPIContext, varLoginRequestPayload);
    varToken = await objAPIUtils.GetToken();
});

test("TC17 Route Request", async () => {
    const objBrowser = await chromium.launch();
    const objContext = await objBrowser.newContext();
    const objPage = await objContext.newPage();

    await test.step("Route Request", async () => {
        objPage.addInitScript(value => {
            window.localStorage.setItem("token", value)
        }, varToken);
        await objPage.goto("https://rahulshettyacademy.com/client");
        await objPage.waitForTimeout(5000);
        await objPage.locator("xpath=//button[contains(@routerlink, 'myorders')]").click();
        await objPage.locator("xpath=//button[@routerlink='/dashboard']").waitFor();
        await objPage.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=642307c2568c3e9fb1413b82",
            async route => route.continue({ url: "https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=64441c66568c3e9fb15989e4" }));
        await objPage.locator("xpath=//tbody/tr").first().locator("xpath=//td/button[text()='View']").click();
        await objPage.pause();
    });
});
