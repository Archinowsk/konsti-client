// @flow
import { api } from 'utils/api'
import { getJWT } from 'utils/getJWT'

export const postGamesUpdate = async (): Promise<any> => {
  api.defaults.headers.common.Authorization = `Bearer ${getJWT()}`

  let response = null
  try {
    response = await api.post('/games')
  } catch (error) {
    if (error.message === 'Network Error') {
      console.log('Network error: no connection to server')
    } else {
      console.log(`postGamesUpdate error:`, error)
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

export const getGames = async (): Promise<any> => {
  let response = null
  try {
    response = await api.get('/games')
  } catch (error) {
    if (error.message === 'Network Error') {
      console.log('Network error: no connection to server')
    } else {
      console.log(`getGames error:`, error)
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
