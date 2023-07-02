const { test, chromium } = require("@playwright/test");

test("TC12 File upload", async () => {
    const objBrowser = await chromium.launch();
    const objContext = await objBrowser.newContext();
    const objPage = await objContext.newPage();
    let varFile1 = "../PlaywrightPracticeMar2023/resources/1.jpg";
    let varFile2 = "../PlaywrightPracticeMar2023/resources/2.jpg";

    await test.step("Open App", async () => {
        await objPage.goto("https://the-internet.herokuapp.com/upload");
    });

    await test.step("File upload directly", async () => {
        await objPage.locator("xpath=//input[@id='file-upload']").setInputFiles(varFile1);
        await objPage.waitForTimeout(5000);
    });

    await test.step("File upload using listener", async () => {
        objPage.on("filechooser", async (filechooser) => {
            filechooser.setFiles([varFile1, varFile2]);
        });
        await objPage.locator("xpath=//div[@id='drag-drop-upload']").click({ force: true });
        await objPage.waitForTimeout(5000);
    });
});