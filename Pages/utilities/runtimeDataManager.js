const fs = require('fs');
const path = require('path');

let currentTestInfo;

/**
 * Initialize runtime context once per test
 */
function initRuntimeData(testInfo) {
    currentTestInfo = testInfo;
}

/**
 * Resolve runtime file path dynamically
 */
function getRuntimeFilePath() {

    if (!currentTestInfo?.file) {
        throw new Error('initRuntimeData(testInfo) must be called in test setup');
    }

    const testFile = path.basename(currentTestInfo.file);

    const runtimeFileName = testFile
        .replace('_SmokeTest.spec.js', '_runtime.json')
        .replace('.spec.js', '_runtime.json');

    return path.join(
        process.cwd(),
        'SmokeTests',
        'TestData',
        runtimeFileName
    );
}

/**
 * Always return latest runtime data
 */
function getRuntimeData() {

    const runtimeFile = getRuntimeFilePath();

    return JSON.parse(
        fs.readFileSync(runtimeFile, 'utf8')
    );
}

/**
 * Update runtime key
 */
function updateRuntimeKey(keyPath, value) {

    const runtimeFile = getRuntimeFilePath();

    const data = JSON.parse(
        fs.readFileSync(runtimeFile, 'utf8')
    );

    const keys = keyPath.split('.');
    let obj = data;

    while (keys.length > 1) {
        const key = keys.shift();
        obj[key] = obj[key] || {};
        obj = obj[key];
    }

    obj[keys[0]] = value;

    fs.writeFileSync(
        runtimeFile,
        JSON.stringify(data, null, 2)
    );

    console.log(`Updated ${keyPath} in ${path.basename(runtimeFile)}`);
}

export function createRuntimeAccount(accountNumber) {

  const runtime = getRuntimeData()

  if (!runtime.Accounts) {
    updateRuntimeKey('Accounts', {})
  }

  updateRuntimeKey(`Accounts.${accountNumber}`, {
    cards: []
  })
}

export function addRuntimeCard(accountNumber, cardDetails) {

  const runtime = getRuntimeData()

  const cards = runtime.Accounts[accountNumber]?.cards || []

  cards.push({
    cardNumber: cardDetails.cardNumber,
    proxyNumber: cardDetails.proxyNumber,
    expiry: cardDetails.expiry,
    cvv: cardDetails.cvv,
    cardholder: null
  })

  updateRuntimeKey(`Accounts.${accountNumber}.cards`, cards)
}

export function getRuntimeCardsByOrder(orderID) {

  const runtime = getRuntimeData()

  const accountNumber = runtime.InventoryOrders[orderID].accountNumber

  return runtime.Accounts[accountNumber]?.cards || []
}

module.exports = {
    initRuntimeData,
    getRuntimeData,
    updateRuntimeKey,
    createRuntimeAccount,
    addRuntimeCard,
    getRuntimeCardsByOrder
};