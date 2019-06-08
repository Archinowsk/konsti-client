// @flow
import type { Signup } from 'flow/user.flow'

export type Result = {
  username: string,
  enteredGame: Signup,
  signedGames: Array<Signup>,
}

export type Results = {
  result: Array<Result>,
  startTime: string,
  createdAt: string,
  updatedAt: string,
}
