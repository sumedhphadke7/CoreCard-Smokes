import { expect } from "@playwright/test";

let pageInstance; // private module state

function setPage(page) {
    pageInstance = page;
}

function getTimestamp() {
    const now = new Date();

    const dd = String(now.getDate()).padStart(2, '0');
    const mm = String(now.getMonth() + 1).padStart(2, '0');
    const hh = String(now.getHours()).padStart(2, '0');
    const min = String(now.getMinutes()).padStart(2, '0');

    return `${dd}-${mm}-${hh}-${min}`;
}

// export async function validatePage(page, validationText) {
//     await expect(page.locator('div.box-name span', { hasText: validationText })).toBeVisible();
// }
/**
 * Waits for spinner to disappear if it is visible
 * @param {string} spinnerSelector - CSS/XPath/text selector for spinner
 * @param {number} timeout - max wait time (default 10s)
 */

async function waitForSpinnerToDisappear( spinnerSelector, timeout = 10000 ) { // #dvImgContainerPL
  if (!pageInstance) {
    throw new Error('Page is not initialized. Call setPage(page) first.');
  }
  const spinner = pageInstance.locator(spinnerSelector);

  if (await spinner.isVisible()) {
    await spinner.waitFor({ state: 'hidden', timeout });
  }
}

function buttonByName(btnName) {
    if (!pageInstance) {
        throw new Error('Page is not initialized. Call setPage(page) first.');
    }
    return pageInstance.locator('a.btn', { hasText: btnName });
}

async function validatePage(validationText) {
    if (!pageInstance) {
        throw new Error('Page is not initialized. Call setPage(page) first.');
    }
    await expect(
        pageInstance.locator('div.box-name span', { hasText: validationText })
    ).toBeVisible();
}

module.exports = {
    setPage,
    buttonByName,
    validatePage,
    getTimestamp,
    waitForSpinnerToDisappear
};
