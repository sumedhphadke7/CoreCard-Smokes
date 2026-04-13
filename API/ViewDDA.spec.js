import { test, expect } from '@playwright/test';
import apiEndpoints from './APIendpoints.json';
import { generateAuthToken } from './utilities/globalAPIfunctions.js';

let bearerToken;

async function postViewDDA(request, token, overrides = {}) {
	const defaultPayload = {
		APIVersion: "1.3", IPAddress: "10.206.2.197", Source: "WEB", CallerID: "", CalledID: "", SessionID: "", ANI: "", DNS: "",
		Language: "en", RequestDate: "", CardNumber: "", ProxyNumber: ""
	};
	console.log(token);

	const payload = { ...defaultPayload, ...overrides };
	const response = await request.post(apiEndpoints.viewDDA, {
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${token}`
		},
		data: payload,
	});

	return await response;
}

test.beforeAll(async ({ request }) => {
	console.log('Generating token before all tests');
	bearerToken = await generateAuthToken({ request }, 'grit');
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
