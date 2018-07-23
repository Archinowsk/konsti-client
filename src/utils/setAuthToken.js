/* @flow */
import axios from 'axios'
import store from 'utils/store'

const setAuthToken = () => {
  const state = store.getState()
  if (!state.login) {
    console.log('No login info in state')
    return
  }
  const jwtToken = state.login.jwtToken
  axios.defaults.headers.common.Authorization = `Bearer ${jwtToken}`
}

export default setAuthToken
