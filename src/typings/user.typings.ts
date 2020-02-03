import { Game } from 'typings/game.typings';

export interface Signup {
  gameDetails: Game;
  priority: number;
  time: string;
}

export interface EmptySignup {
  gameDetails: null;
  priority: number;
  time: string;
}

export interface SignupData {
  username: string;
  selectedGames: readonly Signup[];
  signupTime: string;
}

export interface FavoriteData {
  username: string;
  favoritedGames: readonly Game[];
}

export interface Login {
  username?: string;
  password?: string;
  jwt?: string;
}

export enum UserGroup {
  user = 'user',
  admin = 'admin',
  help = 'help',
}

export interface LoginData {
  username: string;
  loggedIn: boolean;
  jwt: string;
  userGroup: UserGroup;
  serial: string;
  groupCode: string;
}

export interface RegistrationData {
  password: string;
  registerDescription: boolean;
  serial: string;
  username: string;
}

export interface UserGames {
  enteredGames: readonly Signup[];
  favoritedGames: readonly Game[];
  signedGames: readonly Signup[];
}
