/* @flow */
import { getUser } from 'services/userServices'
import { postFavorite } from 'services/favoriteServices'
import type { FavoriteData, UserGames } from 'flow/user.flow'
import type { Game } from 'flow/game.flow'

export const SUBMIT_GET_USER_GAMES = 'SUBMIT_GET_USER_GAMES'
export const SUBMIT_UPDATE_FAVORITES = 'SUBMIT_UPDATE_FAVORITES'

export const submitGetUser = (username: string) => {
  return async (dispatch: Function) => {
    let response = null
    try {
      response = await getUser(username)
    } catch (error) {
      console.log(`getUser error:`, error)
    }

    if (response && response.error) {
      return Promise.reject(response)
    }
    if (response && response.status === 'success') {
      const enteredGames = response.games.enteredGames
      const favoritedGames = response.games.favoritedGames
      const signedGames = response.games.signedGames

      dispatch(
        submitGetUserAsync({
          enteredGames,
          favoritedGames,
          signedGames,
        })
      )
    }

    return response
  }
}

const submitGetUserAsync = ({
  enteredGames,
  favoritedGames,
  signedGames,
}: UserGames) => {
  return {
    type: SUBMIT_GET_USER_GAMES,
    enteredGames,
    favoritedGames,
    signedGames,
  }
}

export const submitUpdateFavorites = (favoriteData: FavoriteData) => {
  return async (dispatch: Function) => {
    let response = null
    try {
      response = await postFavorite(favoriteData)
    } catch (error) {
      console.log(`postFavorite error:`, error)
    }

    if (response && response.error) {
      return Promise.reject(response)
    }
    if (response && response.status === 'success') {
      dispatch(submitUpdateFavoritesAsync(favoriteData.favoritedGames))
    }

    return response
  }
}

const submitUpdateFavoritesAsync = (favoritedGames: $ReadOnlyArray<Game>) => {
  return {
    type: SUBMIT_UPDATE_FAVORITES,
    favoritedGames,
  }
}
