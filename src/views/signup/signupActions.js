/* @flow */
import { postSignup } from 'services/signupServices'
import type { Game } from 'flow/game.flow'

export const SUBMIT_SELECT_DATE = 'SUBMIT_SELECT_DATE'
export const SUBMIT_SELECTED_GAMES = 'SUBMIT_SELECTED_GAMES'

type SignupData = {
  username: string,
  selectedGames: Array<Game>,
  time: string,
}

export const submitSignup = (signupData: SignupData) => {
  return async (dispatch: Function) => {
    let response = null
    try {
      response = await postSignup(signupData)
    } catch (error) {
      console.log(`postSignup error: ${error}`)
    }

    if (response && response.error) {
      return Promise.reject(response)
    } else if (response && response.status === 'success') {
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

export const submitSelectedGames = (selectedGames: Array<Game>) => {
  return {
    type: SUBMIT_SELECTED_GAMES,
    selectedGames,
  }
}
