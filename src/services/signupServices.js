/* @flow */
import api from 'utils/api'
import setAuthToken from 'utils/setAuthToken'

export const postSignup = async (signupData: Object) => {
  setAuthToken()

  let response = null
  try {
    response = await api.post('/signup', { signupData })
  } catch (error) {
    if (error.message === 'Network Error') {
      console.log('Network error: no connection to server')
    } else {
      console.log(`postSignup error: ${error}`)
    }
  }

  if (response.status !== 200 || !response.data) {
    console.log('Response status !== 200, reject')
    return Promise.reject(response)
  }

  return response.data
}
