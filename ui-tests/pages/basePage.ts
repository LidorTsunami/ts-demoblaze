import { Page, Locator } from 'playwright';
import { HomePage } from './homePage';

export class BasePage {
    page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async navigateTo(url: string): Promise<void> {
        await this.page.goto(url);
    }

    async navigateToDemoblaze(): Promise<HomePage> {
        await this.page.goto("https://www.demoblaze.com/");
        return new HomePage(this.page);
    }

    async click(selector: string): Promise<void> {
        const element: Locator = this.page.locator(selector);
        await element.click();
    }

    async type(selector: string, text: string): Promise<void> {
        const input: Locator = this.page.locator(selector);
        await input.fill(text);
    }

    async getText(selector: string): Promise<string> {
        const element: Locator = this.page.locator(selector);
        return await element.innerText();
    }

    async isVisible(selector: string): Promise<boolean> {
        const element: Locator = this.page.locator(selector);
        return await element.isVisible();
    }

    async waitForVisible(selector: string, timeout: number = 3000): Promise<void> {
        const element: Locator = this.page.locator(selector);
        await element.waitFor({ state: 'visible', timeout });
    }

    async waitForHidden(selector: string, timeout: number = 3000): Promise<void> {
        const element: Locator = this.page.locator(selector);
        await element.waitFor({ state: 'hidden', timeout });
    }

    async waitForTimeout(milliseconds: number): Promise<void> {
        await this.page.waitForTimeout(milliseconds);
    }

    async verifyText(selector: string, expectedText: string): Promise<boolean> {
        const actualText = await this.getText(selector);
        return actualText === expectedText;
    }
}
