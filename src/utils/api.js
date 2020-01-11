// @flow
import axios from 'axios';
import { config } from 'config';
import { getJWT } from 'utils/getJWT';

export const api = axios.create({
  baseURL: `${config.apiServerURL}/api`,
  timeout: 60000, // 60s
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(config => {
  const authToken = getJWT();
  if (authToken) {
    // $FlowFixMe: Cannot assign template string to `config.headers.Authorization` because property `Authorization` is missing in  undefined [1].
    config.headers.Authorization = `Bearer ${authToken}`;
  }
  return config;
});
