/* @flow */
import { postSignup } from 'services/signupServices'

export const SUBMIT_SIGNUP = 'SUBMIT_SIGNUP'
export const SUBMIT_SELECT_DATE = 'SUBMIT_SELECT_DATE'
export const SUBMIT_SELECTED_GAMES = 'SUBMIT_SELECTED_GAMES'

const submitSignupAsync = status => {
  return {
    type: SUBMIT_SIGNUP,
    status,
  }
}

export const submitSignup = (signupData: Object) => {
  console.log(signupData)
  return async (dispatch: Function) => {
    let response = null
    try {
      response = await postSignup(signupData)
    } catch (error) {
      console.log(error)
      dispatch(submitSignupAsync('submitError'))
    }

    if (response && response.error) {
      return Promise.reject(response)
    } else if (response && response.status === 'success') {
      dispatch(submitSignupAsync('submitSuccess'))
    }

    return response
  }
}

export const submitSelectDate = (date: Date) => {
  return {
    type: SUBMIT_SELECT_DATE,
    date,
  }
}

export const submitSelectedGames = (selectedGames: Object) => {
  return {
    type: SUBMIT_SELECTED_GAMES,
    selectedGames,
  }
}
