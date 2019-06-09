/* @flow */
import { getGames } from 'services/gamesServices'
import type { Game } from 'flow/game.flow'

export const SUBMIT_GET_GAMES = 'SUBMIT_GET_GAMES'

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
      dispatch(submitGetGamesAsync(response.games))
    }

    return response
  }
}

const submitGetGamesAsync = (games: $ReadOnlyArray<Game>) => {
  return {
    type: SUBMIT_GET_GAMES,
    games,
  }
}
