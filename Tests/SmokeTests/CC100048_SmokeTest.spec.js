import { test, expect } from '@playwright/test';
import { LoginPage } from '../../Pages/CoreMoney/LoginPage.spec.js';
import { HomePage } from '../../Pages/CoreMoney/HomePage.spec.js';
import { captureStepScreenshot } from '../../Pages/utilities/screenshotUtil.spec';
import { initRuntimeData } from '../../Pages/utilities/runtimeDataManager.js';

// import { InventoryPage } from '../Pages/InventoryPage.spec';
import { InventoryPage } from '../../Pages/CoreMoney/InventoryPagewithLocs.spec.js';
// import { DecisionInventory } from '../Pages/DecisionInventory.spec';
import { CoreIssue_HomePage } from '../../Pages/CoreIssue/CI_homePage.spec.js';

test('CC100048_SmokeTest', async ({ context }, testInfo) => {
	test.setTimeout(180000);

	const mainPage = await context.newPage();
	const secondPage = await context.newPage();

	await mainPage.bringToFront();

	initRuntimeData(testInfo); // Initialize runtime data with current test info
	// setPage(page);
	const validateHomePage = mainPage.locator('div.advertizeHeader');
	const sideButton = (name) => mainPage.locator('li a span', { hasText: name });

	const homePage = new HomePage(mainPage);
	const loginPage = new LoginPage(mainPage);
	const inventoryPage = new InventoryPage(mainPage, testInfo);

	const CIHomePage = new CoreIssue_HomePage(secondPage);
	// const decisionInventory = new DecisionInventory(mainPage);

	//User login block start
	await loginPage.navigatePage();
	await loginPage.userLogin();
	if ((await loginPage.sessionError.isVisible())) {
		await loginPage.userLogin();
	}
	await mainPage.waitForLoadState('networkidle', { timeout: 60000 });
	// await waitForAPIRequestAndResponse('UserLogin');
	await expect(mainPage.locator('div.advertizeHeader')).toBeVisible({ timeout: 60000 });
	await expect(validateHomePage).toHaveText('Convenient Cards, Inc.', { timeout: 30000 });
	await validateHomePage.hover();
	await captureStepScreenshot( {page: mainPage, stepName: 'validateHomePage'}, testInfo );

/*

	// Navigate to Inventory Dashboard & fetch data
	await homePage.navToManageInventoryPage();
	// await inventoryPage.inventoryDashboard();
	// await inventoryPage.inventoryDashboard("FIRST CENTURY BANK", "CC0001");
	await inventoryPage.inventoryDashboard(testInfo);
	await inventoryPage.InventoryTableProductSearch(testInfo);
	await sideButton('Home').click();

	await homePage.navToManageInventoryPage();
	await inventoryPage.requestInventory(testInfo);
	await sideButton('Home').click();


	await homePage.navToManageInventoryPage();
	await inventoryPage.navToSearchInventory();
	await inventoryPage.searchInventorybyOrderID(testInfo);
	await inventoryPage.decisionInventory(testInfo);
	await sideButton('Home').click();
	
	await homePage.navToManageInventoryPage();
	await inventoryPage.navToSearchInventory();
	await inventoryPage.searchInventorybyOrderID(testInfo);
	await inventoryPage.getAccountNumberFromInventoryOrder(testInfo);
*/

	/* CI verification steps to be written here */
	await secondPage.bringToFront();
	await CIHomePage.navToCILoginPage();
	await CIHomePage.loginToCI(testInfo);
	// await captureStepScreenshot({ page: secondPage, stepName: 'CILoginSuccess' }, testInfo);
	await CIHomePage.logoutCI(testInfo);

	await secondPage.close();
	await mainPage.bringToFront();
	await mainPage.waitForTimeout(10000);

	/* */

});