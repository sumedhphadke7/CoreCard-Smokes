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

	const testFilePath = currentTestInfo.file;
	const testDir = currentTestInfo.project.testDir;
	const testDataDir = currentTestInfo.project.use.testDataDir;

	console.log('testDataDir:', testDataDir);
	console.log('testDir:', currentTestInfo.project.testDir);
	console.log('file:', currentTestInfo.file);

	// 👇 Get relative path inside Tests folder
	const relativePath = path.relative(
		path.resolve(testDir),
		path.resolve(testFilePath)
	);

	// 👇 Extract subfolder (if any)
	const normalizedPath = path.normalize(relativePath);
	const segments = normalizedPath.split(path.sep);

	// 👇 Only take top-level folder (SmokeTests / FeatureTests)
	const subDir = segments.length > 1 ? segments[0] : '';
	const testFile = path.basename(testFilePath);
	const runtimeFileName = testFile
    .replace(/_(SmokeTest|functionalTest)\.spec\.js$/, '_runtime.json')
    .replace(/\.spec\.js$/, '_runtime.json');

	const finalPath = subDir
		? path.join(testDataDir, subDir, runtimeFileName)
		: path.join(testDataDir, runtimeFileName);

	return finalPath;
}

/**
 * Always return latest runtime data
 */
function getRuntimeData() {

	const runtimeFile = getRuntimeFilePath();

	console.log('Reading runtime file:', runtimeFile);
	console.log('Exists:', fs.existsSync(runtimeFile));

	if (!fs.existsSync(runtimeFile)) {
		return {};
	}

	const data = fs.existsSync(runtimeFile)
		? JSON.parse(fs.readFileSync(runtimeFile, 'utf8'))
		: {};

	console.log('Loaded runtime data:', JSON.stringify(data, null, 2));
	return data;
}

/**
 * Update runtime key
 */
function updateRuntimeKey(keyPath, value) {

	const runtimeFile = getRuntimeFilePath();

	fs.mkdirSync(path.dirname(runtimeFile), { recursive: true });

	let data = {};

	if (fs.existsSync(runtimeFile)) {
		data = JSON.parse(
			fs.readFileSync(runtimeFile, 'utf8')
		);
	}

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