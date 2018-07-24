/* @flow */
import { postSignup } from 'services/signupServices'

export const SUBMIT_SIGNUP = 'SUBMIT_SIGNUP'
export const SUBMIT_SELECT_DATE = 'SUBMIT_SELECT_DATE'
export const SUBMIT_SELECTED_GAMES = 'SUBMIT_SELECTED_GAMES'

const submitSignupAsync = ({ status, selectedGames }) => {
  return {
    type: SUBMIT_SIGNUP,
    status,
    selectedGames,
  }
}

export const submitSignup = (signupData: Object) => {
  return async (dispatch: Function) => {
    let response = null
    try {
      response = await postSignup(signupData)
    } catch (error) {
      console.log(`postSignup error: ${error}`)
      dispatch(submitSignupAsync({ status: 'submitError', selectedGames: [] }))
    }

    if (response && response.error) {
      return Promise.reject(response)
    } else if (response && response.status === 'success') {
      dispatch(
        submitSignupAsync({
          status: 'submitSuccess',
          selectedGames: signupData.selectedGames,
        })
      )
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
