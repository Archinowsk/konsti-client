/* @flow */
import { postHidden } from 'services/hiddenServices'
import { getSettings, postToggleAppOpen } from 'services/settingsServices'
import { postSignupTime } from 'services/signuptimeServices'
import type { Game } from 'flow/game.flow'
import type { Settings } from 'flow/settings.flow'

export const SUBMIT_UPDATE_HIDDEN = 'SUBMIT_UPDATE_HIDDEN'
export const SUBMIT_GET_SETTINGS = 'SUBMIT_GET_SETTINGS'
export const SUBMIT_SELECT_SIGNUP_TIME = 'SUBMIT_SELECT_SIGNUP_TIME'
export const SUBMIT_SET_TEST_TIME = 'SUBMIT_SET_TEST_TIME'
export const SUBMIT_TOGGLE_APP_OPEN = 'SUBMIT_TOGGLE_APP_OPEN'

export const submitUpdateHidden = (hiddenGames: $ReadOnlyArray<Game>) => {
  return async (dispatch: Function) => {
    let updateHiddenResponse = null
    try {
      updateHiddenResponse = await postHidden(hiddenGames)
    } catch (error) {
      console.log(`submitUpdateHidden error:`, error)
    }

    if (updateHiddenResponse && updateHiddenResponse.error) {
      return Promise.reject(updateHiddenResponse)
    }
    if (updateHiddenResponse && updateHiddenResponse.status === 'success') {
      dispatch(submitUpdateHiddenAsync(updateHiddenResponse.hiddenGames))
    }

    return updateHiddenResponse
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
    let settingsResponse = null
    try {
      settingsResponse = await getSettings()
    } catch (error) {
      console.log(`getSettings error:`, error)
    }

    if (settingsResponse && settingsResponse.error) {
      return Promise.reject(settingsResponse)
    }

    if (settingsResponse && settingsResponse.status === 'success') {
      dispatch(
        submitGetSettingsAsync({
          hiddenGames: settingsResponse.hiddenGames,
          signupTime: settingsResponse.signupTime,
          appOpen: settingsResponse.appOpen,
        })
      )
    }

    return settingsResponse
  }
}

const submitGetSettingsAsync = ({
  hiddenGames,
  signupTime,
  appOpen,
}: Settings) => {
  return {
    type: SUBMIT_GET_SETTINGS,
    hiddenGames,
    signupTime,
    appOpen,
  }
}

export const submitSignupTime = (signupTime: string) => {
  return async (dispatch: Function) => {
    let signupTimeResponse = null
    try {
      signupTimeResponse = await postSignupTime(signupTime)
    } catch (error) {
      console.log(`postSignupTime error:`, error)
    }

    if (signupTimeResponse && signupTimeResponse.error) {
      return Promise.reject(signupTimeResponse)
    }
    if (signupTimeResponse && signupTimeResponse.status === 'success') {
      dispatch(submitSignupTimeAsync(signupTimeResponse.signupTime))
    }

    return signupTimeResponse
  }
}

const submitSignupTimeAsync = (signupTime: string) => {
  return {
    type: SUBMIT_SELECT_SIGNUP_TIME,
    signupTime,
  }
}

export const submitSetTestTime = (testTime: string) => {
  return {
    type: SUBMIT_SET_TEST_TIME,
    testTime,
  }
}

export const submitToggleAppOpen = (appOpen: boolean) => {
  return async (dispatch: Function) => {
    let appOpenResponse = null
    try {
      appOpenResponse = await postToggleAppOpen(appOpen)
    } catch (error) {
      console.log(`postAppOpen error:`, error)
    }

    if (appOpenResponse && appOpenResponse.error) {
      return Promise.reject(appOpenResponse)
    }
    if (appOpenResponse && appOpenResponse.status === 'success') {
      dispatch(submitToggleAppOpenAsync(appOpenResponse.appOpen))
    }

    return appOpenResponse
  }
}

const submitToggleAppOpenAsync = (appOpen: boolean) => {
  return {
    type: SUBMIT_TOGGLE_APP_OPEN,
    appOpen,
  }
}
