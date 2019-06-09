/* @flow */
import { postRegistration } from 'services/userServices'
import { submitLogin } from 'views/login/loginActions'
import type { RegistrationData } from 'flow/user.flow'

export const submitRegistration = (registrationData: RegistrationData) => {
  return async (dispatch: Function) => {
    let response = null
    try {
      response = await postRegistration(registrationData)
    } catch (error) {
      return Promise.reject(error)
    }

    if (response && response.error) {
      return Promise.reject(response)
    }

    if (response && response.status === 'success') {
      dispatch(
        submitLogin({
          username: registrationData.username,
          password: registrationData.password,
        })
      )
    }

    return response
  }
}
