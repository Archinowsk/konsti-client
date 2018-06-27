/* @flow */
import {
  SUBMIT_GAMES_UPDATE,
  SUBMIT_PLAYERS_ASSIGN,
  SUBMIT_UPDATE_BLACKLIST,
  SUBMIT_GET_SETTINGS,
  SUBMIT_SELECT_SIGNUP_TIME,
} from '~/views/admin/adminActions'

const initialState = {
  updateResponse: { data: { errors: '' } },
  assignResponse: { data: { errors: '' } },
  blacklistedGames: [],
  signupTime: '',
}

const loginReducer = (state: Object = initialState, action: Function) => {
  switch (action.type) {
    case SUBMIT_GAMES_UPDATE:
      return { ...state, updateResponse: action.payload }
    case SUBMIT_PLAYERS_ASSIGN:
      return { ...state, assignResponse: action.payload }
    case SUBMIT_UPDATE_BLACKLIST:
      return { ...state, blacklistedGames: action.blacklistedGames }
    case SUBMIT_GET_SETTINGS:
      return {
        ...state,
        blacklistedGames: action.blacklistedGames,
        signupTime: action.signupTime,
      }
    case SUBMIT_SELECT_SIGNUP_TIME:
      return { ...state, signupTime: action.signupTime }
    default:
      return state
  }
}

export default loginReducer
