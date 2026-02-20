import { updateRuntimeKey } from './utilities/runtimeDataManager';

const { expect } = require('@playwright/test');
const { buttonByName, waitForSpinnerToDisappear, validatePage, getInvDashboardPlasticRowData, getTimestamp } = require('../Pages/utilities/GlobalFunctions.spec');
const { captureStepScreenshot } = require('../Pages/utilities/screenshotUtil.spec');
// let plasticRowData = require('../SmokeTests/TestData/CC100048_runtime.json');
const testData = require("../SmokeTests/TestData/CC100048_SmokeTest.json");
const runtimeData = require('../SmokeTests/TestData/CC100048_runtime.json');


export class InventoryPage {
	constructor(page) {
		this.page = page;
		const rows = this.page.locator('#gvInventoryStatus table tbody tr');

		this.InventoryDashboardData = testData.InventoryDashboardData;
		// this.runtimeData = runtimeData;

		this.plasticRowData = runtimeData.plasticRowData;
		this.inventoryDetails = runtimeData.InventoryRequestorDetails;

		// this.instName = testData.instName;
		// this.branchName = testData.branchName;
		// this.productName = testData.productName;
		// this.plasticCode = testData.plasticCode;


		// const row = this.page.locator('#gvInventoryStatus tbody tr', {
		//     has: this.page.locator('td').nth(1).filter({
		//         hasText: `(${plasticCode})`
		//     })
		// });

		// (2) div(1) table tbody tr');
		this.rows = rows;
	}

