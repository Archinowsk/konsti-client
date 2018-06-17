/* @flow */
import { postSignup } from '../../utils/api'

export const SUBMIT_SIGNUP = 'SUBMIT_SIGNUP'
export const SUBMIT_SELECT_DATE = 'SUBMIT_SELECT_DATE'
export const SUBMIT_SELECT_GAME = 'SUBMIT_SELECT_GAME'
export const SUBMIT_DESELECT_GAME = 'SUBMIT_DESELECT_GAME'
export const SUBMIT_UPDATE_GAME = 'SUBMIT_UPDATE_GAME'
export const SUBMIT_ALL_SELECTED_GAMES = 'SUBMIT_ALL_SELECTED_GAMES'

const submitSignupAsync = status => {
  return {
    type: SUBMIT_SIGNUP,
    status,
  }
}

export const submitSignup = (signupData: Object) => {
  return async (dispatch: Function) => {
    let response = null
    try {
      response = await postSignup(signupData)
      console.log('submitSignup() response')
      console.log(response)
      if (response && response.error) {
        return Promise.reject(response)
      }
      if (response && response.status && response.status === 'success') {
        dispatch(submitSignupAsync(true))
      }
      return response
    } catch (error) {
      console.log(error)
      dispatch(submitSignupAsync(false))
    }
  }
}

export const submitSelectDate = (date: Date) => {
  return {
    type: SUBMIT_SELECT_DATE,
    date,
  }
}

export const submitSelectGame = (signupData: Object) => {
  return {
    type: SUBMIT_SELECT_GAME,
    signupData,
  }
}

export const submitDeselectGame = (gameIndex: number) => {
  return {
    type: SUBMIT_DESELECT_GAME,
    gameIndex,
  }
}

export const submitUpdatetGame = (signupData: Object) => {
  return {
    type: SUBMIT_UPDATE_GAME,
    signupData,
  }
}

export const submitAllSelectedGames = (selectedGames: Object) => {
  return {
    type: SUBMIT_ALL_SELECTED_GAMES,
    selectedGames,
  }
}
