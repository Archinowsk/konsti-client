/* @flow */
import { postLogin } from 'services/loginServices'

export const SUBMIT_LOGIN = 'SUBMIT_LOGIN'
export const SUBMIT_LOGOUT = 'SUBMIT_LOGOUT'

const submitLoginAsync = ({ username, loggedIn, jwtToken, userGroup }) => {
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
    } catch (error) {
      console.log(`postLogin error: ${error}`)
      dispatch(submitLoginAsync(error))
    }

    if (response && response.error) {
      return Promise.reject(response)
    }
    if (response && response.status === 'success') {
      dispatch(
        submitLoginAsync({
          username: loginData.username,
          loggedIn: true,
          jwtToken: response.jwtToken,
          userGroup: response.userGroup,
        })
      )
    }

    return response
  }
}

export const submitLogout = () => {
  return {
    type: SUBMIT_LOGOUT,
    username: '',
    loggedIn: false,
  }
}
