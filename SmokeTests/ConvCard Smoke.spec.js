import { test, expect } from '@playwright/test';
import { LoginPage } from '../Pages/LoginPage.spec';
import { HomePage } from '../Pages/HomePage.spec';
import { captureStepScreenshot } from '../Pages/utilities/screenshotUtil.spec';

test('Login to CoreMoney UAT', async ({ page }) => {
  const sideButton = (name) => page.locator('li a span', { hasText: name });
  const validateHomePage = page.locator('div.advertizeHeader');

  const homePage = new HomePage(page);
  const loginPage = new LoginPage(page);

  //User login block start
  await loginPage.navigatePage();
  await loginPage.userLogin('sumedh.cc.admin', 'Test123!');
  await page.waitForLoadState('networkidle', {timeout:60000} );
//  await expect(page.locator('div.advertizeHeader')).toBeVisible( {timeout: 60000} );
  await expect(validateHomePage).toHaveText('Convenient Cards, Inc.');
  await validateHomePage.hover();
  await captureStepScreenshot(page, 'validateHomePage');

  //User login block end

  //Different page navigations & validations
  await homePage.searchCardPage();
  await sideButton('Home').click();
  await expect(validateHomePage).toHaveText('Convenient Cards, Inc.');

  await homePage.manageInventoryPage();
  await sideButton('Home').click();
  await expect(validateHomePage).toHaveText('Convenient Cards, Inc.');

  await homePage.manageInventoryPage();
  await sideButton('Home').click();
  await expect(validateHomePage).toHaveText('Convenient Cards, Inc.');


});