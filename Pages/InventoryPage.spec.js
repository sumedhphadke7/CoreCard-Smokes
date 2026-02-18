const { expect } = require('@playwright/test');
const { buttonByName, waitForSpinnerToDisappear, getPlasticRowData  } = require('../Pages/utilities/GlobalFunctions.spec');
const { captureStepScreenshot } = require('../Pages/utilities/screenshotUtil.spec');

export class InventoryPage {
    constructor(page) {
        this.page = page;
        const rows = this.page.locator('#gvInventoryStatus table tbody tr');

        // const row = this.page.locator('#gvInventoryStatus tbody tr', {
        //     has: this.page.locator('td').nth(1).filter({
        //         hasText: `(${plasticCode})`
        //     })
        // });

        // (2) div(1) table tbody tr');
        this.rows = rows;
    }

    branchCodeDropdownOptions(branchName) {
        return page.locator('.ng-option-label', { hasText: branchName })
    }

    async searchInventory() {
        await buttonByName('Search Inventory').click();
        //        await expect(this.page.locator('div.box-name span', { hasText: "Search Inventory" })).toBeVisible();
        await validatePage("Search Inventory");
    }

    async requestInventory() {
        await buttonByName('Request Inventory').click();
        //        await expect(this.page.locator('div.box-name span', { hasText: "Request Inventory" })).toBeVisible();
        await validatePage("Request Inventory");
    }

    // async inventoryDashboard() {
    //     await buttonByName('Inventory Dashboard').click();
    //     await waitForSpinnerToDisappear('#dvImgContainerPL img', 30000);
    //     //        await expect(this.page.locator('div.box-name span', { hasText: "Request Inventory" })).toBeVisible();
    //     await expect(this.page.locator('div.box-name span span', { hasText: "Inventory Dashboard" })).toBeVisible();
    // }

    async inventoryDashboard(instName, branchName) {
        await buttonByName('Inventory Dashboard').click();
        await waitForSpinnerToDisappear('#dvImgContainerPL img', 30000);
        await this.page.waitForLoadState('networkidle', { timeout: 120000 });
        //        await expect(this.page.locator('div.box-name span', { hasText: "Request Inventory" })).toBeVisible();
        await expect(this.page.locator('div.box-name span span', { hasText: "Inventory Dashboard" })).toBeVisible({ timeout: 60000 });
        await this.page.locator('div select#ddlInstitutionName').click();
        await this.page.locator('div select#ddlInstitutionName').selectOption(instName);
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
        // await this.page.locator('button', { hasText: "Show Inventory Details" }).click();

        // await Promise.all([
        //     this.page.locator('button', { name: 'Show Inventory Details' }).first().click(),
        //     waitForSpinnerToDisappear('#dvImgContainerPL img'),
        //     // waitForAPIRequestAndResponse('/GetInventoryStatus'),
        // ]);
        await this.page.locator('button', { name: 'Show Inventory Details' }).first().click();
        await this.page.waitForLoadState('networkidle', { timeout: 120000 });
        // await expect(this.page.locator('div#gvInventoryStatus')).toBeAttached({ timeout: 90000 });
        await this.page.locator('div#gvInventoryStatus').waitFor({ state: 'visible', timeout: 150000 });
        // await expect.poll(() => this.page.locator('div#gvInventoryStatus'), { timeout: 90000 }).toBeVisible();
        await expect(this.page.locator('div#gvInventoryStatus')).toBeVisible({ timeout: 90000 });
        // await this.page.locator('button', { name: 'Show Inventory Details' }).first().click();
        // await waitForSpinnerToDisappear('#dvImgContainerPL img', 45000);
        // await this.page.waitForLoadState('networkidle', {timeout: 60000} );
        // await waitForAPIRequestAndResponse('GetInventoryStatus', 60000);

        await expect(this.rows.last()).toBeVisible();

        await captureStepScreenshot(this.page, 'ValidateInventoryDashboard');

    }

    async InventoryTableProductSearch(productName, plasticCode) {
        await this.page.locator('div#gvInventoryStatus input').pressSequentially(productName);
        // await this.page.locator('input[aria-controls="DataTables_Table_0"]').fill(productName);
        await captureStepScreenshot(this.page, `ValidateInventoryProduct-${productName}`);
        const plasticRowData = await getPlasticRowData(plasticCode);
        console.log(plasticRowData);
    }
}