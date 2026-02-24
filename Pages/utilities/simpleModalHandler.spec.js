import { expect } from '@playwright/test';

/**
 * Simple modal validation utility
 * @param {Page} page
 * @param {Object} options
 * @param {string|RegExp} options.expectedHeader
 * @param {string|RegExp} options.expectedBody
 * @param {string} [options.buttonName='Ok']
 */
async function handleModal(page, {
    expectedHeader,
    expectedBody,
    buttonName = 'Ok'
}) {

    const modal = page.locator('.modal');

    // Wait for modal to appear
    await expect(modal).toBeVisible();

    // Validate header
    const header = modal.locator('.modal-header');
    await expect(header).toContainText(expectedHeader);

    // Validate body
    const body = modal.locator('.modal-body');
    console.log('Modal Body message:', await body.textContent());
    await expect(body).toContainText(expectedBody);

    // Click button
    await modal.getByRole('button', { name: new RegExp(`^${buttonName}$`, 'i') }).click();

    // Validate modal is closed
    await expect(modal).toBeHidden();
}

module.exports = {
    handleModal
}