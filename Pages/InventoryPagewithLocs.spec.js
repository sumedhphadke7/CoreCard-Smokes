const { expect } = require('@playwright/test');
import { getRuntimeData, updateRuntimeKey } from './utilities/runtimeDataManager.js';
import { InventoryPageLocators as InvL } from './locators/InventoryPage.locators.js';
import { handleModal } from './utilities/simpleModalHandler.spec.js';

const { buttonByName, waitForSpinnerToDisappear, validatePage, getInvDashboardPlasticRowData, getTimestamp, extractRowData } = require('./utilities/GlobalFunctions.spec.js');
const { captureStepScreenshot } = require('./utilities/screenshotUtil.spec.js');
// let plasticRowData = require('../SmokeTests/TestData/CC100048_runtime.json');

const testData = require("../SmokeTests/TestData/CC100048_SmokeTest.json");

export class InventoryPage {
	constructor(page) {
		this.page = page;
		const rows = this.page.locator('#gvInventoryStatus table tbody tr');

		this.InventoryDashboardData = testData.InventoryDashboardData;
		// this.runtimeData = runtimeData();

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

	get runtimeData() {
		return getRuntimeData(); // always latest data
	}

	branchCodeDropdownOptions(branchName) {
		return page.locator('.ng-option-label', { hasText: this.branchName })
	}

	requestInventoryCells() {
		return this.page.locator('#gvPlasticCOdeDetails tbody tr').filter({
			has: this.page.locator('td:nth-child(2)', {
				hasText: this.runtimeData.InventoryRequestorDetails.plasticCode
			})
		}).locator('td');
	}

	async navToSearchInventory() {
		await buttonByName('Search Inventory').click();
		//        await expect(this.page.locator('div.box-name span', { hasText: "Search Inventory" })).toBeVisible();
		await validatePage("Search Inventory");
	}

	async searchInventorybyOrderID(testInfo) {
		await expect(this.page.locator(InvL.pageValidator, { hasText: "Search Inventory" })).toBeVisible({ timeout: 60000 });
		await this.page.locator(InvL.order.orderIdText).fill(String(this.runtimeData.RequestedInventoryDetails.OrderID), { delay: 100 });
		await this.page.getByRole('button', { name: 'Search' }).click();
		await expect(this.page.locator(InvL.tables.orderGrid)).toBeVisible({ timeout: 25000 });
		await expect(this.page.getByRole('button', { name: 'Decision Inventory' })).toBeDisabled({ timeout: 10000 });
		const orderRowData = await extractRowData(InvL.tables.orderGridRows, this.runtimeData.RequestedInventoryDetails.OrderID);
		await captureStepScreenshot(this.page, 'SearchInventoryByOrderID');
		console.log(orderRowData);
		updateRuntimeKey(`InventoryOrders.${this.runtimeData.RequestedInventoryDetails.OrderID}`, orderRowData);
		await this.page.locator(InvL.tables.orderGridRows).filter({
			has: this.page.locator('td:nth-child(4)', {
				hasText: new RegExp(`^${this.runtimeData.RequestedInventoryDetails.OrderID}$`)
			})
		}).locator('td').nth(0).click();
		await expect(this.page.getByRole('button', { name: 'Decision Inventory' })).toBeEnabled({ timeout: 10000 });
	}

	async searchInventoryResult() { }

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
		const plasticRowData = await getInvDashboardPlasticRowData(this.InventoryDashboardData.plasticCode);
		console.log(plasticRowData);
		updateRuntimeKey('plasticRowData', plasticRowData);
		updateRuntimeKey('InventoryRequestorDetails.plasticCode', plasticRowData.plasticCode);
		// this.inventoryDetails.plasticCode = runtimeData.plasticRowData.plasticCode;
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

		await this.page.locator(InvL.inputs.firstName).fill(this.runtimeData.InventoryRequestorDetails.firstName, { delay: 100 });
		await this.page.locator(InvL.inputs.lastName).fill(this.runtimeData.InventoryRequestorDetails.lastName, { delay: 100 });

		await this.page.locator(InvL.inputs.nameOnCard).pressSequentially(`${this.runtimeData.InventoryRequestorDetails.firstName} ${this.runtimeData.InventoryRequestorDetails.lastName}`, { delay: 100 });

		await expect(this.page.locator(InvL.inputs.nameOnCard)).toHaveValue(`${this.runtimeData.InventoryRequestorDetails.firstName} ${this.runtimeData.InventoryRequestorDetails.lastName}`);
		await this.page.locator(InvL.inputs.embossingLine).fill(this.runtimeData.InventoryRequestorDetails.embossingLine, { delay: 100 });
		await this.page.locator(InvL.inputs.companyName).pressSequentially(this.runtimeData.InventoryRequestorDetails.companyName, { delay: 100 });
		await this.page.locator(InvL.inputs.address1).fill(this.runtimeData.InventoryRequestorDetails.addressLine1, { delay: 100 });
		await this.page.locator(InvL.inputs.address2).fill(`${getTimestamp()}`, { delay: 100 });

		await this.page.locator(InvL.dropdowns.country).click();
		// await this.page.getByRole('option', { name: new RegExp(this.inventoryDetails.country, 'i') }).click();
		await this.page.locator(InvL.dropdowns.country).selectOption({ label: this.runtimeData.InventoryRequestorDetails.country });

		await this.page.locator(InvL.dropdowns.state).click();
		// await this.page.getByRole('option', { name: new RegExp(this.inventoryDetails.state, 'i') }).click();
		await this.page.locator(InvL.dropdowns.state).selectOption({ label: this.runtimeData.InventoryRequestorDetails.state });

		// await this.page.locator('#ddlState').click();
		// await this.page.getByRole('option', { name: new RegExp(this.inventoryDetails.state, 'i') }).click();

		await this.page.locator(InvL.inputs.city).fill(this.runtimeData.InventoryRequestorDetails.city, { delay: 100 });
		await this.page.locator(InvL.inputs.zipCode).fill(this.runtimeData.InventoryRequestorDetails.zipCode, { delay: 100 });

		await this.page.locator(InvL.dropdowns.plasticCode).click();
		// await this.page.getByRole('option', { name: new RegExp(this.inventoryDetails.plasticCode, 'i') }).click();
		await this.page.locator(InvL.dropdowns.plasticCode).selectOption({ label: this.runtimeData.InventoryRequestorDetails.plasticCode });

		await this.page.locator(InvL.inputs.quantity).fill(this.runtimeData.InventoryRequestorDetails.quantity.toString(), { delay: 100 });

		await this.page.locator(InvL.buttons.addRow).click();

		const ReqInvTablecells = this.requestInventoryCells();

		await expect(this.page.locator('#divPlasticDetails')).toBeVisible();
		// await expect(requestInventoryRowData[0]).toHaveValue(this.inventoryDetails.plasticCode, { timeout: 20000 });
		// await expect(requestInventoryRowData[2]).toHaveValue(this.inventoryDetails.quantity, { timeout: 20000 });

		await captureStepScreenshot(this.page, 'FilledRequestInventoryForm');

		await expect(ReqInvTablecells.first()).toBeVisible();
		await expect(ReqInvTablecells.nth(1)).toContainText(`${this.runtimeData.InventoryRequestorDetails.plasticCode}`);
		await expect(ReqInvTablecells.nth(3)).toHaveText(this.runtimeData.InventoryRequestorDetails.quantity.toString());

		// await expect(this.page.locator('#divPlasticDetails table tbody tr td', { hasText: this.inventoryDetails.plasticCode })).toBeVisible({ timeout: 20000 });

		await this.page.getByRole('button', { name: 'Submit' }).click();

		await handleModal(this.page, {
			expectedHeader: 'Success',
			expectedBody: 'Processed Successfully. To approve this order, click Decision Inventory button in the panel.',
			buttonName: 'Ok'
		});

		await expect(this.page.locator(InvL.order.orderIdContainer)).toBeVisible({ timeout: 10000 });

		const inventoryOrderID = await this.page.locator(InvL.order.orderIdText).inputValue();
		console.log('Inventory OrderID:', inventoryOrderID);
		updateRuntimeKey('RequestedInventoryDetails.OrderID', inventoryOrderID);

		await expect(this.page.locator(InvL.buttons.nextOrder)).toBeEnabled();
		await expect(this.page.locator(InvL.buttons.decisionInventory)).toBeEnabled();

		// await this.page.locator(InvL.buttons.decisionInventory).click();

	}

