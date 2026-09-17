const { test, expect } = require('@playwright/test');
const { generateAuthToken } = require('../../API/utilities/globalAPIfunctions');
const { getAdditionalCardDetails2 } = require('../../API/apicalls/postGetAdditionalCardDetails2');
const { getActiveCardDetails } = require('../../API/utilities/extractCardDetails.utils.js');

test("Valid Get Card Details API call @cardDetailsAPI", async ({ request }) => {
	const executionStartTime = performance.now();

	const bearerToken = await generateAuthToken(request, 'uat');
	expect(bearerToken).toBeTruthy();

	const resp = await getAdditionalCardDetails2(request, bearerToken, {
		AccountNumber: "70000001647747", DecisionFlag: 3
	});

	expect(resp.status()).toBe(200);
	const respBody = await resp.json();

	expect(respBody.Status).toBe(true);
	expect(respBody.Message).toBe("Successful.");
	expect(respBody.ResponseData).toHaveProperty("AccountNumber");
	console.log(respBody);

	const cards = respBody.ResponseData.EmbossingDetails;
	expect(Array.isArray(cards)).toBe(true);
	expect.soft(cards.length).toBeGreaterThan(0);

	let selectedCardDetails = null;

	if(cards.length ===1) {
		selectedCardDetails = cards[0];
		console.log("Single card in the resopnse data, selected it directly");
	} else {
		console.log(`${cards.length} cards have been returned in the response data, selecting the active card with the most recent issue date`);

		selectedCardDetails = getActiveCardDetails(respBody.ResponseData);
	}

	console.log('-------------------------------------------------------------');

	// Validate that there is a card selected from the response data
	expect(selectedCardDetails).toBeTruthy();
	// Validate if the selected card details actually has card number present in the response data
	expect(selectedCardDetails.CardNumber).toBeTruthy();

	const cardNumber = selectedCardDetails.CardNumber;
	// Just a confirmation message to show that card number has actually been selected here beofre proceeding further
	console.log(`Selected Card number: ${cardNumber}`);

	// Validates that the card number is actually 16 digits or not, it can be modified in future if we start supporting 19 digit card numbers
	expect(cardNumber).toMatch(/^\d{16}$/);

	// This is where the actual API flow ended, further we only disect the card number into releveant format to fit our CoreMoney card number blocks
	const executionEndTime = performance.now();

	const executionTotalTime = executionEndTime - executionStartTime;

	// Disecting the card number into 4-4-4-4 digits each block format for our CoreMoney Card Number field
	const cardBlock1 = cardNumber.slice(0, 4);
	const cardBlock2 = cardNumber.slice(4, 8);
	const cardBlock3 = cardNumber.slice(8, 12);
	const cardBlock4 = cardNumber.slice(12, 16);


	// ----------------------------------------------------------------------------------------
	// This is just for the demonstration purpose on how the card number is exactly extracted
	console.log('-------------------------------------------------------------');
	console.log("Get Card Details API results and execution time");
	console.log('-------------------------------------------------------------');

	console.log(`Total Execution Time: ${executionTotalTime} milliseconds`);

	console.log(`Account Number: ${respBody.ResponseData.AccountNumber}`);
	console.log(`Number of cards returned by API: ${cards.length}`);
	console.log(`Selected Card Number: ${selectedCardDetails.CardNumber}`);
	console.log(`Selected Card Status: ${selectedCardDetails.CardManualStatus}`);

	console.log('-------------------------------------------------------------');
	console.log("Disected Card Number Blocks");
	console.log('-------------------------------------------------------------');
	console.log(`${cardBlock1} - ${cardBlock2} - ${cardBlock3} - ${cardBlock4}`);
});