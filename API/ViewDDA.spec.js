import {test, expect} from '@playwright/test';
import apiEndpoints from './APIendpoints.json';
import apiCreds from './APIcredentials.json'

test.beforeAll(async ( {request} ) => {
    const response = await request.post(apiEndpoints.generateToken, {data: {username: apiCreds.grit.username, password: apiCreds.grit.password}});
    
    console.log(response.status());
    console.log(response.headers());
});

// test("Test ViewDDA API", async ( {request} ) => {
//     await request.post(apiEndpoints.viewDDA, {
//     })
// })