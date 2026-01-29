import { expect } from '@playwright/test';
const { setPage, buttonByName, validatePage} = require('../Pages/utilities/GlobalFunctions.spec');

export class HomePage {
    constructor(page) {
        this.page = page;
        setPage(this.page);
//        const buttonByName = (name) => this.page.locator('a.btn', { hasText: name });
    }

    // validationText(validText) {
    //     return this.page.locator('div[name="box-name"] span', { hasText: validText });
    // }

    // buttonByName(btnName) {
    //     return this.page.locator('a.btn', { hasText: btnName });
    // }

    async searchCardPage() {
        await buttonByName('Search Card').click();
        // await expect(this.validationText('Search Card')).toBeVisible();
        // await expect(this.page.locator('div.box-name span', { hasText: "Search Card" })).toBeVisible();
        await validatePage("Search Card");
    }

    async sellCardPage() {
        await buttonByName('Sell Card').click();
        await validatePage("");
        await expect(this.page.locator('div h3 span', { hasText: "Where would you like to start?" })).toBeVisible();
    }

    async manageCardPage() {
        await buttonByName('Manage Card').click();
        await expect(this.buttonByName('Load/Reload Card')).toBeVisible();
//        await expect(this.validationText('Manage Card')).toBeVisible();
//        await expect(this.page.locator('div.box-name span', { hasText: "Manage Card" })).toBeVisible();
        await validatePage("Manage Card");
    }

    async manageInventoryPage() {
        await buttonByName('Manage Inventory').click();
        await expect(this.page.locator('div.box-name span span', { hasText: "Manage Inventory" })).toBeVisible();
//        await validatePage(this.page, "Manage Inventory");

    }
}