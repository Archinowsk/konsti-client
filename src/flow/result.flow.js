// @flow
import type { Signup } from 'flow/user.flow'

export type Result = {|
  +username: string,
  +enteredGame: Signup,
|}

export type Results = {|
  +result: $ReadOnlyArray<Result>,
  +startTime: string,
|}
