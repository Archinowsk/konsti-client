/* @flow */
import { postLogin } from 'services/loginServices'
import type { Login, LoginData } from 'flow/user.flow'

export const SUBMIT_LOGIN = 'SUBMIT_LOGIN'

export const submitLogin = (loginData: Login) => {
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
}: LoginData) => {
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
