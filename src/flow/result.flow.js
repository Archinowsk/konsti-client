// @flow
import type { Game, GameWithPriority } from 'flow/game.flow'

export type Result = {
  username: string,
  enteredGame: Game,
  signedGames: Array<GameWithPriority>,
}

export type Results = {
  result: Array<Result>,
  created: string,
  startTime: string,
}
