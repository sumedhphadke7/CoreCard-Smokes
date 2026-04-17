const { test, expect } = require('@playwright/test');
const { postAccountCreation } = require('./apicalls/postAccountCreation.api');
const { generateAuthToken } = require('./utilities/globalAPIfunctions');

test("Valid Account Creation API call with load", async ({ request }) => {
	const bearerToken = await generateAuthToken(request);
	expect(bearerToken).toBeTruthy();

	const resp = await postAccountCreation(request, bearerToken, {
		AccountCreationMethod: "0", LoadAmount: 100.00,
		BranchCode: "00001", ProductID: "5044",
		FirstName: "Abhijith", LastName: "Mohan", NameOnCard: "Abhijith Mohan",
		EmbossingLine4: "Everything is true"
	});

	expect(resp.status()).toBe(200);
	const respBody = await resp.json();

	expect(respBody.Message).toBe("Successful.");
	expect(respBody.ResponseData).toHaveProperty("AccountNumber");
	expect(respBody.ResponseData).toHaveProperty("ProxyNumber");
	expect(respBody.ResponseData).toHaveProperty("CardNumber");
	expect(respBody.ResponseData).toHaveProperty("DerivedStatus");
	expect(respBody.ResponseData.DerivedStatus).toBe("New Card Pending Activation");
	console.log(respBody);
});

test("Valid Account Creation API call without load", async ({ request }) => {
	const bearerToken = await generateAuthToken(request);
	expect(bearerToken).toBeTruthy();

	const resp = await postAccountCreation(request, bearerToken, {
		AccountCreationMethod: "1",
		BranchCode: "00001", ProductID: "5044",
		FirstName: "Anushree", LastName: "Mohan", NameOnCard: "Anushree Mohan",
		EmbossingLine4: "Everything is true"
	});

	expect(resp.status()).toBe(200);
	const respBody = await resp.json();

	expect(respBody.Message).toBe("Successful.");
	expect(respBody.ResponseData).toHaveProperty("AccountNumber");
	expect(respBody.ResponseData).toHaveProperty("ProxyNumber");
	expect(respBody.ResponseData).toHaveProperty("CardNumber");
	expect(respBody.ResponseData).toHaveProperty("DerivedStatus");
	expect(respBody.ResponseData.DerivedStatus).toBe("New Card Pending Activation");
	console.log(respBody);
});

test("Missing/blank values for mandatory fields", async ({ request }) => {
	const bearerToken = await generateAuthToken(request);
	expect(bearerToken).toBeTruthy();

	const resp = await postAccountCreation(request, bearerToken, {
		AccountCreationMethod: "1",
		BranchCode: "00001", ProductID: null,
		FirstName: "Anushree", LastName: "Mohan", NameOnCard: "Anushree Mohan",
		EmbossingLine4: "Everything is true"
	});

	expect(resp.status()).toBe(200);
	const respBody = await resp.json();

	expect(respBody.Message).toBe("Product ID cannot be blank.");
	console.log(respBody);
});

test("Invalid token for AccountCreation", async ({ request }) => {
	const invalidToken = "abcdefghij1234567890";
	const resp = await postAccountCreation(request, invalidToken, {
		AccountCreationMethod: "1",
		BranchCode: "00001", ProductID: "",
		FirstName: "Anushree", LastName: "Mohan", NameOnCard: "Anushree Mohan",
		EmbossingLine4: "Everything is true"
	});

	expect(resp.status()).toBe(401);
	const respBody = await resp.json();

	expect(respBody.Message).toBe("Authorization has been denied for this request.");
	console.log(respBody);
});

test("Valid token for another client for AccountCreation", async ({ request }) => {
	const tokenAnotherClient = await generateAuthToken(request, 'praxell');
	const resp = await postAccountCreation(request, tokenAnotherClient, {
		AccountCreationMethod: "1",
		BranchCode: "00001", ProductID: "",
		FirstName: "Anushree", LastName: "Mohan", NameOnCard: "Anushree Mohan",
		EmbossingLine4: "Everything is true"
	});

	expect(resp.status()).toBe(200);
	const respBody = await resp.json();

	expect(respBody.Message).toBe("Access denied.");
	console.log(respBody);
});