import {Locator, Page} from 'playwright';
import {BasePage} from './BasePage';
import {expect} from "@playwright/test";
import {ProductPage} from "./productPage";

export class HomePage extends BasePage {
    productItems: Locator;

    constructor(page: Page) {
        super(page);
        this.productItems = this.page.locator('.col-lg-4.col-md-6.mb-4');
    }

    async assertCardsHaveRequiredFields(): Promise<void> {
        await this.productItems.first().waitFor({ state: 'visible' });
        const count = await this.productItems.count();
        console.log(`Checking if all ${count} product cards have name, price, and image`);

        for (let i = 0; i < count; i++) {
            const card = this.productItems.nth(i);


            const nameLocator = card.locator('.card-title a');
            const name = await nameLocator.textContent();
            console.log(`Product ${i + 1} Name: ${name}`);


            const priceLocator = card.locator('h5');
            const price = await priceLocator.textContent();
            console.log(`Product ${i + 1} Price: ${price}`);


            const imgLocator = card.locator('.card-img-top');
            const imgSrc = await imgLocator.getAttribute('src');
            console.log(`Product ${i + 1} Image Source: ${imgSrc}`);

            expect(name).toBeTruthy();
            expect(price).toBeTruthy();
            expect(imgSrc).not.toBeNull();
        }
    }
    async selectProduct(productNumber: number): Promise<ProductPage> {
        await this.page.locator('.card > a').nth(productNumber).click();
        return new ProductPage(this.page);
    }
}