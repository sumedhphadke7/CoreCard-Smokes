import {test, expect} from '@playwright/test';
import apiEndpoints from './APIendpoints.json';
import apiCreds from './APIcredentials.json';
import { generateToken as token } from './generateToken.spec';

let bearerToken;

test.beforeAll(async ( {request} ) => {
    console.log('Generating token before all tests');
    bearerToken = await token({request});
});

test("Test ViewDDA API", async ( {request} ) => {
    expect(bearerToken).toBeTruthy();
    console.log('Yet to write any tests for viewDDA API');
    // await request.post(apiEndpoints.viewDDA, {
    // })
})