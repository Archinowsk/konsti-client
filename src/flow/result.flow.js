// @flow
import type { GameWithPriority } from 'flow/game.flow'

export type Result = {
  username: string,
  enteredGame: GameWithPriority,
  signedGames: Array<GameWithPriority>,
}

export type Results = {
  result: Array<Result>,
  created: string,
  startTime: string,
}
