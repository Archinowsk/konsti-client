// @flow
import type { Signup } from 'flow/user.flow'

export type Result = {
  +username: string,
  +enteredGame: Signup,
  +signedGames: $ReadOnlyArray<Signup>,
}

export type Results = {
  +result: $ReadOnlyArray<Result>,
  +startTime: string,
  +createdAt: string,
  +updatedAt: string,
}
