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

async function waitForSpinnerToDisappear(spinnerSelector, timeout = 100000) { // #dvImgContainerPL
	if (!pageInstance) {
		throw new Error('Page is not initialized. Call setPage(page) first.');
	}
	const spinner = pageInstance.locator(spinnerSelector).first();

	try {
		await spinner.waitFor({ state: 'hidden', timeout });
	} catch (error) {
		console.warn(`Spinner with selector "${spinnerSelector}" did not disappear within ${timeout}ms.`);
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

async function waitForAPIRequestAndResponse(apiName, timeout = 70000) {
	if (!pageInstance) {
		throw new Error('Page is not initialized. Call setPage(page) first.');
	}

	// 1️⃣ Wait for the request and capture it
	const request = await pageInstance.waitForRequest(
		req =>
			req.method() === 'POST' &&
			req.url().includes(apiName),
		{ timeout }
	);

	// 2️⃣ Wait for the response of THAT request
	const response = await request.response();
	if (!response) {
		throw new Error(`No response received for request: ${apiName}`);
	}

	// 3️⃣ Assert response status
	if (response.status() !== 200) {
		throw new Error(
			`API ${apiName} failed. Expected 200, got ${response.status()}`
		);
	}

}

async function getPlasticRowData(plasticCode) {
  if (!pageInstance) {
    throw new Error('Page is not initialized. Call setPage(page) first.');
  }

  const rows = pageInstance.locator('#gvInventoryStatus tbody tr');

  // Filter the specific row FIRST
  const row = rows.filter({
    has: pageInstance.locator('td:nth-child(2)', {
      hasText: new RegExp(plasticCode, 'i')
    })
  });

  await expect(row).toBeVisible({ timeout: 60000 });

  const cells = row.locator('td');

  return {
    productName: (await cells.nth(0).textContent())?.trim(),
    plasticCode: (await cells.nth(1).textContent())?.trim(),
    openingInventory: (await cells.nth(2).textContent())?.trim(),
    closingInventory: (await cells.last().textContent())?.trim(),
  };
}


module.exports = {
	setPage,
	buttonByName,
	validatePage,
	getTimestamp,
	waitForSpinnerToDisappear,
	waitForAPIRequestAndResponse,
	getPlasticRowData
};
