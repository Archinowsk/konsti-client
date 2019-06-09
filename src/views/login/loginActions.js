/* @flow */
import { postLogin } from 'services/loginServices'

export const SUBMIT_LOGIN = 'SUBMIT_LOGIN'
export const SUBMIT_LOGOUT = 'SUBMIT_LOGOUT'

export const submitLogin = (loginData: Object) => {
  return async (dispatch: Function) => {
    let response = null
    try {
      response = await postLogin(loginData)
    } catch (error) {
      console.log(`postLogin error:`, error)
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
          serial: response.serial,
          playerGroup: response.playerGroup,
        })
      )
    }

    return response
  }
}

const submitLoginAsync = ({
  username,
  loggedIn,
  jwtToken,
  userGroup,
  serial,
  playerGroup,
}) => {
  return {
    type: SUBMIT_LOGIN,
    username,
    loggedIn,
    jwtToken,
    userGroup,
    serial,
    playerGroup,
  }
}

export const submitLogout = () => {
  return {
    type: SUBMIT_LOGOUT,
  }
}
