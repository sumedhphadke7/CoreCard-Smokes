import apiEndpoints from '../APIendpoints.json';

export async function postViewDDA(request, token, overrides = {}) {
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