// @flow
import { SUBMIT_LOGIN } from 'views/login/loginActions'
import {
  SUBMIT_UPDATE_GROUP_CODE,
  SUBMIT_LEAVE_GROUP,
  SUBMIT_UPDATE_GROUP_MEMBERS,
} from 'views/group/groupActions'

import type { LoginState } from 'flow/redux.flow'

const initialState = {
  username: '',
  loggedIn: false,
  jwt: '',
  userGroup: 'user',
  serial: '',
  groupCode: '0',
  groupMembers: [],
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
        jwt: action.jwt,
        userGroup: action.userGroup,
        serial: action.serial,
        groupCode: action.groupCode,
      }
    case SUBMIT_UPDATE_GROUP_CODE:
      return {
        ...state,
        groupCode: action.groupCode,
      }
    case SUBMIT_LEAVE_GROUP:
      return { ...state, groupCode: action.groupCode, groupMembers: [] }
    case SUBMIT_UPDATE_GROUP_MEMBERS:
      return {
        ...state,
        groupMembers: action.groupMembers,
      }
    default:
      return state
  }
}
