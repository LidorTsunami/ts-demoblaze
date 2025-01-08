import { Locator, Page } from 'playwright';
import { BasePage } from './BasePage';
import { expect } from '@playwright/test';

export class ProductPage extends BasePage {
    private productDetails: Locator; // Parent locator
    private productName: Locator;
    private productPrice: Locator;
    private productDescription: Locator;
    private addToCartButton: Locator

    constructor(page: Page) {
        super(page);
        this.productDetails = this.page.locator("#tbodyid.col-md-7.col-sm-12.col-xs-12");
        this.productName = this.productDetails.locator('.name');
        this.productPrice = this.productDetails.locator('.price-container');
        this.productDescription = this.productDetails.locator('#more-information p');
        this.addToCartButton = this.page.locator('a.btn-success.btn-lg');
    }

    // @ts-ignore
    async validateProductDetails(expectedName: string, expectedPrice: string, expectedDescription: string): Promise<void> {
        const productName = await this.productName.textContent();
        const productPrice = await this.productPrice.textContent();
        const productDescription = await this.productDescription.textContent();


        console.log(`Product Name: ${productName}`);
        console.log(`Product Price: ${productPrice}`);
        console.log(`Product Description: ${productDescription}`);

        expect(productName).toBeTruthy();
        expect(productPrice).toBeTruthy();
        expect(productDescription).toBeTruthy();


        expect(productName).toBe(expectedName);
        expect(productPrice).toContain(expectedPrice);
        expect(productDescription).toContain(expectedDescription);
    }

    // @ts-ignore
    async addProductToCart(): Promise<void> {
        console.log("Clicking 'Add to Cart' button...");
        await this.addToCartButton.click();
    }

    // @ts-ignore
    async assertProductAddedDialog(expectedMessage: string): Promise<void> {

        let dialogPromise: Promise<string>;
        // @ts-ignore
        dialogPromise = new Promise<string>((resolve) => {
            this.page.once('dialog', (dialog) => {
                console.log(`Dialog message received: ${dialog.message()}`);
                resolve(dialog.message());
                dialog.dismiss().catch(() => {
                });
            });
        });

        const dialogMessage = await dialogPromise;
        console.log(`Expected Dialog Message: ${expectedMessage}`);
        expect(dialogMessage).toBe(expectedMessage);
    }
}
