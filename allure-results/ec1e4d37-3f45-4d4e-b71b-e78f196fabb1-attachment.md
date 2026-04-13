# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: Tests\SmokeTests\CC100048_SmokeTest.spec.js >> CC100048_SmokeTest
- Location: Tests\SmokeTests\CC100048_SmokeTest.spec.js:11:5

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: locator('div.box-name span:last-child').filter({ hasText: 'Search Inventory' }).first()
Expected: visible
Timeout: 90000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 90000ms
  - waiting for locator('div.box-name span:last-child').filter({ hasText: 'Search Inventory' }).first()

```

# Page snapshot

```yaml
- generic [ref=e3]:
  - generic [ref=e4]:
    - banner [ref=e5]:
      - generic [ref=e7]:
        - img "Client Logo" [ref=e10]
        - generic [ref=e12]:
          - generic [ref=e13]:
            - generic [ref=e15] [cursor=pointer]: 
            - generic [ref=e16]:
              - textbox "searchmenu" [ref=e17]:
                - /placeholder: Search Menu
              - generic [ref=e19]: 
          - list [ref=e21]:
            - listitem [ref=e22]:
              - generic [ref=e23]:
                - link "alert count" [ref=e24] [cursor=pointer]:
                  - /url: javascript:void(0);
                  - generic [ref=e25]: 
                  - generic [ref=e26]: "6506"
                - text:   
            - listitem [ref=e27]:
              - link "switch theme" [ref=e30] [cursor=pointer]:
                - /url: javascript:void(0);
                - generic [ref=e31]: 
            - listitem [ref=e32]:
              - generic:
                - link "Welcome, Sumedh Phadke":
                  - /url: javascript:void(0)
                  - text: 
                  - generic [ref=e33] [cursor=pointer]:
                    - generic [ref=e34]: Welcome,
                    - generic [ref=e35]: Sumedh Phadke
                - text:  
    - generic [ref=e37]:
      - list [ref=e40]:
        - listitem [ref=e41]:
          - link "Home" [ref=e42] [cursor=pointer]:
            - /url: javascript:void(0)
            - generic [ref=e43]: Home
        - listitem [ref=e44]:
          - link "Search Card" [ref=e45] [cursor=pointer]:
            - /url: javascript:void(0)
            - generic [ref=e46]: Search Card
        - listitem [ref=e47]:
          - link "Check Account Balance" [ref=e48] [cursor=pointer]:
            - /url: javascript:void(0)
            - generic [ref=e49]: Check Account Balance
        - listitem [ref=e50]:
          - link "Sell Card" [ref=e51] [cursor=pointer]:
            - /url: javascript:void(0)
            - generic [ref=e52]: Sell Card
        - listitem [ref=e53]:
          - link "Manage Card" [ref=e54] [cursor=pointer]:
            - /url: javascript:void(0)
            - generic [ref=e55]: Manage Card
        - listitem [ref=e56]:
          - link "Instant Card" [ref=e57] [cursor=pointer]:
            - /url: javascript:void(0)
            - generic [ref=e58]: Instant Card
        - listitem [ref=e59]:
          - link "Personalize Card" [ref=e60] [cursor=pointer]:
            - /url: javascript:void(0)
            - generic [ref=e61]: Personalize Card
        - listitem [ref=e62]:
          - link "Load/Reload Card" [ref=e63] [cursor=pointer]:
            - /url: javascript:void(0)
            - generic [ref=e64]: Load/Reload Card
        - listitem [ref=e65]:
          - link "Unload Card" [ref=e66] [cursor=pointer]:
            - /url: javascript:void(0)
            - generic [ref=e67]: Unload Card
        - listitem [ref=e68]:
          - link "Member ID Management" [ref=e69] [cursor=pointer]:
            - /url: javascript:void(0)
            - generic [ref=e70]: Member ID Management
        - listitem [ref=e71]:
          - link "Manage Branch" [ref=e72] [cursor=pointer]:
            - /url: javascript:void(0)
            - generic [ref=e73]: Manage Branch
        - listitem [ref=e74]:
          - link "Manage Inventory" [ref=e75] [cursor=pointer]:
            - /url: javascript:void(0)
            - generic [ref=e76]: Manage Inventory
        - listitem [ref=e77]:
          - link "Bulk Processing" [ref=e78] [cursor=pointer]:
            - /url: javascript:void(0)
            - generic [ref=e79]: Bulk Processing
        - listitem [ref=e80]:
          - link "Reports" [ref=e81] [cursor=pointer]:
            - /url: javascript:void(0)
            - generic [ref=e82]: Reports
        - listitem [ref=e83]:
          - link "Administration" [ref=e84] [cursor=pointer]:
            - /url: javascript:void(0)
            - generic [ref=e85]: Administration
        - listitem [ref=e86]:
          - link "Fraud Containment" [ref=e87] [cursor=pointer]:
            - /url: javascript:void(0)
            - generic [ref=e88]: Fraud Containment
        - listitem [ref=e89]:
          - link "Funding Account" [ref=e90] [cursor=pointer]:
            - /url: javascript:void(0)
            - generic [ref=e91]: Funding Account
      - generic [ref=e92]:
        - generic [ref=e93]:
          - generic:
            - list [ref=e94]:
              - link " Home" [ref=e96] [cursor=pointer]:
                - /url: javascript:void(0)
                - generic [ref=e97]: 
                - text: Home
              - generic [ref=e98]:
                - text: /
                - link "Manage Inventory" [ref=e100] [cursor=pointer]:
                  - /url: javascript:void(0)
              - generic [ref=e101]: / Search Inventory
            - list [ref=e102]:
              - listitem [ref=e103]:
                - generic [ref=e104] [cursor=pointer]:
                  - text: Logout
                  - generic [ref=e105]: 
        - generic [ref=e112]:
          - generic [ref=e113]:
            - generic [ref=e114]:
              - generic [ref=e115]: 
              - text: Search Inventory
            - generic [ref=e116]:
              - generic "Collapse/expand Panel" [ref=e117] [cursor=pointer]:
                - generic [ref=e118]: 
              - generic "Full Screen View" [ref=e119] [cursor=pointer]:
                - generic [ref=e120]: 
              - generic "Close Panel" [ref=e121] [cursor=pointer]:
                - generic [ref=e122]: 
          - generic [ref=e124]:
            - generic [ref=e125]:
              - generic [ref=e126]: "Client Name:"
              - combobox "Client Name:" [ref=e128]:
                - option
                - option "Apache Tribe of Oklahoma"
                - option "Bank Programs"
                - option "Cherokee Nation"
                - option "Cheyenne and Arapaho Tribes"
                - option "Chickasaw Nation"
                - option "Choctaw Clothing"
                - option "Choctaw Higher Education"
                - option "Choctaw Nation"
                - option "Conv Prepaid Mercantile Bank"
                - option "Conv cards Savings"
                - option "Convenient Access Visa Prepaid"
                - option "Convenient Cards Inc"
                - option "DAI Global LLC"
                - option "First Class Coach"
                - option "Fort Bidwell General Assistance"
                - option "Funding Card Program"
                - option "G Adventures"
                - option "Govt Assistance Card CN"
                - option "Govt Assistance card MCN"
                - option "Tricolor Auto Group"
                - option "UAT Choctaw"
                - option "UAT Non CoBranded Cards"
                - option "UAT_test_partner"
              - generic [ref=e129]: "Branch / Store Name:"
              - listbox [ref=e131]:
                - combobox [ref=e134]
              - generic [ref=e136]: "Product Name:"
              - listbox [ref=e138]:
                - combobox [ref=e141]
              - generic [ref=e145]: "Order ID:"
              - textbox "Order ID:" [ref=e147]
              - generic [ref=e148]: "Status:"
              - combobox "Status:" [ref=e150]:
                - option
                - option "Approval Pending"
                - option "Approved"
                - option "Cards Created"
                - option "Inventory Dispatch"
                - option "Received"
                - option "Inventory Received with Return"
                - option "Lost in Transit"
                - option "Damaged in Transit"
                - option "Transfer Received"
                - option "Transfer Received with Return"
                - option "Transfer - in Transit"
                - option "Transfer - Lost in Transit"
                - option "Transfer - Damaged in Transit"
                - option "Error"
                - option "Rejected"
              - generic [ref=e151]:
                - generic [ref=e152]: "Request Date:"
                - generic [ref=e154]:
                  - textbox "Request Date:" [ref=e155]:
                    - /placeholder: MM/DD/YYYY
                  - generic [ref=e157]: 
              - generic [ref=e158]: "Last Requests:"
              - textbox "Last Requests:" [ref=e160]
            - generic [ref=e161]:
              - generic [ref=e162]: "Branch Code / Store ID:"
              - textbox "Branch Code / Store ID:" [ref=e164]
              - generic [ref=e165]: "Plastic Name:"
              - combobox "Plastic Name:" [ref=e167]
              - generic [ref=e168]: "Account Number:"
              - textbox "Account Number:" [ref=e170]
              - generic [ref=e171]: "Card Number:"
              - textbox "Card Number:" [ref=e173]
              - generic [ref=e176]:
                - generic [ref=e177]: "Create Date:"
                - generic [ref=e179]:
                  - textbox "Create Date:" [ref=e180]:
                    - /placeholder: MM/DD/YYYY
                  - generic [ref=e182]: 
            - separator [ref=e184]
            - generic [ref=e185]:
              - button "Search" [ref=e186] [cursor=pointer]
              - button "Request Inventory" [ref=e187] [cursor=pointer]
  - generic:
    - link "expand or collapse footer" [ref=e189] [cursor=pointer]:
      - /url: "#divFooterCompatibility"
      - generic [ref=e190]: 
    - contentinfo [ref=e191]:
      - generic [ref=e192]:
        - generic [ref=e193]:
          - generic [ref=e194]:
            - generic [ref=e195]: 
            - text: "IP: 10.206.5.121"
          - text: 
          - generic [ref=e196]:
            - text: Copyright
            - generic [ref=e197]: 
            - text: 2026. All Rights Reserved.
          - generic [ref=e198]:
            - generic [ref=e199]: 
            - text: "Version: 04.06.32.20"
        - generic [ref=e200]: This portal is best viewed in FireFox, Chrome, Opera, Internet Explorer 10+ (with Compatibility view mode off/disabled). The screen resolution desired is 1024x768 above.
