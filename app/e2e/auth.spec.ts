import { expect, Page, test } from "@playwright/test";
import jsdom from "jsdom";

import { openExportDialog } from "./unauth.spec";
import {
  BASE_URL,
  deleteCustomerByEmail,
  getTempEmail,
  getTempEmailMessage,
} from "./utils";

test.describe.configure({
  mode: "serial",
});

let email = "";

let page: Page;

test.beforeAll(async ({ browser }) => {
  page = await browser.newPage();
  await page.goto(BASE_URL);
});

test.afterAll(async () => {
  await page.close();
});

test.describe("Sign Up", () => {
  test("yearly sign-up", async () => {
    test.setTimeout(240000);
    await page.getByRole("link", { name: "Pricing" }).click();
    await expect(page).toHaveURL(`${BASE_URL}/pricing`);

    await page.getByTestId("email").click();
    email = await getTempEmail();
    await page.getByTestId("email").fill(email);
    const plan = "$30 / Year";
    await page.getByRole("radio", { name: plan }).click();

    const iframe = page.frameLocator("iframe").first();
    await iframe.getByPlaceholder("Card number").click();
    await iframe.getByPlaceholder("Card number").fill("4242 4242 4242 4242");
    await iframe.getByPlaceholder("MM / YY").fill("04 / 24");
    await iframe.getByPlaceholder("CVC").fill("444");
    await iframe.getByPlaceholder("ZIP").fill("44444");
    await page.getByRole("button", { name: "Sign Up" }).click();
    await expect(
      page.getByText(
        "Check your email for a link to log in. You can close this window."
      )
    ).toBeVisible({ timeout: 60000 });

    // wait for email
    let emails = [],
      i = 0;
    while (emails.length === 0 && i < 20) {
      // Wait 5 seconds
      await new Promise((resolve) => setTimeout(resolve, 10000));
      // Check for email
      const response = await getTempEmailMessage(email);
      if (!("error" in response)) {
        emails = response;
      }
      i++;
    }

    expect(emails.length).toBeGreaterThanOrEqual(1);
    const signInEmailIndex = emails.findIndex((email: { mail_html: string }) =>
      /supabase.co\/auth\/v1\/verify/.test(email.mail_html)
    );

    expect(signInEmailIndex).toBeGreaterThanOrEqual(0);

    // apply this to a new document to get link and then load link and confirm the Account link present
    const html = emails[signInEmailIndex].mail_html;
    const { window } = new jsdom.JSDOM(html);
    const { document } = window;
    const link = document.querySelector("a");
    expect(link).toBeTruthy();
    expect(link?.href).toBeTruthy();
    await page.goto(link?.href as string);

    // expect link with "Account" to be present
    await expect(page.getByText("Account")).toBeVisible({ timeout: 10 * 1000 });

    // TODO: delete supabase user, requires updating supabase sdk
  });

  test("Download SVG", async ({ page }) => {
    await openExportDialog(page);
    // Click [aria-label="Download SVG"]
    const [download] = await Promise.all([
      page.waitForEvent("download"),
      page.locator('[aria-label="Download SVG"]').click(),
    ]);

    expect(download.suggestedFilename()).toBe("flowchart-fun.svg");
  });

  test("can publish chart", async () => {
    // page
    await page.getByRole("link", { name: "New" }).click();

    // Make a new hosted chart
    await page.getByPlaceholder("Untitled").fill("my new chart");
    await page
      .getByRole("radio", {
        name: "Standard Stored in the cloud Accessible from any device",
      })
      .click();

    await page.getByRole("button", { name: "Create" }).click();

    // expect url to be regex BASE_URL + /u/\d+
    await expect(page).toHaveURL(new RegExp(`${BASE_URL}/u/\\d+`));

    await page.getByRole("button", { name: "Export" }).click();
    await page.getByLabel("Make publicly accessible").check();

    // read the value from the textbox with the name 'Copy Public Link'
    const publicLink = page.getByRole("textbox", {
      name: "Copy Public Link",
    });

    const publicLinkValue = await publicLink.getAttribute("value");

    if (!publicLinkValue) throw new Error("Public link value is empty");

    // navigate to public url
    await page.goto(publicLinkValue);

    // expect url to be regex BASE_URL + /p/\w+-\w+-\w+
    await expect(page).toHaveURL(new RegExp(`${BASE_URL}/p/\\w+-\\w+-\\w+`));

    // expect Clone button to be present
    await expect(page.getByRole("button", { name: "Clone" })).toBeVisible();
  });

  test("can convert chart to hosted from Might Lose Trigger", async () => {
    // Create a blank local chart
    await page.goto(`${BASE_URL}/my-new-chart`);

    // Hover [data-testid="might-lose-sponsor-trigger"] then wait for the button to appear
    await page.getByTestId("might-lose-sponsor-trigger").click();

    // Make sure the input with the label Convert to hosted chart? is checked
    await page.getByTestId("convert-to-hosted").click();

    // Add a character to make name different
    await page.getByRole("textbox").click();
    await page.getByRole("textbox").fill("my-new-chart-");

    // Rename
    await page.getByRole("button", { name: "Rename" }).click();

    // expect "/u/" to be in the url
    await expect(page).toHaveURL(new RegExp(`${BASE_URL}/u/\\d+`));
  });

  test("can create chart from prompt by instruction", async () => {
    await page.getByRole("link", { name: "New" }).click();
    await page.getByRole("radio", { name: "Prompt" }).click();
    await page.getByTestId("instruct").click();
    await page.getByTestId("prompt-entry-textarea").click();
    await page
      .getByTestId("prompt-entry-textarea")
      .fill("the stages of the water cycle");
    await page.getByRole("button", { name: "Create" }).click();
    // expect url to be regex BASE_URL + /u/\d+
    await expect(page).toHaveURL(new RegExp(`${BASE_URL}/u/\\d+`), {
      timeout: 12000,
    });
  });

  test("can create chart from prompt by extraction", async () => {
    await page.getByRole("link", { name: "New" }).click();
    await page.getByRole("radio", { name: "Prompt" }).click();
    await page.getByTestId("extract").click();
    await page.getByTestId("prompt-entry-textarea").click();
    await page
      .getByTestId("prompt-entry-textarea")
      .fill("a is greater than b but less than a");
    await page.getByRole("button", { name: "Create" }).click();
    // expect url to be regex BASE_URL + /u/\d+
    await expect(page).toHaveURL(new RegExp(`${BASE_URL}/u/\\d+`), {
      timeout: 12000,
    });
  });

  test.afterAll(async () => {
    /* This should be run in the last test */
    await deleteCustomerByEmail(email);
    console.log("deleted stripe customer: ", email);
  });
});
