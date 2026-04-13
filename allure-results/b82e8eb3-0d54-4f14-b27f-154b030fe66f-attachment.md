# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: Tests\SmokeTests\ConvCard Smoke.spec.js >> Login to CoreMoney UAT
- Location: Tests\SmokeTests\ConvCard Smoke.spec.js:6:5

# Error details

```
TypeError: homePage.searchCardPage is not a function
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
    - generic [ref=e38]:
      - generic [ref=e39]:
        - generic:
          - list [ref=e40]: Home
          - list [ref=e41]:
            - listitem [ref=e42]:
              - generic [ref=e43] [cursor=pointer]:
                - text: Logout
                - generic [ref=e44]: 
      - generic [ref=e48]:
        - generic [ref=e52]:
          - generic [ref=e53]: 
          - generic [ref=e55]: "Last Login:"
          - generic [ref=e57]: 04/13/2026 07:19:12
        - generic [ref=e60]:
          - generic [ref=e61]:
            - generic:
              - generic [ref=e62]:
                - link "Search Card" [ref=e65] [cursor=pointer]:
                  - /url: javascript:void(0)
                - link "Check Account Balance" [ref=e68] [cursor=pointer]:
                  - /url: javascript:void(0)
              - generic [ref=e70]:
                - link "Sell Card" [ref=e73] [cursor=pointer]:
                  - /url: javascript:void(0)
                - link "Manage Card" [ref=e76] [cursor=pointer]:
                  - /url: javascript:void(0)
              - generic [ref=e78]:
                - link "Instant Card" [ref=e81] [cursor=pointer]:
                  - /url: javascript:void(0)
                - link "Personalize Card" [ref=e84] [cursor=pointer]:
                  - /url: javascript:void(0)
              - generic [ref=e86]:
                - link "Load/Reload Card" [ref=e89] [cursor=pointer]:
                  - /url: javascript:void(0)
                - link "Unload Card" [ref=e92] [cursor=pointer]:
                  - /url: javascript:void(0)
              - generic [ref=e94]:
                - link "Member ID Management" [ref=e97] [cursor=pointer]:
                  - /url: javascript:void(0)
                - link "Manage Branch" [ref=e100] [cursor=pointer]:
                  - /url: javascript:void(0)
              - generic [ref=e102]:
                - link "Manage Inventory" [ref=e105] [cursor=pointer]:
                  - /url: javascript:void(0)
                - link "Bulk Processing" [ref=e108] [cursor=pointer]:
                  - /url: javascript:void(0)
              - generic [ref=e110]:
                - link "Reports" [ref=e113] [cursor=pointer]:
                  - /url: javascript:void(0)
                - link "Administration" [ref=e116] [cursor=pointer]:
                  - /url: javascript:void(0)
              - generic [ref=e118]:
                - link "Fraud Containment" [ref=e121] [cursor=pointer]:
                  - /url: javascript:void(0)
                - link "Funding Account" [ref=e124] [cursor=pointer]:
                  - /url: javascript:void(0)
          - generic [ref=e127]:
            - generic [ref=e128]: Convenient Cards, Inc.
            - generic [ref=e129]:
              - generic [ref=e130]: 
              - text: Call:1-844-280-4900
  - generic:
    - link "expand or collapse footer" [ref=e132] [cursor=pointer]:
      - /url: "#divFooterCompatibility"
      - generic [ref=e133]: 
    - contentinfo [ref=e134]:
      - generic [ref=e135]:
        - generic [ref=e136]:
          - generic [ref=e137]:
            - generic [ref=e138]: 
            - text: "IP: 10.206.5.121"
          - text: 
          - generic [ref=e139]:
            - text: Copyright
            - generic [ref=e140]: 
            - text: 2026. All Rights Reserved.
          - generic [ref=e141]:
            - generic [ref=e142]: 
            - text: "Version: 04.06.32.20"
        - generic [ref=e143]: This portal is best viewed in FireFox, Chrome, Opera, Internet Explorer 10+ (with Compatibility view mode off/disabled). The screen resolution desired is 1024x768 above.
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | import { LoginPage } from '../../Pages/LoginPage.spec';
  3  | import { HomePage } from '../../Pages/HomePage.spec';
  4  | import { captureStepScreenshot } from '../../Pages/utilities/screenshotUtil.spec';
  5  | 
  6  | test('Login to CoreMoney UAT', async ({ page }, testInfo) => {
  7  | 	const sideButton = (name) => page.locator('li a span', { hasText: name });
  8  | 	const validateHomePage = page.locator('div.advertizeHeader');
  9  | 
  10 | 	const homePage = new HomePage(page);
  11 | 	const loginPage = new LoginPage(page);
  12 | 
  13 | 	//User login block start
  14 | 	await loginPage.navigatePage();
  15 | 	await loginPage.userLogin('sumedh.cc.admin', 'Test123!');
  16 | 	if ((await loginPage.sessionError.isVisible())) {
  17 | 		await loginPage.userLogin('sumedh.cc.admin', 'Test123!');
  18 | 	}
  19 | 	await page.waitForLoadState('networkidle', { timeout: 60000 });
  20 | 	// await waitForAPIRequestAndResponse('UserLogin');
  21 | 	await expect(page.locator('div.advertizeHeader')).toBeVisible({ timeout: 60000 });
  22 | 	await expect(validateHomePage).toHaveText('Convenient Cards, Inc.');
  23 | 	await validateHomePage.hover();
  24 | 	await captureStepScreenshot(page, testInfo, 'validateHomePage');
  25 | 
  26 | 	//User login block end
  27 | 
  28 | 	//Different page navigations & validations
> 29 | 	await homePage.searchCardPage();
     |                 ^ TypeError: homePage.searchCardPage is not a function
  30 | 	await sideButton('Home').click();
  31 | 	await expect(validateHomePage).toHaveText('Convenient Cards, Inc.');
  32 | 
  33 | 	await homePage.navToManageInventoryPage();
  34 | 	await sideButton('Home').click();
  35 | 	await expect(validateHomePage).toHaveText('Convenient Cards, Inc.');
  36 | 
  37 | 	await homePage.navToManageInventoryPage();
  38 | 	await sideButton('Home').click();
  39 | 	await expect(validateHomePage).toHaveText('Convenient Cards, Inc.');
  40 | 
  41 | 
  42 | });
```