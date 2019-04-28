// @flow
import type { Game } from 'flow/game.flow'

export type GroupMember = {
  enteredGames: Array<Game>,
  playerGroup: string,
  serial: string,
  signedGames: Array<Game>,
  username: string,
}
