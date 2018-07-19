/* @flow */
import { getGames } from 'utils/api'

export const SUBMIT_GET_GAMES = 'SUBMIT_GET_GAMES'

const submitGetGamesAsync = games => {
  return {
    type: SUBMIT_GET_GAMES,
    games,
  }
}

export const submitGetGames = () => {
  return async (dispatch: Function) => {
    let response = null
    try {
      response = await getGames()
      if (response && response.error) {
        return Promise.reject(response)
      }
      if (response && response.status && response.status === 'success') {
        dispatch(submitGetGamesAsync(response.games))
      }
      return response
    } catch (error) {
      console.log(error)
    }
  }
}
