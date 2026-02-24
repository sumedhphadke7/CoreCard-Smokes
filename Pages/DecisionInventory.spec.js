import { updateRuntimeKey } from './utilities/runtimeDataManager';
const { expect } = require('@playwright/test');

export class InventoryPage {
	constructor(page) {
		this.page = page;
		const rows = this.page.locator('#gvInventoryStatus table tbody tr');
		this.rows = rows;
	}
}