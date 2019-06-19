/* @flow */
import { store } from 'utils/store'

export const getJWT = () => {
  const state = store.getState()
  if (!state.login) {
    console.log('No login info in state')
    return 'invalid token'
  }
  return state.login.jwtToken
}
