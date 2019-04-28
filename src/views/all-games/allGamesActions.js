/* @flow */
import { getGames } from 'services/gamesServices'

export const SUBMIT_GET_GAMES = 'SUBMIT_GET_GAMES'

const submitGetGamesAsync = ({ games }) => {
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
    } catch (error) {
      console.log(`getGames error:`, error)
    }

    if (response && response.error) {
      return Promise.reject(response)
    }
    if (response && response.status === 'success') {
      dispatch(submitGetGamesAsync({ games: response.games }))
    }

    return response
  }
}
