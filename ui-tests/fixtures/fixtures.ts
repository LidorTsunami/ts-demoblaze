import { BrowserContext, chromium, Page, test as base } from '@playwright/test';
import { Browser } from 'playwright';
import { BasePage } from "../pages/basePage";
import { HomePage } from "../pages/homePage";
import { ProductPage } from "../pages/productPage";



export const test = base.extend<{
    newPage: BasePage;
    demoblazeHomePage: HomePage;
    productPage: ProductPage;
}>({
    // @ts-ignore
    newPage: async ({}, use) => {
        const browser: Browser = await chromium.launch({ headless: false });
        const context: BrowserContext = await browser.newContext();
        const page: Page = await context.newPage();
        const basePage = new BasePage(page);
        await use(basePage);
        await page.close();
        await context.close();
        await browser.close();
    },

    // @ts-ignore
    demoblazeHomePage: async ({ newPage }, use) => {
        const homePage = await newPage.navigateToDemoblaze();
        await use(homePage);
    },

    // @ts-ignore
    productPage: async ({ demoblazeHomePage }, use) => {
        const productPage = await demoblazeHomePage.selectProduct(0);
        await use(productPage);
    }
});
