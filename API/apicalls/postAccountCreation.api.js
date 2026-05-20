const apiEndpoints = require('../APIendpoints.json');

async function postAccountCreation(request, token, overrides = {}) {
	const defaultPayload = {
		APIVersion: "1.4", IPAddress: "10.206.2.197", Source: "WEB",
		AccountCreationMethod: "1", BranchCode: "00001", ProductID: "5044",
		LinkWithExistingAccountFlag: "", LinkedAccountNumber: "", LoadAmount: "",
		Title: "01", FirstName: "Sumedh", MiddleName: "", LastName: "Phadke", NameOnCard: "Sumedh Phadke",
		DateOfBirth: "1985-05-05T00:00:00",
		AddressLine1: "101 UAT Test", AddressLine2: "", Country: "US", State: "FL", City: "Miami", PostalCode: "32145",
		DifferentShipToAddress: "0", ShipToFirstName: "", ShipToMiddleName: "", ShipToLastName: "",
		ShipToAddressLine1: "", ShipToAddressLine2: "", ShipToCity: "", ShipToPostalCode: "", ShipToCountry: "", ShipToState: "",
		EmailAddress1: "uat@corecard.com", EmailAddress2: "", SocialSecurityNumber: "791997001",
		IDName: "", IDNumber: "", IDDescription: "", IDIssueCountry: "", IDIssueState: "", IDIssueDate: "", IDExpirationDate: "",
		HomePhoneNumber: "9584958410", WorkPhoneNumber: "", MobilePhoneNumber: "9584958410", IsCardMasked: "",
		CreateCIPFailedAccount: "Y",
		AddAndLoadWalletDetails: [{ WalletID: "", WalletLoadAmount: "", }],
		LinkWithExistingCustomer: "", CustomerID: "", HoldEmbossing: 0, EmbossingLine4: "", PlasticCode: ""
	};

	const payload = { ...defaultPayload, ...overrides };

	return await request.post(apiEndpoints.accountCreation, {
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${token}`
		},
		data: payload,
	});
}

module.exports = { postAccountCreation };