import { updateRuntimeKey } from './utilities/runtimeDataManager.js';
import { InventoryPageLocators as InvL } from './locators/InventoryPage.locators.js';

const { expect } = require('@playwright/test');
const { buttonByName, waitForSpinnerToDisappear, validatePage, getInvDashboardPlasticRowData, getTimestamp } = require('./utilities/GlobalFunctions.spec.js');
const { captureStepScreenshot } = require('./utilities/screenshotUtil.spec.js');
// let plasticRowData = require('../SmokeTests/TestData/CC100048_runtime.json');
const testData = require("../SmokeTests/TestData/CC100048_SmokeTest.json");
const runtimeData = require('../SmokeTests/TestData/CC100048_runtime.json');
import { handleModal } from './utilities/simpleModalHandler.spec.js';

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

	requestInventoryCells() {
		return this.page.locator('#gvPlasticCOdeDetails tbody tr').filter({
			has: this.page.locator('td:nth-child(2)', {
				hasText: this.inventoryDetails.plasticCode
			})
		}).locator('td');
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

	async requestInventory(testInfo) {
		// const requestInventoryRow = this.page.locator('#gvPlasticCOdeDetails tbody tr').filter({ hasText: this.InventoryDashboardData.plasticCode });
		// const requestInventoryRow = this.page.locator('#gvPlasticCOdeDetails tbody tr').filter({ hasText: new RegExp(this.inventoryDetails.plasticCode, 'i') });
		// const requestInventoryRowData = requestInventoryRow.locator('td').allTextContents();
/*
		const plasticTableRows = this.page.locator('#gvPlasticCOdeDetails tbody tr').filter(
			{
				has: this.page.locator('td:nth-child(2)', {
					hasText: new RegExp(this.inventoryDetails.plasticCode, 'i')
				})
			});
		const ReqInvTablecells = plasticTableRows.locator('td');
*/

		await buttonByName('Request Inventory').click();
		await waitForSpinnerToDisappear('#dvImgContainerPL img', 30000);
		await validatePage("Request Inventory");

		await expect(this.page.locator(InvL.buttons.nextOrder)).toBeDisabled();
		await expect(this.page.locator(InvL.buttons.decisionInventory)).toBeDisabled();

		await captureStepScreenshot(this.page, 'RequestInventoryForm');
		await this.page.locator(InvL.dropdowns.branch).click();
		await this.page.locator(InvL.dropdowns.branchInput).pressSequentially(this.InventoryDashboardData.branchName, { delay: 200 });
		await this.page.getByRole('option', { name: new RegExp(this.InventoryDashboardData.branchName, 'i') }).click();

		await this.page.locator(InvL.dropdowns.product).click();
		await this.page.locator(InvL.dropdowns.productInput).pressSequentially(this.InventoryDashboardData.productName, { delay: 200 });
		await this.page.getByRole('option', { name: new RegExp(this.InventoryDashboardData.productName, 'i') }).click();

		await waitForSpinnerToDisappear('#dvImgContainerPL img', 30000);

		await expect(this.page.locator(InvL.dropdowns.shippingMode)).not.toHaveValue('', { timeout: 30000 });
		await this.page.locator(InvL.dropdowns.shippingMode).click();
		await expect(this.page.locator(`${InvL.dropdowns.shippingMode} option`, { hasText: 'Standard' })).toHaveCount(1, { timeout: 20000 });

		await expect(this.page.locator(InvL.inputs.branchCode)).toHaveValue(this.InventoryDashboardData.branchName);

		await this.page.locator(InvL.inputs.firstName).fill(this.inventoryDetails.firstName, { delay: 100 });
		await this.page.locator(InvL.inputs.lastName).fill(this.inventoryDetails.lastName, { delay: 100 });

		await this.page.locator(InvL.inputs.nameOnCard).pressSequentially(`${this.inventoryDetails.firstName} ${this.inventoryDetails.lastName}`, { delay: 100 });

		await expect(this.page.locator(InvL.inputs.nameOnCard)).toHaveValue(`${this.inventoryDetails.firstName} ${this.inventoryDetails.lastName}`);
		await this.page.locator(InvL.inputs.embossingLine).fill(this.inventoryDetails.embossingLine, { delay: 100 });
		await this.page.locator(InvL.inputs.companyName).pressSequentially(this.inventoryDetails.companyName, { delay: 100 });
		await this.page.locator(InvL.inputs.address1).fill(this.inventoryDetails.addressLine1, { delay: 100 });
		await this.page.locator(InvL.inputs.address2).fill(`${getTimestamp()}`, { delay: 100 });

		await this.page.locator(InvL.dropdowns.country).click();
		// await this.page.getByRole('option', { name: new RegExp(this.inventoryDetails.country, 'i') }).click();
		await this.page.locator(InvL.dropdowns.country).selectOption({ label: this.inventoryDetails.country });

		await this.page.locator(InvL.dropdowns.state).click();
		// await this.page.getByRole('option', { name: new RegExp(this.inventoryDetails.state, 'i') }).click();
		await this.page.locator(InvL.dropdowns.state).selectOption({ label: this.inventoryDetails.state });

		// await this.page.locator('#ddlState').click();
		// await this.page.getByRole('option', { name: new RegExp(this.inventoryDetails.state, 'i') }).click();

		await this.page.locator(InvL.inputs.city).fill(this.inventoryDetails.city, { delay: 100 });
		await this.page.locator(InvL.inputs.zipCode).fill(this.inventoryDetails.zipCode, { delay: 100 });

		await this.page.locator(InvL.dropdowns.plasticCode).click();
		// await this.page.getByRole('option', { name: new RegExp(this.inventoryDetails.plasticCode, 'i') }).click();
		await this.page.locator(InvL.dropdowns.plasticCode).selectOption({ label: this.inventoryDetails.plasticCode });

		await this.page.locator(InvL.inputs.quantity).fill(this.inventoryDetails.quantity.toString(), { delay: 100 });

		await this.page.locator(InvL.buttons.addRow).click();

		const ReqInvTablecells = this.requestInventoryCells();

		await expect(this.page.locator('#divPlasticDetails')).toBeVisible();
		// await expect(requestInventoryRowData[0]).toHaveValue(this.inventoryDetails.plasticCode, { timeout: 20000 });
		// await expect(requestInventoryRowData[2]).toHaveValue(this.inventoryDetails.quantity, { timeout: 20000 });

		await captureStepScreenshot(this.page, 'FilledRequestInventoryForm');
		
		await expect(ReqInvTablecells.first()).toBeVisible();
		await expect(ReqInvTablecells.nth(1)).toContainText(`${this.inventoryDetails.plasticCode}`);
		await expect(ReqInvTablecells.nth(3)).toHaveText(this.inventoryDetails.quantity.toString());

		// await expect(this.page.locator('#divPlasticDetails table tbody tr td', { hasText: this.inventoryDetails.plasticCode })).toBeVisible({ timeout: 20000 });
		
		await this.page.getByRole('button', { name: 'Submit' }).click();

		await handleModal(this.page, {
			expectedHeader: 'Success',
			expectedBody: 'Processed Successfully. To approve this order, click Decision Inventory button in the panel.',
			buttonName: 'Ok'
		});

		await expect(this.page.locator(InvL.order.orderIdContainer)).toBeVisible({ timeout: 10000});

		const inventoryOrderID = await this.page.locator(InvL.order.orderIdText).textContent();
		updateRuntimeKey(testInfo, 'RequestedInventoryDetails.OrderID', inventoryOrderID);

		await expect(this.page.locator(InvL.buttons.nextOrder)).toBeEnabled();
		await expect(this.page.locator(InvL.buttons.decisionInventory)).toBeEnabled();

		await this.page.locator(InvL.buttons.decisionInventory).click();
		
	}
}