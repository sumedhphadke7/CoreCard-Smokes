import { test, expect } from '@playwright/test';
import { captureStepScreenshot } from '../../Pages/utilities/screenshotUtil.spec';
import { initRuntimeData } from '../../Pages/utilities/runtimeDataManager'; //Pages/utilities/runtimeDataManager.js
import { handleModal } from '../../Pages/utilities/simpleModalHandler.spec.js';
import { validatePage } from '../../Pages/utilities/GlobalFunctions.spec.js';

import { LoginPage } from '../../Pages/CoreMoney/LoginPage.spec.js';
import { HomePage } from '../../Pages/CoreMoney/HomePage.spec.js';

// import { InventoryPage } from '../Pages/InventoryPage.spec';
// import { InventoryPage } from '../Pages/InventoryPagewithLocs.spec';
// import { DecisionInventory } from '../Pages/DecisionInventory.spec';
const testData = require('../TestData/FeatureTests/LoginScenarios.json');

test('Get Card Number from CoreMoney UI @cardDetailsUI', { tag: ['@auth', '@smoke'] }, async ({ context }, testInfo) => {

	const executionStartTime = performance.now();
	test.setTimeout(180000);

	const accountNumber = "70000001647747";
	let cardNumber = null;

	const mainPage = await context.newPage();

	const validateHomePage = mainPage.locator('div.advertizeHeader');
	const sideButton = (name) => mainPage.locator('li a span', { hasText: name });

	const homePage = new HomePage(mainPage);
	const loginPage = new LoginPage(mainPage);

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
	// await captureStepScreenshot({ page: mainPage, stepName: 'validateHomePage' }, testInfo);

	await homePage.navToSearchCardPage();
	await validatePage("Search Card");
	await expect(mainPage.locator('#txtOnlineAccountNumberNCardMgmtCardSearch')).toBeVisible({ timeout: 60000 });
	await mainPage.locator('#txtOnlineAccountNumberNCardMgmtCardSearch').pressSequentially(accountNumber, { delay: 200 });
	await mainPage.getByRole('button', { name: 'Search', exact: true }).click();


	const cardRows = mainPage.locator('#DataTables_Table_0 tbody tr');
	await expect(cardRows.first()).toBeVisible({ timeout: 30000 });

	const rowCount = await cardRows.count();
	expect(rowCount).toBeGreaterThan(0);
	console.log(`Card rows found: ${rowCount}`);

	let activeCardRow = null;

	for (let i = 0; i < rowCount; i++) {
		const row = cardRows.nth(i);
		const statusCell = row.locator('td').nth(7);
		const cardStatus = (await statusCell.textContent() || '').trim();
		console.log(`Row ${i + 1} Card Derived Status: "${cardStatus}"`);

		if (cardStatus.toLowerCase() === 'active') {
			activeCardRow = row;
			break;
		}
	}

	expect(activeCardRow).not.toBeNull();
	const activeCardRadio = activeCardRow.locator(
		'input[type="radio"][name="searchcardRadio"]'
	);

	await activeCardRadio.check();
	await expect(activeCardRadio).toBeChecked();
	console.log('Active card found and explicitly selected.');

	await mainPage.locator('#btnSelectCardNCardMgmtCardSearch_Result').click({ timeout: 50000 });

	await validatePage("Account/Card Summary");

	await expect(mainPage.locator('#txtAccountNumberNViewCard')).toHaveValue(accountNumber, { timeout: 30000 });
	await expect(mainPage.locator('#btnCardNoDecryptNViewCard')).toBeVisible({ timeout: 30000 });
	await mainPage.locator('#btnCardNoDecryptNViewCard').click();

	await expect(mainPage.locator('.modal-body')).toBeVisible({ timeout: 30000 });

	cardNumber = (await mainPage.locator('#CPMain_div').textContent())
		.replace('Card Number :', '')
		.trim();

	await mainPage.locator('#CPMain_btnlnkDecryptedFailed').click();

	const executionEndTime = performance.now();

	const executionTotalTime = executionEndTime - executionStartTime;

	// Disecting the card number into 4-4-4-4 digits each block format for our CoreMoney Card Number field
	const cardBlock1 = cardNumber.slice(0, 4);
	const cardBlock2 = cardNumber.slice(4, 8);
	const cardBlock3 = cardNumber.slice(8, 12);
	const cardBlock4 = cardNumber.slice(12, 16);


	// ----------------------------------------------------------------------------------------
	// This is just for the demonstration purpose on how the card number is exactly extracted
	console.log('-------------------------------------------------------------');
	console.log("Get Card Details API results and execution time");
	console.log('-------------------------------------------------------------');

	console.log(`Total Execution Time: ${executionTotalTime} milliseconds`);

	console.log(`Account Number: ${accountNumber}`);
	console.log(`Selected Card Number: ${cardNumber}`);

	console.log('-------------------------------------------------------------');
	console.log("Disected Card Number Blocks");
	console.log('-------------------------------------------------------------');
	console.log(`${cardBlock1} - ${cardBlock2} - ${cardBlock3} - ${cardBlock4}`);

});
