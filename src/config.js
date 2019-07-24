/* @flow */
import type { Config } from 'flow/config.flow'

const commonConfig = {
  // App info
  appName: 'Konsti',

  // App status
  apiServerURL:
    typeof process.env.API_SERVER_URL === 'string'
      ? process.env.API_SERVER_URL
      : 'http://localhost:3000',

  // App settings
  loadedSettings:
    typeof process.env.SETTINGS === 'string'
      ? process.env.SETTINGS
      : 'development',
  SIGNUP_END_TIME: 30, // minutes
  SIGNUP_OPEN_TIME: 4, // hours
  MESSAGE_DELAY: 3000, // ms

  // Convention settings
  CONVENTION_START_TIME: '2019-07-26T12:00:00Z', // UTC date
  DAY_START_TIME: 8, // 08:00

  // Dev
  reduxTrace: true,
  enableAxe: false,
  enableWhyDidYouRender: false,
}

const prodConfig = {
  useTestTime: false,
  dataUpdateInterval: 30, // seconds
}

const stagingConfig = {
  useTestTime: true,
  dataUpdateInterval: 30, // seconds
}

const devConfig = {
  useTestTime: true,
  dataUpdateInterval: 30, // seconds
}

const combineConfig = () => {
  if (process.env.SETTINGS === 'production') {
    return { ...commonConfig, ...prodConfig }
  } else if (process.env.SETTINGS === 'staging') {
    return { ...commonConfig, ...stagingConfig }
  }
  return { ...commonConfig, ...devConfig }
}

export const config: Config = combineConfig()
