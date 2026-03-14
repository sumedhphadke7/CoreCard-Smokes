const testData = require("../SmokeTests/TestData/CC100048_SmokeTest.json");
import { expect } from '@playwright/test';
import { PORTAL_URL } from './utilities/environment.js'

export class LoginPage {
    constructor(page) {
        this.page = page;
        this.usernameField = this.page.locator('[name="txtUserId"]');
        this.passwordField = this.page.locator('[name="password"]');
        this.loginBtn = this.page.locator('.NewLoginBtn');
        this.sessionError = this.page.locator('div.alert', { hasText: "Your session has expired. Please log in again!" });
        this.credentials = testData.credentials;
    }

    async navigatePage() {
        await this.page.goto(PORTAL_URL, {waitUntil: 'domcontentloaded', timeout: 20000});
        // await this.page.goto('https://testcoremoney.corecard.com/LoginManagement/Login/Login');
        await this.page.waitForLoadState('networkidle');
        // await this.page.reload();
    }

    async userLogin() {
        await expect(this.usernameField).toBeVisible( {timeout: 15000} );
        await this.usernameField.pressSequentially(this.credentials.username);
        await this.passwordField.pressSequentially(this.credentials.password);
        await this.loginBtn.click();
        // if((await this.sessionError.isVisible())) {
        //     await this.page.reload();
        //     await this.userLogin(username, password);
        // }
    }
}