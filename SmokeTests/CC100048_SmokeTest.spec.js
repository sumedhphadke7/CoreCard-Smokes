import { test, expect } from '@playwright/test';
import { LoginPage } from '../Pages/LoginPage.spec';
import { HomePage } from '../Pages/HomePage.spec';
import { captureStepScreenshot } from '../Pages/utilities/screenshotUtil.spec';
import { initRuntimeData } from '../Pages/utilities/runtimeDataManager.js';

// import { InventoryPage } from '../Pages/InventoryPage.spec';
import { InventoryPage } from '../Pages/InventoryPagewithLocs.spec';
// import { DecisionInventory } from '../Pages/DecisionInventory.spec';

test.only('CC100048_SmokeTest', async ({ page }, testInfo) => {
	test.setTimeout(180000);

	initRuntimeData(testInfo); // Initialize runtime data with current test info
	// setPage(page);
	const validateHomePage = page.locator('div.advertizeHeader');
	const sideButton = (name) => page.locator('li a span', { hasText: name });

	const homePage = new HomePage(page);
	const loginPage = new LoginPage(page);
	const inventoryPage = new InventoryPage(page, testInfo);
	// const decisionInventory = new DecisionInventory(page);

	//User login block start
	await loginPage.navigatePage();
	await loginPage.userLogin();
	if ((await loginPage.sessionError.isVisible())) {
		await loginPage.userLogin();
	}
	await page.waitForLoadState('networkidle', { timeout: 60000 });
	// await waitForAPIRequestAndResponse('UserLogin');
	await expect(page.locator('div.advertizeHeader')).toBeVisible({ timeout: 60000 });
	await expect(validateHomePage).toHaveText('Convenient Cards, Inc.', { timeout: 30000 });
	await validateHomePage.hover();
	await captureStepScreenshot(page, 'validateHomePage');


	/*  turn this block off for faster execution  

	// Navigate to Inventory Dashboard & fetch data
	await homePage.navToManageInventoryPage();
	// await inventoryPage.inventoryDashboard();
	// await inventoryPage.inventoryDashboard("FIRST CENTURY BANK", "CC0001");
	await inventoryPage.inventoryDashboard();
	await inventoryPage.InventoryTableProductSearch(testInfo);
	await sideButton('Home').click();

	await homePage.navToManageInventoryPage();
	await inventoryPage.requestInventory(testInfo);
	await sideButton('Home').click();


	await homePage.navToManageInventoryPage();
	await inventoryPage.navToSearchInventory();
	await inventoryPage.searchInventorybyOrderID(testInfo);
	await inventoryPage.decisionInventory(testInfo);

	*/

});