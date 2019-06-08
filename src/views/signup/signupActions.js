/* @flow */
import { postSignup } from 'services/signupServices'
import type { Signup } from 'flow/user.flow'

export const SUBMIT_SIGNUP_TIME = 'SUBMIT_SELECT_SIGNUPTIME'
export const SUBMIT_SELECTED_GAMES = 'SUBMIT_SELECTED_GAMES'

type SignupData = {
  +username: string,
  +selectedGames: $ReadOnlyArray<Signup>,
}

export const submitSignup = (signupData: SignupData) => {
  return async (dispatch: Function) => {
    let response = null
    try {
      response = await postSignup(signupData)
    } catch (error) {
      console.log(`postSignup error:`, error)
    }

    if (response && response.error) {
      return Promise.reject(response)
    } else if (response && response.status === 'success') {
    }

    return response
  }
}

export const submitSignupTime = (signupTime: string) => {
  return {
    type: SUBMIT_SIGNUP_TIME,
    signupTime,
  }
}

export const submitSelectedGames = (selectedGames: $ReadOnlyArray<Signup>) => {
  return {
    type: SUBMIT_SELECTED_GAMES,
    selectedGames,
  }
}
