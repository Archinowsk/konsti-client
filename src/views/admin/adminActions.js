/* @flow */
import { postGamesUpdate } from 'services/gamesServices'
import { postPlayersAssign } from 'services/playersServices'
import { postBlacklist } from 'services/blacklistServices'
import { getSettings } from 'services/settingsServices'
import { postSignupTime } from 'services/signuptimeServices'

export const SUBMIT_GAMES_UPDATE = 'SUBMIT_GAMES_UPDATE'
export const SUBMIT_PLAYERS_ASSIGN = 'SUBMIT_PLAYERS_ASSIGN'
export const SUBMIT_UPDATE_BLACKLIST = 'SUBMIT_UPDATE_BLACKLIST'
export const SUBMIT_GET_SETTINGS = 'SUBMIT_GET_SETTINGS'
export const SUBMIT_SELECT_SIGNUP_TIME = 'SUBMIT_SELECT_SIGNUP_TIME'

const submitGamesUpdateAsync = ({ updateResponse }) => {
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
    } catch (error) {
      console.log(`postGamesUpdate error: ${error}`)
    }

    if (response && response.error) {
      return Promise.reject(response)
    }
    if (response && response.status === 'success') {
      dispatch(submitGamesUpdateAsync({ updateResponse: response }))
    }

    return response
  }
}

const submitPlayersAssignAsync = ({ assignResponse }) => {
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
    } catch (error) {
      console.log(`postPlayersAssign error: ${error}`)
      dispatch(submitPlayersAssignAsync({ assignResponse: error }))
    }

    if (response && response.error) {
      return Promise.reject(response)
    }
    if (response && response.status === 'success') {
      dispatch(submitPlayersAssignAsync({ assignResponse: response }))
    }

    return response
  }
}

const submitUpdateBlacklistAsync = ({ blacklistedGames }) => {
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
    } catch (error) {
      console.log(`submitUpdateBlacklist error: ${error}`)
    }

    if (response && response.error) {
      return Promise.reject(response)
    }
    if (response && response.status === 'success') {
      dispatch(
        submitUpdateBlacklistAsync({
          blacklistedGames: blacklistData.blacklistedGames,
        })
      )
    }

    return response
  }
}

const submitGetSettingsAsync = ({ blacklistedGames, signupTime }) => {
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
    } catch (error) {
      console.log(`getSettings error: ${error}`)
    }

    if (response && response.error) {
      return Promise.reject(response)
    }
    if (response && response.status === 'success') {
      dispatch(
        submitGetSettingsAsync({
          blacklistedGames: response.games.blacklistedGames,
          signupTime: response.signupTime,
        })
      )
    }

    return response
  }
}

const submitSignupTimeAsync = ({ signupTime }) => {
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
    } catch (error) {
      console.log(`postSignupTime error: ${error}`)
    }

    if (response && response.error) {
      return Promise.reject(response)
    }
    if (response && response.status === 'success') {
      dispatch(submitSignupTimeAsync({ signupTime: signupTime }))
    }

    return response
  }
}
