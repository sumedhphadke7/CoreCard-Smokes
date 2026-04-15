import { test, expect } from '@playwright/test';
import { captureStepScreenshot } from '../../Pages/utilities/screenshotUtil.spec';
import { initRuntimeData } from '../../Pages/utilities/runtimeDataManager'; //Pages/utilities/runtimeDataManager.js
import { LoginPage } from '../../Pages/LoginPage.spec';

// import { InventoryPage } from '../Pages/InventoryPage.spec';
// import { InventoryPage } from '../Pages/InventoryPagewithLocs.spec';
// import { DecisionInventory } from '../Pages/DecisionInventory.spec';
const testData = require('../TestData/FeatureTests/LoginScenarios.json');

test('Login with correct credentials', { tag: ['@auth', '@smoke'] } , async ({ page }, testInfo) => {
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
    await captureStepScreenshot( {page, testInfo, stepName: 'validateHomePage'} );
});

test('Login with incorrect credentials', { tag: ['@auth', '@smoke'] }, async ({ page }, testInfo) => {
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
    await captureStepScreenshot( {page, testInfo, stepName: 'InvalidLogin'} );
});

test('Login with incorrect password', { tag: ['@auth', '@smoke'] }, async ({ page }, testInfo) => {
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
    await captureStepScreenshot( {page, testInfo, stepName: 'InvalidPassword'} );
});

test('Empty Field Validations', { tag: ['@auth', '@smoke'] }, async ({ page }, testInfo) => {
    test.setTimeout(180000);
    const loginPage = new LoginPage(page)

    await loginPage.navigatePage();

    await loginPage.userLoginWithCredentials('', '');
    await captureStepScreenshot( {page, testInfo, stepName: 'EmptyFields'} );
    await expect(page.locator('#username + span.text-danger', {hasText: 'Required!'})).toBeVisible({ timeout: 15000 });
    await expect(page.locator('#password + span.text-danger', {hasText: 'Required!'})).toBeVisible({ timeout: 15000 });
    await page.reload();

    await loginPage.userLoginWithCredentials('username', '');
    await captureStepScreenshot( {page, testInfo, stepName: 'EmptyUsername'} );
    await expect(page.locator('#password + span.text-danger', {hasText: 'Required!'})).toBeVisible({ timeout: 15000 });
    await page.reload();
    
    await loginPage.userLoginWithCredentials('', 'password');
    await captureStepScreenshot( {page, testInfo, stepName: 'EmptyPassword'} );
    await expect(page.locator('#username + span.text-danger', {hasText: 'Required!'})).toBeVisible({ timeout: 15000 });
});

test('Login with locked user credentials', { tag: ['@auth', '@smoke'] }, async ({ page }, testInfo) => {
    test.setTimeout(180000);
    const loginPage = new LoginPage(page)

    await loginPage.navigatePage();
    await loginPage.userLoginWithCredentials(testData.lockedUser.username, testData.lockedUser.password);
    if ((await loginPage.sessionError.isVisible())) {
        await loginPage.userLoginWithCredentials(testData.lockedUser.username, testData.lockedUser.password);
    }
    // await waitForAPIRequestAndResponse('UserLogin');
    await expect(page.locator('div.advertizeHeader')).not.toBeVisible({ timeout: 60000 });
    await expect(page.locator('#lblErrorMesg', {hasText: 'Your account has been locked. Kindly contact system administrator to activate your account.'})).toBeVisible({ timeout: 15000 });
    await captureStepScreenshot( {page, testInfo, stepName: 'LockedUserLogin'} );
});

test('Session Retention on Refresh', { tag: ['@auth', '@smoke'] } , async ({ page }, testInfo) => {
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
    await captureStepScreenshot( {page, testInfo, stepName: 'validateHomePage-beforeRefresh'} );

    // Refresh the page
    await page.reload();
    await page.waitForLoadState('networkidle', { timeout: 60000 });
    await expect(page.locator('div.advertizeHeader')).toBeVisible({ timeout: 60000 });
    await expect(validateHomePage).toHaveText('Convenient Cards, Inc.', { timeout: 30000 });
    await validateHomePage.hover();
    await captureStepScreenshot( {page, testInfo, stepName: 'validateHomePage-afterRefresh'} );
});
