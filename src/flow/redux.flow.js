// @flow
import type { Game } from 'flow/game.flow';
import type { GroupMember } from 'flow/group.flow';
import type { Signup, UserGroup } from 'flow/user.flow';
import type { Result } from 'flow/result.flow';

export type AdminState = {|
  +hiddenGames: $ReadOnlyArray<Game>,
  +signupTime: string | null,
  +testTime: string,
  +appOpen: boolean,
|};

export type AllGamesState = {|
  +games: $ReadOnlyArray<Game>,
|};

export type LoginState = {|
  +username: string,
  +loggedIn: boolean,
  +jwt: string,
  +userGroup: UserGroup,
  +serial: string,
  +groupCode: string,
  +groupMembers: $ReadOnlyArray<GroupMember>,
|};

export type MyGamesState = {|
  +enteredGames: $ReadOnlyArray<Signup>,
  +favoritedGames: $ReadOnlyArray<Game>,
  +signedGames: $ReadOnlyArray<Signup>,
|};

export type ResultsState = {|
  +result: $ReadOnlyArray<Result>,
  +startTime: string,
|};

export type SignupState = {|
  +signupTime: string,
  +selectedGames: $ReadOnlyArray<Signup> | null,
|};

export type LocalStorageState = {|
  login: { jwt: string },
|};
