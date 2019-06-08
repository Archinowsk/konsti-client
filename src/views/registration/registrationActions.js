/* @flow */
import { postRegistration } from 'services/userServices'
import { submitLogin } from 'views/login/loginActions'

export const submitRegistration = (registrationData: Object) => {
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
      dispatch(submitLogin(registrationData))
    }

    return response
  }
}
