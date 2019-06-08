// @flow
import type { Signup } from 'flow/user.flow'

export type GroupMember = {
  +enteredGames: $ReadOnlyArray<Signup>,
  +playerGroup: string,
  +serial: string,
  +signedGames: $ReadOnlyArray<Signup>,
  +username: string,
}
