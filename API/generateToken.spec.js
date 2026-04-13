import { test, expect } from '@playwright/test';
import apiEndpoints from './APIendpoints.json';
import apiCreds from './APIcredentials.json';

// test.describe('Generate Token for APIs', () => {
// 	test('Generate Token API', async ({ request }) => {
// 		console.log(apiEndpoints.generateToken);
// 		console.log(apiCreds.grit.username);
// 		console.log(apiCreds.grit.password);
// 		const response = await request.post(apiEndpoints.generateToken, { data: { username: apiCreds.grit.username, password: apiCreds.grit.password } });
// 		console.log(response.status());
// 		console.log(response.headers());
// 		console.log(response.body());
// 		expect(response.status()).toBe(200);
// 	})
// })

test('Generate Token API', async ({ request }) => {
	console.log(apiEndpoints.generateToken);
	console.log(apiCreds.grit.username);
	console.log(apiCreds.grit.password);
	const response = await request.post(
		apiEndpoints.generateToken, {
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		form: {
			username: apiCreds.grit.username,
			password: apiCreds.grit.password,
			grant_type: 'password',
			IPAddress: '::1',
			APIVersion: '1.3',
			Source: 'web'
		}
	});

	const responseBody = await response.json();

	console.log(response.status());
	console.log(response.headers());
	console.log(responseBody);

	console.log('Your access token also known as the bearer token is:\n', responseBody.access_token);
	expect(response.status()).toBe(200);

	return responseBody.access_token;

});