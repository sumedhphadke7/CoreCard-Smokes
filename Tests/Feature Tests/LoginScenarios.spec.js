import { test, expect } from '@playwright/test';
import { captureStepScreenshot } from '../../Pages/utilities/screenshotUtil.spec';
import { initRuntimeData } from '../../Pages/utilities/runtimeDataManager'; //Pages/utilities/runtimeDataManager.js
import { LoginPage } from '../../Pages/LoginPage.spec';

// import { InventoryPage } from '../Pages/InventoryPage.spec';
// import { InventoryPage } from '../Pages/InventoryPagewithLocs.spec';
// import { DecisionInventory } from '../Pages/DecisionInventory.spec';
const testData = require('../TestData/LoginScenarios.json');;

test('Valid @auth, Login with correct credentials', async ({ page }, testInfo) => {
    test.setTimeout(180000);
    const loginPage = new LoginPage(page)

    const validateHomePage = page.locator('div.advertizeHeader');
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
    await captureStepScreenshot(page, 'validateHomePage', testInfo);

});

test('Invalid @auth, Login with incorrect credentials', async ({ page }, testInfo) => {
    test.setTimeout(180000);
    const loginPage = new LoginPage(page)

    await loginPage.navigatePage();
    await loginPage.userLoginWithCredentials(testData.invalidCredentials.username, testData.invalidCredentials.password);
    if ((await loginPage.sessionError.isVisible())) {
        await loginPage.userLoginWithCredentials(testData.invalidCredentials.username, testData.invalidCredentials.password);
    }
    // await waitForAPIRequestAndResponse('UserLogin');
    await expect(page.locator('div.advertizeHeader')).not.toBeVisible({ timeout: 60000 });
    await expect(page.locator('#lblErrorMesg', {hasText: 'Login failed. Please check your User Name and Access Code.'})).toBeVisible({ timeout: 15000 });
    await captureStepScreenshot(page, 'InvalidLogin', testInfo);

});

test('Invalid @auth, Login with incorrect password', async ({ page }, testInfo) => {
    test.setTimeout(180000);
    const loginPage = new LoginPage(page)

    await loginPage.navigatePage();
    await loginPage.userLoginWithCredentials(testData.validCredentials.username, testData.invalidCredentials.password);
    if ((await loginPage.sessionError.isVisible())) {
        await loginPage.userLoginWithCredentials(testData.validCredentials.username, testData.invalidCredentials.password);
    }
    // await waitForAPIRequestAndResponse('UserLogin');
    await expect(page.locator('div.advertizeHeader')).not.toBeVisible({ timeout: 60000 });
    await expect(page.locator('#lblErrorMesg', {hasText: 'Login failed. Please check your User Name and Access Code.'})).toBeVisible({ timeout: 15000 });
    await captureStepScreenshot(page, 'InvalidLogin', testInfo);

});

test.only('Validation @auth, Empty Field Validations', async ({ page }, testInfo) => {
    test.setTimeout(180000);
    const loginPage = new LoginPage(page)

    await loginPage.navigatePage();

    await loginPage.userLoginWithCredentials('', '');
    await captureStepScreenshot(page, 'EmptyUsername', testInfo);
    await expect(page.locator('#username + span.text-danger', {hasText: 'Required!'})).toBeVisible({ timeout: 15000 });
    await expect(page.locator('#password + span.text-danger', {hasText: 'Required!'})).toBeVisible({ timeout: 15000 });
    await page.reload();

    await loginPage.userLoginWithCredentials('username', '');
    await captureStepScreenshot(page, 'EmptyUsername', testInfo);
    await expect(page.locator('#password + span.text-danger', {hasText: 'Required!'})).toBeVisible({ timeout: 15000 });
    await page.reload();
    
    await loginPage.userLoginWithCredentials('', 'password');
    await captureStepScreenshot(page, 'EmptyPassword', testInfo);
    await expect(page.locator('#username + span.text-danger', {hasText: 'Required!'})).toBeVisible({ timeout: 15000 });


});
