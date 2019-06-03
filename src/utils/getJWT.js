/* @flow */
import store from 'utils/store'

const getJWT = () => {
  const state = store.getState()
  if (!state.login) {
    console.log('No login info in state')
    return 'invalid token'
  }
  return state.login.jwtToken
}

export default getJWT
