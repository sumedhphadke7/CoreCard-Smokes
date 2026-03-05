import { updateRuntimeKey } from './utilities/runtimeDataManager';
const { expect } = require('@playwright/test');
const { validatePage } = require('./utilities/utilities.spec');
import { DecisionInventoryLocators as DecInvL } from './locators/DecisionInventory.locators';
const testData = require("../SmokeTests/TestData/CC100048_SmokeTest.json");

export class DecisionInventory {
	constructor(page) {
		this.page = page;
		const rows = this.page.locator('#gvInventoryStatus table tbody tr');
		this.rows = rows;
	}

	await validatePage("Decision Inventory");

}