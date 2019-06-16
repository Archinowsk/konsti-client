/* @flow */
import { SUBMIT_LOGIN } from 'views/login/loginActions'
import {
  SUBMIT_UPDATE_GROUP,
  SUBMIT_UPDATE_GROUP_MEMBERS,
  SUBMIT_LEAVE_GROUP,
} from 'views/group/groupActions'
import type { LoginState } from 'flow/redux.flow'

const initialState = {
  username: '',
  loggedIn: false,
  jwtToken: '',
  userGroup: '',
  serial: '',
  playerGroup: '0',
  groupMembers: [],
}

const loginReducer = (state: LoginState = initialState, action: Function) => {
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
    case SUBMIT_UPDATE_GROUP:
      return {
        ...state,
        playerGroup: action.playerGroup,
      }
    case SUBMIT_UPDATE_GROUP_MEMBERS:
      return {
        ...state,
        groupMembers: action.groupMembers,
      }
    case SUBMIT_LEAVE_GROUP:
      return { ...state, playerGroup: '0', groupMembers: [] }
    default:
      return state
  }
}

export default loginReducer
