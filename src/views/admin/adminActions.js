/* @flow */
import { postGamesUpdate } from 'services/gamesServices'
import { postPlayersAssign } from 'services/playersServices'
import { postHidden } from 'services/hiddenServices'
import { getSettings } from 'services/settingsServices'
import { postSignupTime } from 'services/signuptimeServices'
import type { Game, GamesUpdataResponse } from 'flow/game.flow'
import type { AssignResponse } from 'flow/result.flow'
import type { Settings } from 'flow/settings.flow'

export const SUBMIT_GAMES_UPDATE = 'SUBMIT_GAMES_UPDATE'
export const SUBMIT_PLAYERS_ASSIGN = 'SUBMIT_PLAYERS_ASSIGN'
export const SUBMIT_UPDATE_HIDDEN = 'SUBMIT_UPDATE_HIDDEN'
export const SUBMIT_GET_SETTINGS = 'SUBMIT_GET_SETTINGS'
export const SUBMIT_SELECT_SIGNUP_TIME = 'SUBMIT_SELECT_SIGNUP_TIME'

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
      dispatch(submitGamesUpdateAsync(response))
    }

    return response
  }
}

const submitGamesUpdateAsync = (gamesUpdateResponse: GamesUpdataResponse) => {
  return {
    type: SUBMIT_GAMES_UPDATE,
    payload: gamesUpdateResponse,
  }
}

export const submitPlayersAssign = (signupTime: string) => {
  return async (dispatch: Function) => {
    let response = null
    try {
      response = await postPlayersAssign(signupTime)
    } catch (error) {
      console.log(`postPlayersAssign error:`, error)
      dispatch(submitPlayersAssignAsync(error))
    }

    if (response && response.error) {
      return Promise.reject(response)
    }
    if (response && response.status === 'success') {
      dispatch(submitPlayersAssignAsync(response))
    }

    return response
  }
}

const submitPlayersAssignAsync = (assignResponse: AssignResponse) => {
  return {
    type: SUBMIT_PLAYERS_ASSIGN,
    payload: assignResponse,
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
      dispatch(submitUpdateHiddenAsync(hiddenGames))
    }

    return response
  }
}

const submitUpdateHiddenAsync = (hiddenGames: $ReadOnlyArray<Game>) => {
  return {
    type: SUBMIT_UPDATE_HIDDEN,
    hiddenGames,
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

const submitGetSettingsAsync = ({
  hiddenGames,
  signupTime,
  adminSettingsLoaded,
}: Settings) => {
  return {
    type: SUBMIT_GET_SETTINGS,
    hiddenGames,
    signupTime,
    adminSettingsLoaded,
  }
}

export const submitSignupTime = (signupTime: string) => {
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
      dispatch(submitSignupTimeAsync(signupTime))
    }

    return response
  }
}

const submitSignupTimeAsync = (signupTime: string) => {
  return {
    type: SUBMIT_SELECT_SIGNUP_TIME,
    signupTime,
  }
}
