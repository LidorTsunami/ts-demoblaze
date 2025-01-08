import { Page, Locator } from 'playwright';
import { HomePage } from './homePage';

export class BasePage {
    page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async navigateTo(url: string) {
        await this.page.goto(url);
    }

    // @ts-ignore
    async navigateToDemoblaze(): Promise<HomePage> {
        await this.page.goto("https://www.demoblaze.com/");
        return new HomePage(this.page);
    }

    // @ts-ignore
    async click(selector: string): Promise<void> {
        const element: Locator = this.page.locator(selector);
        await element.click();
    }

    // @ts-ignore
    async type(selector: string, text: string): Promise<void> {
        const input: Locator = this.page.locator(selector);
        await input.fill(text);
    }

    // @ts-ignore
    async getText(selector: string): Promise<string> {
        const element: Locator = this.page.locator(selector);
        return await element.innerText();
    }

    // @ts-ignore
    async isVisible(selector: string): Promise<boolean> {
        const element: Locator = this.page.locator(selector);
        return await element.isVisible();
    }

    // @ts-ignore
    async waitForVisible(selector: string, timeout: number = 3000): Promise<void> {
        const element: Locator = this.page.locator(selector);
        await element.waitFor({ state: 'visible', timeout });
    }

    // @ts-ignore
    async waitForHidden(selector: string, timeout: number = 3000): Promise<void> {
        const element: Locator = this.page.locator(selector);
        await element.waitFor({ state: 'hidden', timeout });
    }

    // @ts-ignore
    async waitForTimeout(milliseconds: number): Promise<void> {
        await this.page.waitForTimeout(milliseconds);
    }

    // @ts-ignore
    async verifyText(selector: string, expectedText: string): Promise<boolean> {
        const actualText = await this.getText(selector);
        return actualText === expectedText;
    }
}
