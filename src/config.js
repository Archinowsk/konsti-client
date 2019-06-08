/* @flow */

// webpack config must be babeled for this to work
type Config = {
  +appName: string,
  +appOpen: boolean,
  +SIGNUP_END_TIME: number,
  +SIGNUP_OPEN_TIME: number,
  +MESSAGE_DELAY: number,
  +CONVENTION_START_TIME: string,
  +DAY_START_TIME: number,
  +apiServerURL: string,
  +setTimeForTesting: boolean,
  +testTime: string,
}

const commonConfig = {
  // App info
  appName: 'Konsti',

  // App status
  apiServerURL: process.env.API_SERVER_URL || 'http://localhost:3000',

  // App settings
  appOpen: true,
  SIGNUP_END_TIME: 30, // minutes
  SIGNUP_OPEN_TIME: 4, // hours
  MESSAGE_DELAY: 2000, // ms

  // Convention settings
  CONVENTION_START_TIME: '2018-07-27T12:00:00Z', // UTC date
  DAY_START_TIME: 8, // 08:00
}

const prodConfig = {
  setTimeForTesting: false,
  testTime: '', // UTC date
}

const stagingConfig = {
  setTimeForTesting: true,
  testTime: '2018-07-27T13:40:00Z', // UTC date
}

const devConfig = {
  setTimeForTesting: true,
  testTime: '2018-07-27T13:40:00Z', // UTC date
}

const combineConfig = () => {
  if (process.env.SETTINGS === 'production') {
    return { ...commonConfig, ...prodConfig }
  } else if (process.env.SETTINGS === 'staging') {
    return { ...commonConfig, ...stagingConfig }
  }
  return { ...commonConfig, ...devConfig }
}

const config: Config = combineConfig()

module.exports = config
