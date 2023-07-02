const { test, expect, chromium, request } = require("@playwright/test");
const APIUtils = require("../utils/APIUtils");
const varLoginRequestPayload = { userEmail: "srirammithra@gmail.com", userPassword: "Mar@2023" };
const varFakePayloadOrders = { data: [], message: "No Orders" };
let varTokenID;

test.beforeAll(async () => {
    const objAPIContext = await request.newContext({ ignoreHTTPSErrors: true });
    const objAPIUtils = new APIUtils(objAPIContext, varLoginRequestPayload);
    varTokenID = await objAPIUtils.GetToken();
});

test("TC16 Route Response", async () => {
    const objBrowser = await chromium.launch();
    const objContext = await objBrowser.newContext();
    const objPage = await objContext.newPage();

    await test.step("Route Response", async () => {
        objPage.addInitScript(value => {
            window.localStorage.setItem("token", value)
        }, varTokenID);
        await objPage.goto("https://rahulshettyacademy.com/client");
        await objPage.waitForTimeout(5000);
        await objPage.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/6417338f568c3e9fb1369392", async route => {
            const varResponse = await objPage.request.fetch(route.request());
            let varBody = varFakePayloadOrders;
            route.fulfill({varResponse, varBody})

        });
        await objPage.locator("xpath=//button[contains(@routerlink, 'myorders')]").click();
        await objPage.pause();
    });
});