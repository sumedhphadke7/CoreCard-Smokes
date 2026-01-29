const base = require('@playwright/test');

const test = base.test.extend({
  buttonByName: async ({ page }, use) => {
    await use((btnName) => {
      return page.locator('a.btn', { hasText: btnName });
    });
  },
  validatePage: async ({ page }, use) => {
    await use(async (validationText) => {
      await base.expect(
        page.locator('div.box-name span', { hasText: validationText })
      ).toBeVisible();
    });
  },
});

module.exports = {
  test,
  expect: base.expect,
};
