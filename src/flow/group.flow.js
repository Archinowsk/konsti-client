// @flow
import type { Game, GameWithPriority } from 'flow/game.flow'

export type GroupMember = {
  enteredGames: Array<Game>,
  playerGroup: string,
  serial: string,
  signedGames: Array<GameWithPriority>,
  username: string,
}
