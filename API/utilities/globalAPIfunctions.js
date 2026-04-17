const apiEndpoints = require('../APIendpoints.json');
const apiCreds = require('../APIcredentials.json');

const fs = require('fs');
const path = require('path');

const cachePath = path.resolve(__dirname, '../API/tokenCache.json');
const TOKEN_TTL_MS = 6 * 60 * 60 * 1000;

async function generateAuthToken(request, client = 'grit') {
  let cache = {};

  if (fs.existsSync(cachePath)) {
    cache = JSON.parse(fs.readFileSync(cachePath, 'utf-8'));
  }

  const now = Date.now();
  const clientCache = cache[client];

  if (
    clientCache &&
    clientCache.access_token &&
    now - clientCache.createdAt < TOKEN_TTL_MS
  ) {
    return clientCache.access_token;
  }

  if (!apiCreds[client]) {
    throw new Error(`Invalid client "${client}"`);
  }

  const { username, password } = apiCreds[client];

  const response = await request.post(apiEndpoints.generateToken, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    form: {
      username,
      password,
      grant_type: 'password',
      IPAddress: '::1',
      APIVersion: '1.3',
      Source: 'web',
    },
  });

  if (!response.ok()) {
    throw new Error(`Token API failed: ${response.status()}`);
  }

  const body = await response.json();

  if (!body.access_token) {
    throw new Error('Access token not found');
  }

  cache[client] = {
    access_token: body.access_token,
    createdAt: now,
  };

  const dir = path.dirname(cachePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  fs.writeFileSync(cachePath, JSON.stringify(cache, null, 2));
  return body.access_token;
}

module.exports = { generateAuthToken };