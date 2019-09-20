// @flow
import { api } from 'utils/api'
import { getJWT } from 'utils/getJWT'
import type { FavoriteData } from 'flow/user.flow'

export const postFavorite = async (
  favoriteData: FavoriteData
): Promise<any> => {
  api.defaults.headers.common.Authorization = `Bearer ${getJWT()}`

  let response = null
  try {
    response = await api.post('/favorite', { favoriteData })
  } catch (error) {
    if (error.message === 'Network Error') {
      console.log('Network error: no connection to server')
    } else {
      console.log(`postFavorite error:`, error)
    }
  }

  if ((response && response.status !== 200) || (response && !response.data)) {
    console.log('Response status !== 200, reject')
    return Promise.reject(response)
  }

  if (response) {
    return response.data
  }
}
