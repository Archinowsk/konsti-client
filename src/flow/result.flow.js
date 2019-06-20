// @flow
import type { Signup } from 'flow/user.flow'

export type Result = {|
  +username: string,
  +enteredGame: Signup,
  +signedGames: $ReadOnlyArray<Signup>,
|}

export type Results = {|
  +result: $ReadOnlyArray<Result>,
  +startTime: string,
|}

export type NewSignupData = {|
  +username: string,
  +signedGames: $ReadOnlyArray<Signup>,
|}

export type AssignResult = {|
  +message: string,
  +newSignupData: $ReadOnlyArray<NewSignupData>,
  +results: $ReadOnlyArray<Result>,
|}
