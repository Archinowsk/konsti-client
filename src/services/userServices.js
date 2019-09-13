/* @flow */
import { api } from 'utils/api'
import { getJWT } from 'utils/getJWT'
import type { RegistrationData } from 'flow/user.flow'

export const postRegistration = async (
  registrationData: RegistrationData
): Promise<any> => {
  const { username, password, serial } = registrationData

  let response = null
  try {
    response = await api.post('/user', { username, password, serial })
  } catch (error) {
    if (error.message === 'Network Error') {
      console.log('Network error: no connection to server')
    } else {
      console.log(`postRegistration error:`, error)
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

export const getUser = async (username: string): Promise<any> => {
  api.defaults.headers.common.Authorization = `Bearer ${getJWT()}`

  let response = null
  try {
    response = await api.get('/user', {
      params: {
        username,
      },
    })
  } catch (error) {
    if (error.message === 'Network Error') {
      console.log('Network error: no connection to server')
    } else {
      console.log(`getUser error:`, error)
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

export const getUserBySerial = async (serial: string): Promise<any> => {
  api.defaults.headers.common.Authorization = `Bearer ${getJWT()}`

  let response = null
  try {
    response = await api.get('/user', {
      params: {
        serial,
      },
    })
  } catch (error) {
    if (error.message === 'Network Error') {
      console.log('Network error: no connection to server')
    } else {
      console.log(`getUser error:`, error)
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

export const updateUserPassword = async (
  username: string,
  serial: string,
  password: string,
  changePassword: boolean
): Promise<any> => {
  let response = null
  try {
    response = await api.post('/user', {
      username,
      serial,
      password,
      changePassword: true,
    })
  } catch (error) {
    if (error.message === 'Network Error') {
      console.log('Network error: no connection to server')
    } else {
      console.log(`postRegistration error:`, error)
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
