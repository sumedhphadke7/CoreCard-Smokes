const fs = require('fs');
const path = require('path');
const { getTimestamp } = require('./GlobalFunctions.spec');

const SCREENSHOT_DIR = path.join(
  process.cwd(),
  'SmokeTests',
  'Screenshots'
);

if (!fs.existsSync(SCREENSHOT_DIR)) {
  fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });
}

async function captureStepScreenshot(page, stepName) {
  await page.screenshot({
    path: path.join(
      SCREENSHOT_DIR,
      `${stepName}-${getTimestamp()}.png`
    ),
    fullPage: true
  });
}

module.exports = { captureStepScreenshot };
