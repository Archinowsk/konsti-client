/* @flow */
import {
  SUBMIT_GAMES_UPDATE,
  SUBMIT_PLAYERS_ASSIGN,
  SUBMIT_UPDATE_HIDDEN,
  SUBMIT_GET_SETTINGS,
  SUBMIT_SELECT_SIGNUP_TIME,
} from 'views/admin/adminActions'
import type { AdminState } from 'flow/redux.flow'

const initialState = {
  updateResponse: { data: { errors: '' } },
  assignResponse: { data: { errors: '' } },
  hiddenGames: [],
  signupTime: '',
  adminSettingsLoaded: false,
}

const adminReducer = (state: AdminState = initialState, action: Function) => {
  switch (action.type) {
    case SUBMIT_GAMES_UPDATE:
      return { ...state, updateResponse: action.payload }
    case SUBMIT_PLAYERS_ASSIGN:
      return { ...state, assignResponse: action.payload }
    case SUBMIT_UPDATE_HIDDEN:
      return { ...state, hiddenGames: action.hiddenGames }
    case SUBMIT_GET_SETTINGS:
      return {
        ...state,
        hiddenGames: action.hiddenGames,
        signupTime: action.signupTime,
        adminSettingsLoaded: action.adminSettingsLoaded,
      }
    case SUBMIT_SELECT_SIGNUP_TIME:
      return { ...state, signupTime: action.signupTime }
    default:
      return state
  }
}

export default adminReducer