```

# Test source

```ts
  1   | import { expect } from "@playwright/test";
  2   | 
  3   | let pageInstance; // private module state
  4   | 
  5   | function setPage(page) {
  6   | 	pageInstance = page;
  7   | }
  8   | 
  9   | function getTimestamp() {
  10  | 	const now = new Date();
  11  | 
  12  | 	const dd = String(now.getDate()).padStart(2, '0');
  13  | 	const mm = String(now.getMonth() + 1).padStart(2, '0');
  14  | 	const hh = String(now.getHours()).padStart(2, '0');
  15  | 	const min = String(now.getMinutes()).padStart(2, '0');
  16  | 
  17  | 	return `${dd}-${mm}-${hh}-${min}`;
  18  | }
  19  | 
  20  | // export async function validatePage(page, validationText) {
  21  | //     await expect(page.locator('div.box-name span', { hasText: validationText })).toBeVisible();
  22  | // }
  23  | /**
  24  |  * Waits for spinner to disappear if it is visible
  25  |  * @param {string} spinnerSelector - CSS/XPath/text selector for spinner
  26  |  * @param {number} timeout - max wait time (default 10s)
  27  |  */
  28  | 
  29  | async function waitForSpinnerToDisappear(spinnerSelector, timeout = 100000) { // #dvImgContainerPL
  30  | 	if (!pageInstance) {
  31  | 		throw new Error('Page is not initialized. Call setPage(page) first.');
  32  | 	}
  33  | 	const spinner = pageInstance.locator(spinnerSelector).first();
  34  | 
  35  | 	try {
  36  | 		await spinner.waitFor({ state: 'hidden', timeout });
  37  | 	} catch (error) {
  38  | 		console.warn(`Spinner with selector "${spinnerSelector}" did not disappear within ${timeout}ms.`);
  39  | 	}
  40  | }
  41  | 
  42  | function buttonByName(btnName) {
  43  | 	if (!pageInstance) {
  44  | 		throw new Error('Page is not initialized. Call setPage(page) first.');
  45  | 	}
  46  | 	return pageInstance.locator('a.btn', { hasText: btnName });
  47  | }
  48  | 
  49  | async function validatePage(validationText) {
  50  | 	if (!pageInstance) {
  51  | 		throw new Error('Page is not initialized. Call setPage(page) first.');
  52  | 	}
  53  | 	await expect(
  54  | 		pageInstance.locator('div.box-name span:last-child', { hasText: validationText }).first()
> 55  | 	).toBeVisible({ timeout: 90000 });
      |    ^ Error: expect(locator).toBeVisible() failed
  56  | }
  57  | 
  58  | async function waitForAPIRequestAndResponse(apiName, timeout = 70000) {
  59  | 	if (!pageInstance) {
  60  | 		throw new Error('Page is not initialized. Call setPage(page) first.');
  61  | 	}
  62  | 
  63  | 	// 1️⃣ Wait for the request and capture it
  64  | 	const request = await pageInstance.waitForRequest(
  65  | 		req =>
  66  | 			req.method() === 'POST' &&
  67  | 			req.url().includes(apiName),
  68  | 		{ timeout }
  69  | 	);
  70  | 
  71  | 	// 2️⃣ Wait for the response of THAT request
  72  | 	const response = await request.response();
  73  | 	if (!response) {
  74  | 		throw new Error(`No response received for request: ${apiName}`);
  75  | 	}
  76  | 
  77  | 	// 3️⃣ Assert response status
  78  | 	if (response.status() !== 200) {
  79  | 		throw new Error(
  80  | 			`API ${apiName} failed. Expected 200, got ${response.status()}`
  81  | 		);
  82  | 	}
  83  | 
  84  | }
  85  | 
  86  | async function getInvDashboardPlasticRowData(plasticCode) {
  87  | 	if (!pageInstance) {
  88  | 		throw new Error('Page is not initialized. Call setPage(page) first.');
  89  | 	}
  90  | 
  91  | 	const rows = pageInstance.locator('#gvInventoryStatus tbody tr');
  92  | 
  93  | 	// Filter the specific row FIRST
  94  | 	const row = rows.filter({
  95  | 		has: pageInstance.locator('td:nth-child(2)', {
  96  | 			hasText: new RegExp(plasticCode, 'i')
  97  | 		})
  98  | 	});
  99  | 
  100 | 	await expect(row).toBeVisible({ timeout: 60000 });
  101 | 
  102 | 	const cells = row.locator('td');
  103 | 
  104 | 	return {
  105 | 		productName: (await cells.nth(0).textContent())?.trim(),
  106 | 		plasticCode: (await cells.nth(1).textContent())?.trim(),
  107 | 		openingInventory: (await cells.nth(2).textContent())?.trim(),
  108 | 		closingInventory: (await cells.last().textContent())?.trim(),
  109 | 	};
  110 | }
  111 | 
  112 | async function extractRowData(rowLocator, orderID) {
  113 | 	if (!pageInstance) {
  114 | 		throw new Error('Page is not initialized. Call setPage(page) first.');
  115 | 	}
  116 | 
  117 | 	// Filter the specific row FIRST
  118 | 	const row = pageInstance.locator(rowLocator).filter({
  119 | 		has: pageInstance.locator('td:nth-child(4)', {
  120 | 			hasText: new RegExp(`^${orderID}$`)
  121 | 		})
  122 | 	});
  123 | 
  124 | 	await expect(row).toBeVisible({ timeout: 60000 });
  125 | 
  126 | 	const cells = row.locator('td');
  127 | 
  128 | 	return {
  129 | 		branchStoreName: (await cells.nth(1).textContent())?.trim(),
  130 | 		productName: (await cells.nth(2).textContent())?.trim(),
  131 | 		orderID: (await cells.nth(3).textContent())?.trim(),
  132 | 		numberOfCards: (await cells.nth(4).textContent())?.trim(),
  133 | 		cardStatus: (await cells.nth(6).textContent())?.trim(),
  134 | 		requestedBy: (await cells.nth(7).textContent())?.trim(),
  135 | 		requestedOn: (await cells.nth(8).textContent())?.trim(),
  136 | 	};
  137 | }
  138 | 
  139 | 
  140 | module.exports = {
  141 | 	setPage,
  142 | 	buttonByName,
  143 | 	validatePage,
  144 | 	getTimestamp,
  145 | 	waitForSpinnerToDisappear,
  146 | 	waitForAPIRequestAndResponse,
  147 | 	getInvDashboardPlasticRowData,
  148 | 	extractRowData
  149 | };
  150 | 
```