// const machine = process.env.MACHINE;

// const URLS = {
//     office: "https://testcoremoneyuat.corecard.com:5354/LoginManagement/Login/Login",
//     home: "https://testcoremoney.corecard.com/LoginManagement/Login/Login"
// };

// if (!machine) {
//     throw new Error("MACHINE environment variable is not defined.");
// }

// export const PORTAL_URL = URLS[machine as keyof typeof URLS];
const machine = process.env.MACHINE;

const URLS = {
    office: "https://testcoremoneyuat.corecard.com:5354/LoginManagement/Login/Login",
    home: "https://testcoremoney.corecard.com/LoginManagement/Login/Login"
};

if (!machine) {
    throw new Error("MACHINE environment variable is not defined.");
}

const PORTAL_URL = URLS[machine];

if (!PORTAL_URL) {
    throw new Error(`Unknown MACHINE value: ${machine}`);
}

module.exports = {
    PORTAL_URL
};