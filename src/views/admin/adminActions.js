/* @flow */
import {
  postGamesUpdate,
  postPlayersAssign,
  postBlacklist,
  getSettings,
  postSignupTime,
} from '../../utils/api'

export const SUBMIT_GAMES_UPDATE = 'SUBMIT_GAMES_UPDATE'
export const SUBMIT_PLAYERS_ASSIGN = 'SUBMIT_PLAYERS_ASSIGN'
export const SUBMIT_UPDATE_BLACKLIST = 'SUBMIT_UPDATE_BLACKLIST'
export const SUBMIT_GET_SETTINGS = 'SUBMIT_GET_SETTINGS'
export const SUBMIT_SELECT_SIGNUP_TIME = 'SUBMIT_SELECT_SIGNUP_TIME'

const submitGamesUpdateAsync = updateResponse => {
  return {
    type: SUBMIT_GAMES_UPDATE,
    payload: updateResponse,
  }
}

export const submitGamesUpdate = () => {
  return async (dispatch: Function) => {
    let response = null
    try {
      response = await postGamesUpdate()
      if (response && response.error) {
        return Promise.reject(response)
      }
      if (response && response.status && response.status === 'success') {
        dispatch(submitGamesUpdateAsync(response))
      }
      return response
    } catch (error) {
      console.log(error)
    }
  }
}

const submitPlayersAssignAsync = assignResponse => {
  return {
    type: SUBMIT_PLAYERS_ASSIGN,
    payload: assignResponse,
  }
}

export const submitPlayersAssign = (signupTime: Date) => {
  return async (dispatch: Function) => {
    let response = null
    try {
      response = await postPlayersAssign(signupTime)
      if (response && response.error) {
        return Promise.reject(response)
      }
      if (response && response.status && response.status === 'success') {
        dispatch(submitPlayersAssignAsync(response))
      }
      return response
    } catch (error) {
      dispatch(submitPlayersAssignAsync(error))
    }
  }
}

const submitUpdateBlacklistAsync = blacklistedGames => {
  return {
    type: SUBMIT_UPDATE_BLACKLIST,
    blacklistedGames,
  }
}

export const submitUpdateBlacklist = (blacklistData: Object) => {
  return async (dispatch: Function) => {
    let response = null
    try {
      response = await postBlacklist(blacklistData)
      if (response && response.error) {
        return Promise.reject(response)
      }
      if (response && response.status && response.status === 'success') {
        dispatch(submitUpdateBlacklistAsync(blacklistData.blacklistedGames))
      }
      return response
    } catch (error) {
      console.log(error)
    }
  }
}

const submitGetSettingsAsync = (blacklistedGames, signupTime) => {
  return {
    type: SUBMIT_GET_SETTINGS,
    blacklistedGames,
    signupTime,
  }
}

export const submitGetSettings = () => {
  return async (dispatch: Function) => {
    let response = null
    try {
      response = await getSettings()
      if (response && response.error) {
        return Promise.reject(response)
      }
      if (response && response.status && response.status === 'success') {
        dispatch(
          submitGetSettingsAsync(
            response.games.blacklistedGames,
            response.signupTime
          )
        )
      }
      return response
    } catch (error) {
      console.log(error)
    }
  }
}

const submitSignupTimeAsync = signupTime => {
  return {
    type: SUBMIT_SELECT_SIGNUP_TIME,
    signupTime,
  }
}

export const submitSignupTime = (signupTime: Date) => {
  return async (dispatch: Function) => {
    let response = null
    try {
      response = await postSignupTime(signupTime)
      if (response && response.error) {
        return Promise.reject(response)
      }
      if (response && response.status && response.status === 'success') {
        dispatch(submitSignupTimeAsync(signupTime))
      }
      return response
    } catch (error) {
      console.log(error)
    }
  }
}
