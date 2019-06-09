// @flow
import type { Game } from 'flow/game.flow'

export type Signup = {
  +gameDetails: Game,
  +priority: number,
  +time: string,
}

export type SignupData = {
  +username: string,
  +selectedGames: $ReadOnlyArray<Signup>,
}

export type FavoriteData = {
  +username: string,
  +favoritedGames: $ReadOnlyArray<Game>,
}

export type Login = {
  +username: string,
  +password: string,
}

export type RegistrationData = {
  +password: string,
  +registerDescription: boolean,
  +serial: string,
  +username: string,
}
