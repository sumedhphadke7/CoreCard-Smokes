export class LoginPage {
    constructor(page) {
        this.page = page;
        this.usernameField = this.page.locator('[name="txtUserId"]');
        this.passwordField = this.page.locator('[name="password"]');
        this.loginBtn = this.page.locator('.NewLoginBtn');
        this.sessionError = page.locator('div.alert', {hasText: "Your session has expired. Please log in again!"});
    }

    async navigatePage() {
        await this.page.goto('https://testcoremoneyuat.corecard.com:5354/LoginManagement/Login/Login');
        // await this.page.goto('https://testcoremoney.corecard.com/LoginManagement/Login/Login');

        // await this.page.reload();
    }

    async userLogin(username, password) {
        await this.usernameField.fill(username);
        await this.passwordField.fill(password);
        await this.loginBtn.click();

        // if((await this.sessionError.isVisible())) {
        //     await this.page.reload();
        //     await this.userLogin(username, password);
        // }
    }
}