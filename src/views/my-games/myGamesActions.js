/* @flow */
import { getUser } from 'services/userServices'
import { postFavorite } from 'services/favoriteServices'

export const SUBMIT_GET_USER_GAMES = 'SUBMIT_GET_USER_GAMES'
export const SUBMIT_UPDATE_FAVORITES = 'SUBMIT_UPDATE_FAVORITES'

const submitGetUserAsync = (enteredGames, favoritedGames, signedGames) => {
  return {
    type: SUBMIT_GET_USER_GAMES,
    enteredGames,
    favoritedGames,
    signedGames,
  }
}

export const submitGetUser = (username: string) => {
  return async (dispatch: Function) => {
    let response = null
    try {
      response = await getUser(username)
    } catch (error) {
      console.log(`getUser error: ${error}`)
    }

    if (response && response.error) {
      return Promise.reject(response)
    }
    if (response && response.status && response.status === 'success') {
      dispatch(
        submitGetUserAsync(
          response.games.enteredGames,
          response.games.favoritedGames,
          response.games.signedGames
        )
      )
    }

    return response
  }
}

const submitUpdateFavoritesAsync = favoritedGames => {
  return {
    type: SUBMIT_UPDATE_FAVORITES,
    favoritedGames,
  }
}

export const submitUpdateFavorites = (favoriteData: Object) => {
  return async (dispatch: Function) => {
    let response = null
    try {
      response = await postFavorite(favoriteData)
    } catch (error) {
      console.log(`postFavorite error: ${error}`)
    }

    if (response && response.error) {
      return Promise.reject(response)
    }
    if (response && response.status && response.status === 'success') {
      dispatch(submitUpdateFavoritesAsync(favoriteData.favoritedGames))
    }

    return response
  }
}
