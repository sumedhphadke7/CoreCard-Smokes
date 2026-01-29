import { test, expect } from '@playwright/test';
import { LoginPage } from '../Pages/LoginPage.spec';
import { HomePage } from '../Pages/HomePage.spec';
import { captureStepScreenshot } from '../Pages/utilities/screenshotUtil.spec';
import { InventoryPage } from '../Pages/InventoryPage.spec';
//const { setPage } = require('../Pages/utilities/GlobalFunctions.spec');

test('CC100048_SmokeTest', async ({ page }) => {
  // setPage(page);
  const validateHomePage = page.locator('div.advertizeHeader');

  const homePage = new HomePage(page);
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);

  //User login block start
  await loginPage.navigatePage();
  await loginPage.userLogin('sumedh.cc.admin', 'Test123!');
  if((await loginPage.sessionError.isVisible())) {
    await loginPage.userLogin('sumedh.cc.admin', 'Test123!');
  }
  await page.waitForLoadState('networkidle', {timeout:60000} );
//  await expect(page.locator('div.advertizeHeader')).toBeVisible( {timeout: 60000} );
  await expect(validateHomePage).toHaveText('Convenient Cards, Inc.');
  await validateHomePage.hover();
  await captureStepScreenshot(page, 'validateHomePage');

  // Navigate to Inventory Dashboard & fetch data
  await homePage.manageInventoryPage();
  // await inventoryPage.inventoryDashboard();
  await inventoryPage.inventoryDashboard("FIRST CENTURY BANK", "CC0001");

});