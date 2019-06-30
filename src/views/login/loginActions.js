/* @flow */
import { postLogin } from 'services/loginServices'
import type { Login, LoginData } from 'flow/user.flow'

export const SUBMIT_LOGIN = 'SUBMIT_LOGIN'

export const submitLogin = (loginData: Login) => {
  return async (dispatch: Function) => {
    let loginResponse = null
    try {
      loginResponse = await postLogin(loginData)
    } catch (error) {
      console.log(`postLogin error:`, error)
      dispatch(submitLoginAsync(error))
    }

    if (loginResponse && loginResponse.error) {
      return Promise.reject(loginResponse)
    }
    if (loginResponse && loginResponse.status === 'success') {
      dispatch(
        submitLoginAsync({
          loggedIn: true,
          username: loginResponse.username,
          jwt: loginResponse.jwt,
          userGroup: loginResponse.userGroup,
          serial: loginResponse.serial,
          groupCode: loginResponse.groupCode,
        })
      )
    }

    return loginResponse
  }
}

const submitLoginAsync = ({
  username,
  loggedIn,
  jwt,
  userGroup,
  serial,
  groupCode,
}: LoginData) => {
  return {
    type: SUBMIT_LOGIN,
    username,
    loggedIn,
    jwt,
    userGroup,
    serial,
    groupCode,
  }
}
