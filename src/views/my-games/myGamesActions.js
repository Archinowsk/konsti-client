/* @flow */
import { getUser } from 'services/userServices'
import { postFavorite } from 'services/favoriteServices'

export const SUBMIT_GET_USER_GAMES = 'SUBMIT_GET_USER_GAMES'
export const SUBMIT_UPDATE_FAVORITES = 'SUBMIT_UPDATE_FAVORITES'

// $FlowFixMe
export const submitGetUserAsync = ({
  enteredGames,
  favoritedGames,
  signedGames,
  myGamesLoaded,
}) => {
  return {
    type: SUBMIT_GET_USER_GAMES,
    enteredGames,
    favoritedGames,
    signedGames,
    myGamesLoaded,
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
    if (response && response.status === 'success') {
      /*
      // Group all unique start time
      const groupGamesByTime = array => {
        return array.reduce((acc, item) => {
          acc[item['time']] = acc[item['time']] || []
          acc[item['time']].push(item)
          return acc
        }, {})
      }

      const enteredGames = groupGamesByTime(response.games.enteredGames)
      const favoritedGames = groupGamesByTime(response.games.favoritedGames)
      const signedGames = groupGamesByTime(response.games.signedGames)
      */

      const enteredGames = response.games.enteredGames
      const favoritedGames = response.games.favoritedGames
      const signedGames = response.games.signedGames

      dispatch(
        submitGetUserAsync({
          enteredGames,
          favoritedGames,
          signedGames,
          myGamesLoaded: true,
        })
      )
    }

    return response
  }
}

const submitUpdateFavoritesAsync = ({ favoritedGames }) => {
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
    if (response && response.status === 'success') {
      dispatch(
        submitUpdateFavoritesAsync({
          favoritedGames: favoriteData.favoritedGames,
        })
      )
    }

    return response
  }
}
