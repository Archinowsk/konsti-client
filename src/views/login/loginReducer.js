/* @flow */
import { SUBMIT_LOGIN, SUBMIT_LOGOUT } from './loginActions'

const initialState = {
  username: '',
  loggedIn: false,
  jwtToken: '',
  userGroup: '',
}

const loginReducer = (state: Object = initialState, action: Function) => {
  switch (action.type) {
    case SUBMIT_LOGIN:
      return {
        ...state,
        username: action.username,
        loggedIn: action.loggedIn,
        jwtToken: action.jwtToken,
        userGroup: action.userGroup,
      }
    case SUBMIT_LOGOUT:
      return {
        ...state,
        username: action.username,
        loggedIn: action.loggedIn,
        jwtToken: '',
        userGroup: '',
      }
    default:
      return state
  }
}

export default loginReducer
