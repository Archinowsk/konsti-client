// @flow
import axios from 'axios';
import { config } from 'config';

export const api = axios.create({
  baseURL: `${config.apiServerURL}/api`,
  timeout: 60000, // 60s
  headers: {
    'Content-Type': 'application/json',
  },
});
