/* @flow */
import api from 'utils/api'
import setAuthToken from 'utils/setAuthToken'

type SignupData = {
  username: string,
  selectedGames: Array<Object>,
  time: string,
}

export const postSignup = async (signupData: SignupData) => {
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

  if ((response && response.status !== 200) || (response && !response.data)) {
    console.log('Response status !== 200, reject')
    return Promise.reject(response)
  }

  if (response) {
    return response.data
  }
}
