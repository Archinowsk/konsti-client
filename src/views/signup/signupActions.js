/* @flow */
import { postSignup } from 'services/signupServices'
import type { Signup, SignupData } from 'flow/user.flow'

export const SUBMIT_SIGNUP_TIME = 'SUBMIT_SELECT_SIGNUPTIME'
export const SUBMIT_SELECTED_GAMES = 'SUBMIT_SELECTED_GAMES'
export const SUBMIT_SIGNED_GAMES = 'SUBMIT_SIGNED_GAMES'

export const submitSignup = (signupData: SignupData) => {
  return async (dispatch: Function) => {
    let signupResponse = null
    try {
      signupResponse = await postSignup(signupData)
    } catch (error) {
      console.log(`postSignup error:`, error)
    }

    if (signupResponse && signupResponse.error) {
      return Promise.reject(signupResponse)
    } else if (signupResponse && signupResponse.status === 'success') {
      dispatch(submitSignupAsync(signupResponse.signedGames))
    }

    return signupResponse
  }
}

const submitSignupAsync = (signedGames: $ReadOnlyArray<Signup>) => {
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
