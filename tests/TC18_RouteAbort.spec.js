const { test, expect, request, chromium } = require("@playwright/test");
const APIUtils = require("../utils/APIUtils");
const varLoginRequestPayload = { userEmail: "srirammithra@gmail.com", userPassword: "Mar@2023" };
let varToken;

test.beforeAll(async () => {
    const objAPIContext = await request.newContext({ ignoreHTTPSErrors: true });
    const objAPIUtils = new APIUtils(objAPIContext, varLoginRequestPayload);
    varToken = await objAPIUtils.GetToken();
});

test("TC18 Route Abort", async () => {
    const objBrowser = await chromium.launch();
    const objContext = await objBrowser.newContext();
    const objPage = await objContext.newPage();

    await test.step("Route Abort", async () => {
        await objPage.on("request", request => console.log(request.url()));
        await objPage.on("response", response => console.log(response.url() + "-" + response.status()));
        objPage.addInitScript(value => {
            window.localStorage.setItem("token", value)
        }, varToken);
        await objPage.route("**/*.{jpg,png,jpeg}", async route => route.abort());
        await objPage.goto("https://rahulshettyacademy.com/client");
        await objPage.pause();
    });
});
