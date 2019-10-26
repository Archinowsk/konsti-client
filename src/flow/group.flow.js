// @flow
import type { Signup } from 'flow/user.flow';

export type GroupMember = {|
  +enteredGames: $ReadOnlyArray<Signup>,
  +groupCode: string,
  +serial: string,
  +signedGames: $ReadOnlyArray<Signup>,
  +username: string,
|};

export type GroupData = {|
  +groupCode: string,
  +leader: boolean,
  +ownSerial: string,
  +username: string,
  +leaveGroup?: boolean,
  +closeGroup?: boolean,
|};
