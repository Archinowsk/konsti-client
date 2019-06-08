// @flow
import type { Signup } from 'flow/user.flow'

export type GroupMember = {
  enteredGames: Array<Signup>,
  playerGroup: string,
  serial: string,
  signedGames: Array<Signup>,
  username: string,
}
