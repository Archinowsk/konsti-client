/* @flow */
import { postRegistration } from 'services/userServices'
import { submitLogin } from 'views/login/loginActions'

export const SUBMIT_REGISTRATION = 'SUBMIT_REGISTRATION'

const submitRegistrationAsync = registrationResponse => {
  return {
    type: SUBMIT_REGISTRATION,
    payload: registrationResponse,
  }
}

export const submitRegistration = (registrationData: Object) => {
  return async (dispatch: Function) => {
    let response = null
    try {
      response = await postRegistration(registrationData)
      if (response.error) {
        return Promise.reject(response)
      }
      if (response.status === 'success') {
        dispatch(submitRegistrationAsync(true))
        dispatch(submitLogin(registrationData))
      }
      return response
    } catch (error) {
      dispatch(submitRegistrationAsync(error))
    }
  }
}
