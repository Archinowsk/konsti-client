/* @flow */
import { postLogin } from '~/utils/api'

export const SUBMIT_LOGIN = 'SUBMIT_LOGIN'
export const SUBMIT_LOGOUT = 'SUBMIT_LOGOUT'

const submitLoginAsync = (username, loggedIn, jwtToken, userGroup) => {
  return {
    type: SUBMIT_LOGIN,
    username,
    loggedIn,
    jwtToken,
    userGroup,
  }
}

export const submitLogin = (loginData: Object) => {
  return async (dispatch: Function) => {
    let response = null
    try {
      response = await postLogin(loginData)
      if (response && response.error) {
        return Promise.reject(response)
      }
      if (response && response.status && response.status === 'success') {
        dispatch(
          submitLoginAsync(
            loginData.username,
            true,
            response.jwtToken,
            response.userGroup
          )
        )
      }
      return response
    } catch (error) {
      dispatch(submitLoginAsync(error))
    }
  }
}

export const submitLogout = () => {
  return {
    type: SUBMIT_LOGOUT,
    username: '',
    loggedIn: false,
  }
}