	branchCodeDropdownOptions(branchName) {
		return page.locator('.ng-option-label', { hasText: this.branchName })
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

	async inventoryDashboard() {
		await buttonByName('Inventory Dashboard').click();
		await waitForSpinnerToDisappear('#dvImgContainerPL img', 30000);
		await this.page.waitForLoadState('networkidle', { timeout: 120000 });
		//        await expect(this.page.locator('div.box-name span', { hasText: "Request Inventory" })).toBeVisible();
		await expect(this.page.locator('div.box-name span span', { hasText: "Inventory Dashboard" })).toBeVisible({ timeout: 60000 });
		await this.page.locator('div select#ddlInstitutionName').click();
		await this.page.locator('div select#ddlInstitutionName').selectOption(this.InventoryDashboardData.instName);
		// await this.page.getByRole('combobox').filter({ hasText: /^$/ }).click();
		// await this.page.getByRole('combobox').filter({ hasText: /^$/ }).type(branchName, {delay: 200});
		await this.page.locator('#ddlBranchStoreName').click();
		await this.page.locator('#ddlBranchStoreName input').pressSequentially(this.InventoryDashboardData.branchName, { delay: 200 });

		// await this.branchCodeDropdownOptions(this.branchName).toBeVisible();
		// await this.branchCodeDropdownOptions(this.branchName).click();
		await this.page.getByRole('option', { name: new RegExp(this.InventoryDashboardData.branchName, 'i') }).click();

		// await this.page.getByRole('option', { hasText: 'CC0001' }).click();

		// await page.getByRole('option', { hasText: branchName }).click();

		// await this.page.locator('div#ddlBranchStoreName').click();
		// await this.page.locator('div#ddlBranchStoreName input').type(branchName);
		// await this.page.locator('.a0b506dde18d div span', { hasText : branchName} ).click();
		await expect(this.page.getByRole('textbox', { name: 'Branch Code / Store ID:' })).toHaveValue(this.InventoryDashboardData.branchName);
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

	async InventoryTableProductSearch(testInfo) {
		await this.page.locator('div#gvInventoryStatus input').pressSequentially(this.InventoryDashboardData.productName);
		// await this.page.locator('input[aria-controls="DataTables_Table_0"]').fill(productName);
		await captureStepScreenshot(this.page, `ValidateInventoryProduct-${this.InventoryDashboardData.productName}`);
		this.plasticRowData = await getInvDashboardPlasticRowData(this.InventoryDashboardData.plasticCode);
		console.log(this.plasticRowData);
		updateRuntimeKey(testInfo, 'plasticRowData', this.plasticRowData);
		updateRuntimeKey(testInfo, 'InventoryRequestorDetails.plasticCode', this.plasticRowData.plasticCode);
		this.inventoryDetails.plasticCode = this.plasticRowData.plasticCode;
	}

	async requestInventory() {
		// const requestInventoryRow = this.page.locator('#gvPlasticCOdeDetails tbody tr').filter({ hasText: this.InventoryDashboardData.plasticCode });
		const requestInventoryRow = this.page.locator('#gvPlasticCOdeDetails tbody tr').filter({ hasText: new RegExp(this.inventoryDetails.plasticCode, 'i') });
		// const requestInventoryRowData = requestInventoryRow.locator('td').allTextContents();

		const plasticTableRows = this.page.locator('#gvPlasticCOdeDetails tbody tr').filter(
			{
				has: this.page.locator('td:nth-child(2)', {
					hasText: new RegExp(this.inventoryDetails.plasticCode, 'i')
				})
			});
		const ReqInvTablecells = plasticTableRows.locator('td');


		await buttonByName('Request Inventory').click();
		await waitForSpinnerToDisappear('#dvImgContainerPL img', 30000);
		await validatePage("Request Inventory");
		await captureStepScreenshot(this.page, 'RequestInventoryForm');
		await this.page.locator('#ddlBranchStoreName').click();
		await this.page.locator('#ddlBranchStoreName input').pressSequentially(this.InventoryDashboardData.branchName, { delay: 200 });
		await this.page.getByRole('option', { name: new RegExp(this.InventoryDashboardData.branchName, 'i') }).click();

		await this.page.locator('#ddlProductName').click();
		await this.page.locator('#ddlProductName input').pressSequentially(this.InventoryDashboardData.productName, { delay: 200 });
		await this.page.getByRole('option', { name: new RegExp(this.InventoryDashboardData.productName, 'i') }).click();

		await waitForSpinnerToDisappear('#dvImgContainerPL img', 30000);

		await expect(this.page.locator('#ddlShippingMode')).not.toHaveValue('', { timeout: 30000 });
		await this.page.locator('#ddlShippingMode').click();
		await expect(this.page.locator('#ddlShippingMode option', { hasText: 'Standard' })).toHaveCount(1, { timeout: 20000 });

		await expect(this.page.locator('#txtBranchStoreCode')).toHaveValue(this.InventoryDashboardData.branchName);

		await this.page.locator('#txtFirstName').fill(this.inventoryDetails.firstName, { delay: 100 });
		await this.page.locator('#txtLastName').fill(this.inventoryDetails.lastName, { delay: 100 });

		await this.page.locator('#txtNameOnCard').pressSequentially(`${this.inventoryDetails.firstName} ${this.inventoryDetails.lastName}`, { delay: 100 });

		await expect(this.page.locator('#txtNameOnCard')).toHaveValue(`${this.inventoryDetails.firstName} ${this.inventoryDetails.lastName}`);
		await this.page.locator('#txtEmbossingLine4').fill(this.inventoryDetails.embossingLine, { delay: 100 });
		await this.page.locator('#txtFICompanyName').pressSequentially(this.inventoryDetails.companyName, { delay: 100 });
		await this.page.locator('#txtBulkShipAddress1').fill(this.inventoryDetails.addressLine1, { delay: 100 });
		await this.page.locator('#txtBulkSHipAddress2').fill(`${getTimestamp()}`, { delay: 100 });

		await this.page.locator('#ddlCountry').click();
		// await this.page.getByRole('option', { name: new RegExp(this.inventoryDetails.country, 'i') }).click();
		await this.page.locator('#ddlCountry').selectOption({ label: this.inventoryDetails.country });

		await this.page.locator('#ddlState').click();
		// await this.page.getByRole('option', { name: new RegExp(this.inventoryDetails.state, 'i') }).click();
		await this.page.locator('#ddlState').selectOption({ label: this.inventoryDetails.state });

		// await this.page.locator('#ddlState').click();
		// await this.page.getByRole('option', { name: new RegExp(this.inventoryDetails.state, 'i') }).click();

		await this.page.locator('#txtCity').fill(this.inventoryDetails.city, { delay: 100 });
		await this.page.locator('#txtZipCode').fill(this.inventoryDetails.zipCode, { delay: 100 });

		await this.page.locator('#ddlPlasticCode').click();
		// await this.page.getByRole('option', { name: new RegExp(this.inventoryDetails.plasticCode, 'i') }).click();
		await this.page.locator('#ddlPlasticCode').selectOption({ label: this.inventoryDetails.plasticCode });

		await this.page.locator('#txtOtherQuantity').fill(this.inventoryDetails.quantity.toString(), { delay: 100 });

		await this.page.locator('#btnAddRow').click();

		await expect(this.page.locator('#divPlasticDetails')).toBeVisible();
		// await expect(requestInventoryRowData[0]).toHaveValue(this.inventoryDetails.plasticCode, { timeout: 20000 });
		// await expect(requestInventoryRowData[2]).toHaveValue(this.inventoryDetails.quantity, { timeout: 20000 });

		await expect(ReqInvTablecells.nth(1)).toContainText(this.inventoryDetails.plasticCode);
		await expect(ReqInvTablecells.nth(3)).toHaveText(this.inventoryDetails.quantity.toString());

		// await expect(this.page.locator('#divPlasticDetails table tbody tr td', { hasText: this.inventoryDetails.plasticCode })).toBeVisible({ timeout: 20000 });
		await

			// await this.page.locator()

			await captureStepScreenshot(this.page, 'FilledRequestInventoryForm');

	}
}