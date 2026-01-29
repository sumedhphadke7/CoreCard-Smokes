const { expect } = require('@playwright/test');
const { buttonByName, waitForSpinnerToDisappear } = require('../Pages/utilities/GlobalFunctions.spec');

export class InventoryPage {
    constructor(page) {
        this.page = page;
    }

    branchCodeDropdownOptions(branchName) {
        return page.locator('.ng-option-label', { hasText: branchName })
    }

    async searchInventory() {
        await buttonByName(page, 'Search Inventory').click();
        //        await expect(this.page.locator('div.box-name span', { hasText: "Search Inventory" })).toBeVisible();
        await validatePage("Search Inventory");
    }

    async requestInventory() {
        await buttonByName('Request Inventory').click();
        //        await expect(this.page.locator('div.box-name span', { hasText: "Request Inventory" })).toBeVisible();
        await validatePage("Request Inventory");
    }

    async inventoryDashboard() {
        await buttonByName('Inventory Dashboard').click();
        await waitForSpinnerToDisappear('#dvImgContainerPL', 15000);
        //        await expect(this.page.locator('div.box-name span', { hasText: "Request Inventory" })).toBeVisible();
        await expect(this.page.locator('div.box-name span span', { hasText: "Inventory Dashboard" })).toBeVisible();
    }

    async inventoryDashboard(instName, branchName) {
        await buttonByName('Inventory Dashboard').click();
        //        await expect(this.page.locator('div.box-name span', { hasText: "Request Inventory" })).toBeVisible();
        await expect(this.page.locator('div.box-name span span', { hasText: "Inventory Dashboard" })).toBeVisible();
        this.page.locator('div select#ddlInstitutionName').click();
        this.page.locator('div select#ddlInstitutionName').selectOption(instName);
        // await this.page.getByRole('combobox').filter({ hasText: /^$/ }).click();
        // await this.page.getByRole('combobox').filter({ hasText: /^$/ }).type(branchName, {delay: 200});
        await this.page.locator('#ddlBranchStoreName').click();
        await this.page.locator('#ddlBranchStoreName input').pressSequentially(branchName, { delay: 200 });

        // await this.branchCodeDropdownOptions(branchName).toBeVisible();
        // await this.branchCodeDropdownOptions(branchName).click();
        await this.page.getByRole('option', { name: new RegExp(branchName, 'i') }).click();

        // await this.page.getByRole('option', { hasText: 'CC0001' }).click();

        // await page.getByRole('option', { hasText: branchName }).click();

        // await this.page.locator('div#ddlBranchStoreName').click();
        // await this.page.locator('div#ddlBranchStoreName input').type(branchName);
        // await this.page.locator('.a0b506dde18d div span', { hasText : branchName} ).click();
        await expect(this.page.getByRole('textbox', { name: 'Branch Code / Store ID:' })).toHaveValue(branchName);
        await this.page.locator('button', { hasText: "Show Inventory Details" }).click();
        await waitForSpinnerToDisappear('#dvImgContainerPL', 15000);
    }
}