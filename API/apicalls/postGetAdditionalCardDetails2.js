const apiEndpoints = require('../APIendpoints.json');

async function getAdditionalCardDetails2(request, token, overrides = {}) {
	const defaultPayload = {
		APIVersion: "1.3", IPAddress: "10.206.2.197", Source: "WEB", CallerID: "", CalledID: "",
		SessionID: "", ANI: "", DNS: "", Language: "en", RequestDate: "",
		CardNumber: "",  ProxyNumber: "", AccountNumber: "",
		DecisionFlag: 1
	};

	const payload = { ...defaultPayload, ...overrides };

	return await request.post(apiEndpoints.additionalCardDetails, {
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${token}`
		},
		data: payload,
	});
}

module.exports = { getAdditionalCardDetails2 };