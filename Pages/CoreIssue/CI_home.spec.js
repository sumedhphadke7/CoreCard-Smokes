export class CIHomePage {

	async navToCILoginPage(page) {
		await page.goto('https://testppcoreissue.corecard.com/handlerindexPP.html', { waitUntil: 'domcontentloaded', timeout: 45000 });
		expect(page.getByText('Please Log In')).toBeVisible({ timeout: 25000 });
	}

	async loginToCI() {
		const username = page.locator('tr:has(td:has-text("User Name")) input');
		const password = page.locator('tr:has(td:has-text("Password")) input');
		const loginBtn = page.locator('button:has-text("Login")');

		await username.pressSequentially('sumedh_ci');
		await password.pressSequentially('Test123!');
		await loginBtn.click();
	}


}
