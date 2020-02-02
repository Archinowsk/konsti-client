export interface Config {
  appName: string;
  SIGNUP_END_TIME: number;
  SIGNUP_OPEN_TIME: number;
  MESSAGE_DELAY: number;
  CONVENTION_NAME: CONVENTION_NAME;
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
}

export enum CONVENTION_NAME {
  'Ropecon' = 'Ropecon',
  'Tracon Hitpoint' = 'Tracon Hitpoint',
}
