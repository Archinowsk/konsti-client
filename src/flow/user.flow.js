// @flow
import type { Game } from 'flow/game.flow'

export type Signup = {
  gameDetails: Array<Game>,
  priority: number,
  time: string,
}

export type User = {
  playerGroup: string,
  signedGames: Array<Signup>,
  enteredGames: Array<Signup>,
  serial: string,
  username: string,
}
