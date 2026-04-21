import { test, expect } from '@playwright/test';
import { generateAuthToken } from '../../API/utilities/globalAPIfunctions.js'; // ../../../API/utilities/globalAPIfunctions.js
import { postViewDDA } from '../../API/apicalls/postViewDDA.api.js';

let bearerToken;

test.beforeAll(async () => {
	console.log('Generating token before all tests');
	bearerToken = await generateAuthToken('grit');
});

test("Valid ViewDDA API call", async ({ request }) => {
	expect(bearerToken).toBeTruthy();

	const resp = await postViewDDA(request, bearerToken, {
		ProxyNumber: '5004302'
	});

	expect(resp.status()).toBe(200);
	const respBody = await resp.json();

	expect(respBody.Message).toBe("Successful.");
	expect(respBody.ResponseData).toHaveProperty("DDANumber");
	expect(respBody.ResponseData).toHaveProperty("RoutingNumber");
	console.log(respBody);
});

test("Invalid ViewDDA API call", async ({ request }) => {
	expect(bearerToken).toBeTruthy();

	const invalidToken = "abcdefghij1234567890"

	const resp = await postViewDDA(request, invalidToken, {
		ProxyNumber: '5004302'
	});

	expect(resp.status()).toBe(401);
	const respBody = await resp.json();

	expect(respBody.Message).toBe("Authorization has been denied for this request.");
});

test("Invalid ViewDDA API user", async ({ request }) => {
	expect(bearerToken).toBeTruthy();

	const invalidUserToken = await generateAuthToken({ request }, 'uat');

	const resp = await postViewDDA(request, invalidUserToken, {
		ProxyNumber: '5004302'
	});

	// expect(resp.status()).toBe(401);
	const respBody = await resp.json();

	expect(respBody.Message).toBe("Access denied.");
});

test("Missing/blank ProxyNumber", async ({ request }) => {
	expect(bearerToken).toBeTruthy();

	const resp = await postViewDDA(request, bearerToken, {
		ProxyNumber: ''
	});

	// expect(resp.status()).toBe(401);
	const respBody = await resp.json();

	expect(respBody.Message).toBe("Proxy/Card Number cannot be left blank.");
});

test("Invalid ProxyNumber", async ({ request }) => {
	expect(bearerToken).toBeTruthy();

	const resp = await postViewDDA(request, bearerToken, {
		ProxyNumber: '1234567'
	});

	// expect(resp.status()).toBe(401);
	const respBody = await resp.json();

	expect(respBody.Message).toBe("Invalid Proxy/Card Number.");
});
