const { expect } = require('@playwright/test');
import { captureStepScreenshot } from '../utilities/screenshotUtil.spec';

const testData = require('../../Tests/TestData/SmokeTests/CC100048_SmokeTest.json');  //Tests/TestData/CC100048_SmokeTest.json

export class CoreIssue_HomePage {
	constructor(page) {
		this.page = page;
	}

	async navToCILoginPage() {
		await this.page.goto('https://testppcoreissue.corecard.com/handlerindexPP.html', { waitUntil: 'domcontentloaded', timeout: 45000 });
		expect(this.page.getByText('Please Log In')).toBeVisible({ timeout: 25000 });
	}

	async loginToCI(testInfo) {
		// const username = this.page.locator('tr:has(td:has-text("User Name")) input');
		// const password = this.page.locator('tr:has(td:has-text("Password")) input');
		const loginBtn = this.page.getByRole('button',  { name: 'Login'});

		const usernameInput = this.page.locator('[name="User"]');
		const passwordInput = this.page.locator('[name="Password"]');
		await usernameInput.fill(testData.ci_credentials.username);
		await passwordInput.pressSequentially(testData.ci_credentials.password);
		await loginBtn.click();

		await expect(this.page.getByRole('heading', { name: "Find Account" })).toBeVisible({ timeout: 45000 });
		await captureStepScreenshot({ page: this.page, stepName: 'CILoginSuccess' }, testInfo);

	}

	async logoutCI(testInfo) {
		const logoutBtn = this.page.getByRole('link', { name: 'Logout' });
		await expect(logoutBtn).toBeVisible({ timeout: 20000});
		await logoutBtn.click();
		await expect(this.page.getByText(/You are now logged out\./i)).toBeVisible({ timeout: 20000});
		await captureStepScreenshot({ page: this.page, stepName: 'LogoutSuccessful' }, testInfo);
	}


}