import { expect} from '@playwright/test';
import { test } from '../fixtures/fixtures';


test('all products are displayed with correct details (name, price, and image)',
    // @ts-ignore
    async ({ demoblazeHomePage }) => {
        await demoblazeHomePage.assertCardsHaveRequiredFields();
});

test('Navigate to Product',
    // @ts-ignore
    async ({ demoblazeHomePage }) => {
    const productPage = await demoblazeHomePage.selectProduct(0);
    const currentUrl = productPage.page.url();
    expect(currentUrl).toContain('prod.html');
    await productPage.validateProductDetails("Samsung galaxy s6", "$360 *includes tax", "The Samsung Galaxy S6 is powered by 1.5GHz octa-core Samsung Exynos 7420\n" +
        " processor and it comes with 3GB of RAM. The phone packs 32GB of")
});

test('Verify product details on the product page',
    // @ts-ignore
    async ({ productPage }) => {
    await productPage.addProductToCart();
    await productPage.assertProductAddedDialog("Product added");
});