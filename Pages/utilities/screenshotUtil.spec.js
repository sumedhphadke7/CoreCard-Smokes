const fs = require('fs');
const path = require('path');
const { getTimestamp } = require('./GlobalFunctions.spec');

const SCREENSHOT_DIR = path.join(
  process.cwd(),
  'Tests',
  'Screenshots'
);

// Utility to sanitize any string for filesystem safety
function sanitize(input) {
  return input
    .replace(/[^\w\d]/g, '_')   // replace special chars
    .replace(/_+/g, '_')        // collapse multiple underscores
    .replace(/^_+|_+$/g, '');   // trim edges
}

async function captureStepScreenshot({ page, stepName }, testInfo) {

  if (!testInfo || !testInfo.file) {
    throw new Error('testInfo is undefined. Ensure it is passed from the test.');
  }
  
  // Extract spec file name (without extension)
  const fileName = path.basename(
    testInfo.file,
    path.extname(testInfo.file)
  );

  // Sanitize values
  const safeTestName = sanitize(testInfo.title);
  const safeStepName = sanitize(stepName);

  // Retry suffix (only if retry > 0)
  const retrySuffix = testInfo.retry ? `-retry${testInfo.retry}` : '';

  // Build folder path: Screenshots/<Spec>/<TestName>/
  const testFolderPath = path.join(
    SCREENSHOT_DIR,
    fileName,
    safeTestName
  );

  // Ensure directory exists (safe for parallel execution)
  fs.mkdirSync(testFolderPath, { recursive: true });

  // Final screenshot path
  const screenshotPath = path.join(
    testFolderPath,
    `${safeStepName}${retrySuffix}-${getTimestamp()}.png`
  );

  await page.screenshot({
    path: screenshotPath,
    fullPage: true
  });
}

module.exports = { captureStepScreenshot };