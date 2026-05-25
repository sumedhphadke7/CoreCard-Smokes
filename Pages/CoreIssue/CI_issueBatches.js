const { expect } = require('@playwright/test');
import { captureStepScreenshot } from '../utilities/screenshotUtil.spec.js';
const { CoreIssueMenuNavigation } = require('../utilities/GlobalFunctions.spec.js');

export class CoreIssue_IssueBatches {
    constructor(page) {
		this.page = page;
	}

    async forceCardEmbossing() {
        await CoreIssueMenuNavigation(this.page, 'Administration', 'Card Issuing', 'Issue Batches');

        await expect(this.page.getByRole('heading', { name: /^\s*Issue Batches\s*$/ })).toBeVisible({ timeout: 30000 });
        
    }
}