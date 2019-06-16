// @flow

export type Config = {|
  +appName: string,
  +appOpen: boolean,
  +SIGNUP_END_TIME: number,
  +SIGNUP_OPEN_TIME: number,
  +MESSAGE_DELAY: number,
  +CONVENTION_START_TIME: string,
  +DAY_START_TIME: number,
  +apiServerURL: string,
  +useTestTime: boolean,
  +reduxTrace: boolean,
  +loadedSettings: string,
|}
