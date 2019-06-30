// @flow
import type { Game } from 'flow/game.flow'
import type { GroupMember } from 'flow/group.flow'
import type { Signup } from 'flow/user.flow'
import type { Result } from 'flow/result.flow'

export type AdminState = {|
  +hiddenGames: $ReadOnlyArray<Game>,
  +signupTime: string,
  +testTime: string,
  +appOpen: boolean,
|}

export type AllGamesState = {|
  +games: $ReadOnlyArray<Game>,
|}

export type LoginState = {|
  +username: string,
  +loggedIn: boolean,
  +jwtToken: string,
  +userGroup: string,
  +serial: string,
  +playerGroup: string,
  +groupMembers: $ReadOnlyArray<GroupMember>,
|}

export type MyGamesState = {|
  +enteredGames: $ReadOnlyArray<Signup>,
  +favoritedGames: $ReadOnlyArray<Game>,
  +signedGames: $ReadOnlyArray<Signup>,
|}

export type ResultsState = {|
  +results: $ReadOnlyArray<Result>,
|}

export type SignupState = {|
  +signupTime: string,
  +selectedGames: $ReadOnlyArray<Signup>,
|}

export type State = {|
  +allGames?: AllGamesState,
  +login: LoginState,
  +myGames?: MyGamesState,
  +signup?: SignupState,
  +admin?: AdminState,
  +results?: ResultsState,
|}
