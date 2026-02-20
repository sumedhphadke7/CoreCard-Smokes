const fs = require('fs');
const path = require('path');

/**
 * Resolve base test name from spec file
 * Example:
 * SmokeTests/CC100048_SmokeTest.spec.js
 * → CC100048
 */
function getTestPrefix(testInfo) {
    const fileName = path.basename(testInfo.file); 
    // CC100048_SmokeTest.spec.js

    const baseName = fileName.replace('.spec.js', '');
    // CC100048_SmokeTest

    // Extract prefix before underscore
    return baseName.split('_')[0];
}

/**
 * Resolve runtime file path
 */
function resolveRuntimeFile(testInfo) {
    const prefix = getTestPrefix(testInfo);

    return path.join(
        process.cwd(),
        'SmokeTests',
        'TestData',
        `${prefix}_runtime.json`
    );
}

/**
 * Update or Add nested key
 */
function updateRuntimeKey(testInfo, keyPath, newValue) {

    const runtimeFilePath = resolveRuntimeFile(testInfo);

    let data = {};

    if (fs.existsSync(runtimeFilePath)) {
        data = JSON.parse(
            fs.readFileSync(runtimeFilePath, 'utf8')
        );
    }

    const keys = keyPath.split('.');
    let current = data;

    keys.forEach((key, index) => {
        if (index === keys.length - 1) {
            current[key] = newValue;
        } else {
            if (!current[key] || typeof current[key] !== 'object') {
                current[key] = {};
            }
            current = current[key];
        }
    });

    fs.writeFileSync(
        runtimeFilePath,
        JSON.stringify(data, null, 2),
        'utf8'
    );

    console.log(`Updated ${keyPath} in ${path.basename(runtimeFilePath)}`);
}

module.exports = {
    updateRuntimeKey
};