	async decisionInventory(testInfo) {
		if (await this.page.getByRole('button', { name: 'Decision Inventory' }).isVisible({ timeout: 10000 })) {
			await this.page.getByRole('button', { name: 'Decision Inventory' }).click();
		}
		await validatePage("Decision Inventory");
		const orderId = this.runtimeData.RequestedInventoryDetails.OrderID;
		const orderData = this.runtimeData.InventoryOrders[`${orderId}`];
		
		await expect(this.page.locator(InvL.dropdowns.branch)).toHaveValue(orderData.branchStoreName, { timeout: 20000 });
		await expect(this.page.locator(InvL.dropdowns.product)).toHaveValue(orderData.productName, { timeout: 20000 });
		await expect(this.page.locator(`${InvL.tables.plasticDetailsRows} td`).nth(3)).toHaveText(orderData.numberOfCards.toString(), { timeout: 20000 });
		await expect(this.page.locator(InvL.order.orderIdText)).toHaveValue(orderId, { timeout: 20000 });
		await expect(this.page.locator(InvL.order.requestorID)).toHaveValue(orderData.requestedBy, { timeout: 20000 });
		await expect(this.page.locator(InvL.order.requestDate)).toHaveValue(orderData.requestedOn, { timeout: 20000 });
		await this.page.getByRole('button', { name: 'Approve' }).click();
		await handleModal(this.page, {
			expectedHeader: 'Success',
			expectedBody: 'Processed Successfully.',
			buttonName: 'Close'
		});
		await captureStepScreenshot(this.page, 'ApprovedInventoryRequest');
		updateRuntimeKey(`InventoryOrders.${orderId}.cardStatus`, "Approved");
	}
}