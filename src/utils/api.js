/* @flow */
import axios from 'axios'
import config from '../../config'
import store from './store'

const setAuthToken = () => {
  const state = store.getState()
  const jwtToken = state.login.jwtToken
  axios.defaults.headers.common.Authorization = `Bearer ${jwtToken}`
}

export const api = axios.create({
  baseURL: `${config.apiServerURL}/api`,
  timeout: 10000, // 10s
  headers: {
    'Content-Type': 'application/json',
  },
})

export const postLogin = async (loginData: Object) => {
  let response = null
  try {
    response = await api.post('/login', { loginData })
    if (response.status !== 200 || !response.data) {
      console.log('Response status !== 200, reject')
      return Promise.reject(response)
    }
    return response.data
  } catch (error) {
    if (error.message === 'Network Error') {
      console.log('Network error: no connection to server')
    } else {
      console.log(error)
    }
  }
}

export const postRegistration = async (registrationData: Object) => {
  let response = null
  try {
    response = await api.post('/user', { registrationData })
    if (response.status !== 200 || !response.data) {
      console.log('Response status !== 200, reject')
      return Promise.reject(response)
    }
    return response.data
  } catch (error) {
    if (error.message === 'Network Error') {
      console.log('Network error: no connection to server')
    } else {
      console.log(error)
    }
  }
}

export const postGamesUpdate = async () => {
  setAuthToken()

  let response = null
  try {
    response = await api.post('/games')
    if (response.status !== 200 || !response.data) {
      console.log('Response status !== 200, reject')
      return Promise.reject(response)
    }
    return response.data
  } catch (error) {
    if (error.message === 'Network Error') {
      console.log('Network error: no connection to server')
    } else {
      console.log(error)
    }
  }
}

export const postPlayersAssign = async (signupTime: Date) => {
  setAuthToken()

  let response = null
  try {
    response = await api.post('/players', { startingTime: signupTime })
    if (response.status !== 200 || !response.data) {
      console.log('Response status !== 200, reject')
      return Promise.reject(response)
    }
    return response.data
  } catch (error) {
    if (error.message === 'Network Error') {
      console.log('Network error: no connection to server')
    } else {
      console.log(error)
    }
  }
}

export const getGames = async () => {
  let response = null
  try {
    response = await api.get('/games')
    if (response.status !== 200 || !response.data) {
      console.log('Response status !== 200, reject')
      return Promise.reject(response)
    }
    return response.data
  } catch (error) {
    if (error.message === 'Network Error') {
      console.log('Network error: no connection to server')
    } else {
      console.log(error)
    }
  }
}

export const getUser = async (username: string) => {
  setAuthToken()

  let response = null
  try {
    response = await api.get('/user', {
      params: {
        username,
      },
    })
    if (response.status !== 200 || !response.data) {
      console.log('Response status !== 200, reject')
      return Promise.reject(response)
    }
    return response.data
  } catch (error) {
    if (error.message === 'Network Error') {
      console.log('Network error: no connection to server')
    } else {
      console.log(error)
    }
  }
}

export const getSettings = async () => {
  setAuthToken()

  let response = null
  try {
    response = await api.get('/settings')
    if (response.status !== 200 || !response.data) {
      console.log('Response status !== 200, reject')
      return Promise.reject(response)
    }
    return response.data
  } catch (error) {
    if (error.message === 'Network Error') {
      console.log('Network error: no connection to server')
    } else {
      console.log(error)
    }
  }
}

export const getResults = async () => {
  setAuthToken()

  let response = null
  try {
    response = await api.get('/results')
    if (response.status !== 200 || !response.data) {
      console.log('Response status !== 200, reject')
      return Promise.reject(response)
    }
    return response.data
  } catch (error) {
    if (error.message === 'Network Error') {
      console.log('Network error: no connection to server')
    } else {
      console.log(error)
    }
  }
}

export const postSignup = async (signupData: Object) => {
  setAuthToken()

  let response = null
  try {
    response = await api.post('/signup', { signupData })
    if (response.status !== 200 || !response.data) {
      console.log('Response status !== 200, reject')
      return Promise.reject(response)
    }
    return response.data
  } catch (error) {
    if (error.message === 'Network Error') {
      console.log('Network error: no connection to server')
    } else {
      console.log(error)
    }
  }
}

export const postFavorite = async (favoriteData: Object) => {
  setAuthToken()

  let response = null
  try {
    response = await api.post('/favorite', { favoriteData })
    if (response.status !== 200 || !response.data) {
      console.log('Response status !== 200, reject')
      return Promise.reject(response)
    }
    return response.data
  } catch (error) {
    if (error.message === 'Network Error') {
      console.log('Network error: no connection to server')
    } else {
      console.log(error)
    }
  }
}

export const postBlacklist = async (blacklistData: Object) => {
  setAuthToken()

  let response = null
  try {
    response = await api.post('/blacklist', { blacklistData })
    if (response.status !== 200 || !response.data) {
      console.log('Response status !== 200, reject')
      return Promise.reject(response)
    }
    return response.data
  } catch (error) {
    if (error.message === 'Network Error') {
      console.log('Network error: no connection to server')
    } else {
      console.log(error)
    }
  }
}

export const postSignupTime = async (signupTime: Date) => {
  setAuthToken()

  let response = null
  try {
    response = await api.post('/signuptime', { signupTime })
    if (response.status !== 200 || !response.data) {
      console.log('Response status !== 200, reject')
      return Promise.reject(response)
    }
    return response.data
  } catch (error) {
    if (error.message === 'Network Error') {
      console.log('Network error: no connection to server')
    } else {
      console.log(error)
    }
  }
}

export const postFeedback = async (feedbackData: Object) => {
  setAuthToken()

  let response = null
  try {
    response = await api.post('/feedback', { feedbackData })
    if (response.status !== 200 || !response.data) {
      console.log('Response status !== 200, reject')
      return Promise.reject(response)
    }
    console.log('postFeedback() response')
    console.log(response.data)
    return response.data
  } catch (error) {
    if (error.message === 'Network Error') {
      console.log('Network error: no connection to server')
    } else {
      console.log(error)
    }
  }
}
