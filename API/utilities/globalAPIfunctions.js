import apiEndpoints from '../APIendpoints.json' assert { type: 'json' };
import apiCreds from '../APIcredentials.json' assert { type: 'json' };

export async function generateAuthToken({ request }, client) {

	if (!client || !apiCreds?.[client]) {
		throw new Error(`Invalid client "${client}".`);
	}

	const { username, password } = apiCreds[client];
	const response = await request.post(
		apiEndpoints.generateToken, {
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		form: {
			username,
			password,
			grant_type: 'password',
			IPAddress: '::1',
			APIVersion: '1.3',
			Source: 'web'
		}
	}
	);

	if (!response.ok()) {
		throw new Error(`Token API failed: ${response.status()}`);
	}

	const respBody = await response.json();

	if (!respBody.access_token) {
		throw new Error('Access token was not found in the response.');
	}
	
	return respBody.access_token;
}