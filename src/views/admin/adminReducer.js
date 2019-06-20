/* @flow */
import {
  SUBMIT_PLAYERS_ASSIGN,
  SUBMIT_UPDATE_HIDDEN,
  SUBMIT_GET_SETTINGS,
  SUBMIT_SELECT_SIGNUP_TIME,
  SUBMIT_SET_TEST_TIME,
  SUBMIT_TOGGLE_APP_OPEN,
} from 'views/admin/adminActions'
import type { AdminState } from 'flow/redux.flow'

const initialState = {
  updateResponse: { data: { errors: '' } },
  assignResponse: { data: { errors: '' } },
  hiddenGames: [],
  signupTime: '',
  adminSettingsLoaded: false,
  testTime: '',
  appOpen: true,
}

export const adminReducer = (
  state: AdminState = initialState,
  action: Function
) => {
  switch (action.type) {
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
        appOpen: action.appOpen,
      }
    case SUBMIT_SELECT_SIGNUP_TIME:
      return { ...state, signupTime: action.signupTime }
    case SUBMIT_SET_TEST_TIME:
      return { ...state, testTime: action.testTime }
    case SUBMIT_TOGGLE_APP_OPEN:
      return { ...state, appOpen: action.appOpen }
    default:
      return state
  }
}
