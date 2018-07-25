/* @flow */
import { SUBMIT_LOGIN } from 'views/login/loginActions'

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
        serial: action.serial,
      }
    default:
      return state
  }
}

export default loginReducer
