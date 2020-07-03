import { Game } from 'typings/game.typings';

export interface WeekdayAndTime {
  time: string;
  capitalize: boolean;
}

export interface ServerError {
  code: string;
  message: string;
  status: 'error';
}

export interface GetSettingsResponse {
  appOpen: boolean;
  hiddenGames: Game[];
  message: string;
  signupTime: string;
  status: 'success';
}

export interface PostToggleAppOpenResponse {
  appOpen: boolean;
  message: string;
  status: 'success';
}

export interface PostSignupTimeResult {
  message: string;
  signupTime: string;
  status: 'success';
}
