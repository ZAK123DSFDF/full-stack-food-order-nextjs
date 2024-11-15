import { After, Before, Given, Then, When } from "@cucumber/cucumber";
import { Browser, chromium, Page } from "playwright";
import { setDefaultTimeout } from "@cucumber/cucumber";

let page: Page;
let browser: Browser;

setDefaultTimeout(50000);

Before({ tags: "@Login" }, async function () {
  browser = await chromium.launch({ headless: false, timeout: 20000 });
  const context = await browser.newContext();
  page = await context.newPage();
});

After(async function () {
  await new Promise((resolve) => setTimeout(resolve, 5000));
  await browser.close();
});

Given("I'm on the {string} page", async function (path: string) {
  await page.goto(`http://localhost:3000/${path}`);
});

When(
  "I login with credentials {string} and {string}",
  async function (email: string, password: string) {
    await page.fill("input#email", email);
    await page.fill("input#password", password);
    await page.locator("button#login").click();
  }
);

Then("I should be on the {string} page", async function (expectedPage: string) {
  const baseURL = "http://localhost:3000";

  if (expectedPage === "home") {
    await page.waitForURL(baseURL);
  } else {
    await page.waitForURL(`${baseURL}/${expectedPage}`);
  }
});
