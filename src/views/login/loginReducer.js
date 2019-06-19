/* @flow */
import { SUBMIT_LOGIN } from 'views/login/loginActions'

import type { LoginState } from 'flow/redux.flow'

const initialState = {
  username: '',
  loggedIn: false,
  jwtToken: '',
  userGroup: '',
  serial: '',
}

export const loginReducer = (
  state: LoginState = initialState,
  action: Function
) => {
  switch (action.type) {
    case SUBMIT_LOGIN:
      return {
        ...state,
        username: action.username,
        loggedIn: action.loggedIn,
        jwtToken: action.jwtToken,
        userGroup: action.userGroup,
        serial: action.serial,
        playerGroup: action.playerGroup,
      }
    default:
      return state
  }
}
