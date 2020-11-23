import axios from 'axios';

export function getBaseURL() {
  const apiEndpoint = process.env.API_ENDPOINT;
  return apiEndpoint;
}

axios.defaults.withCredentials = false;
axios.defaults.baseURL = getBaseURL();
axios.defaults.timeout = 50000;
axios.defaults.method = 'GET';

function jsonConfig(config) {
  config.headers = {
    ...config.headers,
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };
  return config;
}

function request(config) {
  if (config.data) {
    jsonConfig(config);
  }

  const tokenName = "accessToken";

  if (typeof localStorage !== 'undefined') {
    if (!config.headers) config.headers = {};
    if (localStorage.getItem(tokenName)) {
      const accessToken = localStorage.getItem(tokenName);
      config.headers = { Authorization: `Bearer ${accessToken}` };
    }
  }

  return axios.request(config);
}

export function register({ email, password, status }) {
  return request({
    url: '/auth/register',
    method: 'POST',
    data: { email, password, status },
  });
}

export function loginUser({ userName, password, status }) {
  return request({
    url: '/auth/login',
    method: 'POST',
    data: { userName, password, status },
  });
}

export function logoutUser() {
  return request({
    url: '/auth/logout',
    method: 'POST',
    data: { status: 'away' },
  });
}

// Assign email
export function assignEmail(params) {
  return request({
    url: '/process-pool/assign',
    params,
  });
}

// Process email
export function processEmail({ emailId, status }) {
  return request({
    url: '/process-pool/process',
    method: 'POST',
    data: { emailId, status }
  });
}
