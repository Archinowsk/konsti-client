/* @flow */
import { postGamesUpdate } from 'services/gamesServices'
import { postPlayersAssign } from 'services/playersServices'
import { postHidden } from 'services/hiddenServices'
import { getSettings } from 'services/settingsServices'
import { postSignupTime } from 'services/signuptimeServices'
import type { Game } from 'flow/game.flow'

export const SUBMIT_GAMES_UPDATE = 'SUBMIT_GAMES_UPDATE'
export const SUBMIT_PLAYERS_ASSIGN = 'SUBMIT_PLAYERS_ASSIGN'
export const SUBMIT_UPDATE_HIDDEN = 'SUBMIT_UPDATE_HIDDEN'
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
      console.log(`postGamesUpdate error:`, error)
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
      console.log(`postPlayersAssign error:`, error)
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

const submitUpdateHiddenAsync = ({ hiddenGames }) => {
  return {
    type: SUBMIT_UPDATE_HIDDEN,
    hiddenGames,
  }
}

export const submitUpdateHidden = (hiddenGames: $ReadOnlyArray<Game>) => {
  return async (dispatch: Function) => {
    let response = null
    try {
      response = await postHidden(hiddenGames)
    } catch (error) {
      console.log(`submitUpdateHidden error:`, error)
    }

    if (response && response.error) {
      return Promise.reject(response)
    }
    if (response && response.status === 'success') {
      dispatch(
        submitUpdateHiddenAsync({
          hiddenGames,
        })
      )
    }

    return response
  }
}

const submitGetSettingsAsync = ({
  hiddenGames,
  signupTime,
  adminSettingsLoaded,
}) => {
  return {
    type: SUBMIT_GET_SETTINGS,
    hiddenGames,
    signupTime,
    adminSettingsLoaded,
  }
}

export const submitGetSettings = () => {
  return async (dispatch: Function) => {
    let response = null
    try {
      response = await getSettings()
    } catch (error) {
      console.log(`getSettings error:`, error)
    }

    if (response && response.error) {
      return Promise.reject(response)
    }
    if (response && response.status === 'success') {
      dispatch(
        submitGetSettingsAsync({
          hiddenGames: response.hiddenGames,
          signupTime: response.signupTime,
          adminSettingsLoaded: true,
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
      console.log(`postSignupTime error:`, error)
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
