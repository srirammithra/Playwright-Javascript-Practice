// @ts-check
const { defineConfig, devices, chromium } = require('@playwright/test');

/**
 * @see https://playwright.dev/docs/test-configuration
 */

module.exports = defineConfig({
  testDir: './tests',
  // testMatch: ["TC01_FirstPlaywrightTest.spec.js",
  //   "TC02_BrowserPageFixture.spec.js",
  //   "TC03_WebElements.spec.js",
  //   "TC04_WebElements.spec.js",
  //   "TC05_WebElements.spec.js",
  //   "TC06_WebElements.spec.js",
  //   "TC11_HoverAndFrames.spec.js"],
  //testMatch: ["TC19_ParallelMode.spec.js"],
  timeout: 60 * 1000,
  expect: {
    timeout: 30000
  },
  retries: 1,
  workers: 3,
  reporter: [["html"], ["line"], ["allure-playwright"]],
  use: {
    headless: false,
    //browserName: "chromium",
    //channel: "chrome",
    viewport: { width: 1920, height: 1080 },
    ignoreHTTPSErrors: true,
    screenshot: "on",
    trace: "on"
  },
  projects: [
    { name: "Chromium", use: { browserName: "chromium", channel: "chrome" } },
    { name: "Firefox", use: { browserName: "firefox", channel: "firefox" } },
    { name: "Edge", use: { browserName: "chromium", channel: "msedge" } }
  ]
});

