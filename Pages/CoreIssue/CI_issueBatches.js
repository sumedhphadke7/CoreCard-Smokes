const { expect } = require('@playwright/test');
import { captureStepScreenshot } from '../utilities/screenshotUtil.spec.js';
const { CIMenuNavigation } = require('../utilities/GlobalFunctions.spec.js');

export class CIIssueBatches {
    constructor(page) {
		this.page = page;
	}

    async forceCardEmbossing() {
        await CIMenuNavigation('Administration', 'Card Issuing', 'Issue Batches');
        
    }
}