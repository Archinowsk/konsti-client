/* @flow */
import axios from 'axios'
import config from 'config'

export const api = axios.create({
  baseURL: `${config.apiServerURL}/api`,
  timeout: 10000, // 10s
  headers: {
    'Content-Type': 'application/json',
  },
})

export default api
