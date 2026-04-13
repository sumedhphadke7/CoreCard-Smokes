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


// eyJhbGciOiJSUzI1NiIsImtpZCI6IjgtejJKNjNVSUFSYlZmMG1IcGJNNjMtYWtNa1JVam01S2xHZmdpRDVCRE0iLCJ0eXAiOiJKV1QifQ.eyJUb2tlblR5cGUiOiJBY2Nlc3NUb2tlbiIsIlVzZXJJRCI6ImdyaXRwIiwic291cmNlSUQiOiJDb3JlQ2FyZCIsInJvbGVzX2xpc3QiOlsiZ3JpdHAiXSwidW5pcXVlX25hbWUiOiJncml0cCIsIkF1dGhIZWFkZXIiOiI4Q0M3N0QzMTk3M0U0OTgwOTZGNzZENTU1MEJENzJCMzcwM0UzMzQ0NCIsIm5iZiI6MTc3NTgyMDY0OCwiZXhwIjoxNzc1ODc0NjUwLCJpYXQiOjE3NzU4MjA2NDh9.KGMuF0sLK0slQ3JhkjAh8eHzM89wfn6N26FpVD6xmjkbSehiDaL7zKzhagVEqdjygkl1ZvpVt0eiR9oGpnQ07dFAyX9qOjNsjtl064a8j9RlVzFm_FimBG386gHFltsy9uqItkZjYvGHb4-cNp2O8cMgglnXR8-BpjsO2vn4HEPpe8t0vibxPihsRusul3GtydA92x3d-kVuDNexQXLdg9lYq7Nu24eVWEc0H_z2JBZDa-v7UnMef8xkLzcFQ6bDRlsSpQq9qn0sIROqc_S6QtDIybflxn3vTa1MA9QBzvvGSXRl-Pj_gmpGdioRNK0HCVQQWhPgMGUgrl8mqxIZZA
// eyJhbGciOiJSUzI1NiIsImtpZCI6IjgtejJKNjNVSUFSYlZmMG1IcGJNNjMtYWtNa1JVam01S2xHZmdpRDVCRE0iLCJ0eXAiOiJKV1QifQ.eyJUb2tlblR5cGUiOiJBY2Nlc3NUb2tlbiIsIlVzZXJJRCI6ImdyaXRwIiwic291cmNlSUQiOiJDb3JlQ2FyZCIsInJvbGVzX2xpc3QiOlsiZ3JpdHAiXSwidW5pcXVlX25hbWUiOiJncml0cCIsIkF1dGhIZWFkZXIiOiI4Q0M3N0QzMTk3M0U0OTgwOTZGNzZENTU1MEJENzJCMzcwM0UzMzQ0NCIsIm5iZiI6MTc3NTgyMDY0OCwiZXhwIjoxNzc1ODc0NjUwLCJpYXQiOjE3NzU4MjA2NDh9.KGMuF0sLK0slQ3JhkjAh8eHzM89wfn6N26FpVD6xmjkbSehiDaL7zKzhagVEqdjygkl1ZvpVt0eiR9oGpnQ07dFAyX9qOjNsjtl064a8j9RlVzFm_FimBG386gHFltsy9uqItkZjYvGHb4-cNp2O8cMgglnXR8-BpjsO2vn4HEPpe8t0vibxPihsRusul3GtydA92x3d-kVuDNexQXLdg9lYq7Nu24eVWEc0H_z2JBZDa-v7UnMef8xkLzcFQ6bDRlsSpQq9qn0sIROqc_S6QtDIybflxn3vTa1MA9QBzvvGSXRl-Pj_gmpGdioRNK0HCVQQWhPgMGUgrl8mqxIZZA