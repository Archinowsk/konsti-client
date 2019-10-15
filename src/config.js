// @flow
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
  CONVENTION_NAME: 'Tracon Hitpoint',
  CONVENTION_YEAR: '2019',
  CONVENTION_START_TIME: '2019-07-26T12:00:00Z', // UTC date
  DAY_START_TIME: 8, // 08:00
  noSignupGames: [
    // Friday 26.7.
    'p3501', // 2019-07-26T13:00:00Z Charlie ei surffaa
    'p3402', // 2019-07-26T21:00:00Z Jumalat

    // Saturday 27.7.
    'p3549', // 2019-07-27T07:00:00Z Charlie ei surffaa
    'p3654', // 2019-07-27T09:00:00Z Pathfinder Society Scenario #10-00: The Hao Jin Cataclysm
    'p3872', // 2019-07-27T16:00:00Z Contra el Culto del Dios de la Noche (Against the Cult of the Night God)
    'p3548', // 2019-07-27T21:00:00Z Jumalat
    'p3935', // 2019-07-27T00:30:00Z Color out of Space

    // Synday 28.7.
    'p3550', // 2019-07-28T07:00:00Z Charlie ei surffaa
  ],

  // Dev
  reduxTrace: true,
  enableAxe: false,
  enableWhyDidYouRender: false,
}

const prodConfig = {
  useTestTime: false,
  dataUpdateInterval: 60, // seconds
}

const stagingConfig = {
  useTestTime: true,
  dataUpdateInterval: 60, // seconds
}

const devConfig = {
  useTestTime: true,
  dataUpdateInterval: 60, // seconds
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
