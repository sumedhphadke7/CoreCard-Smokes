import { updateRuntimeKey } from './utilities/runtimeDataManager';
const { expect } = require('@playwright/test');
const { buttonByName, waitForSpinnerToDisappear, validatePage, getInvDashboardPlasticRowData, getTimestamp, extractRowData } = require('./utilities/GlobalFunctions.spec.js');
const { captureStepScreenshot } = require('./utilities/screenshotUtil.spec.js');

import { CardPageLocators as CardL } from './locators/CardPage.locators.js';

export class CardPage {
	constructor(page) {
		this.page = page;
	}

	async searchCardByProxyNumber() {
		await this.page.locator(CardL.inputs.proxyNumberInput).fill();
	}

}