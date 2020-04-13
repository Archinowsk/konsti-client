export interface Config {
  appName: string;
  MESSAGE_DELAY: number;
  CONVENTION_NAME: ConventionName;
  CONVENTION_YEAR: string;
  CONVENTION_START_TIME: string;
  DAY_START_TIME: number;
  apiServerURL: string;
  useTestTime: boolean;
  reduxTrace: boolean;
  loadedSettings: string;
  enableAxe: boolean;
  enableWhyDidYouRender: boolean;
  dataUpdateInterval: number;
  noSignupGames: string[];
  revolvingDoorEnabled: boolean;
  tagFilteringEnabled: boolean;
  simpleDetails: boolean;
  PRE_SIGNUP_END_TIME: number;
  PRE_SIGNUP_OPEN_TIME: number;
  DIRECT_SIGNUP_END_TIME: number;
  DIRECT_SIGNUP_OPEN_TIME: number;
}

export type ConventionName = 'Ropecon' | 'Tracon Hitpoint';
