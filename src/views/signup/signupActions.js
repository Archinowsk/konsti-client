/* @flow */
import { postSignup } from 'services/signupServices'
import type { Signup, SignupData } from 'flow/user.flow'

export const SUBMIT_SIGNUP_TIME = 'SUBMIT_SELECT_SIGNUPTIME'
export const SUBMIT_SELECTED_GAMES = 'SUBMIT_SELECTED_GAMES'
export const SUBMIT_SIGNED_GAMES = 'SUBMIT_SIGNED_GAMES'

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
      dispatch(submitSignupAsync(response.signedGames))
    }

    return response
  }
}

export const submitSignupAsync = (signedGames: $ReadOnlyArray<Signup>) => {
  return {
    type: SUBMIT_SIGNED_GAMES,
    signedGames,
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
