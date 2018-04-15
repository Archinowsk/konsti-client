import { SUBMIT_REGISTRATION } from './RegistrationActions'

const initialState = {}

const registrationReducer = (state = initialState, action) => {
  switch (action.type) {
    case SUBMIT_REGISTRATION:
      return { ...state, registrationResponse: action.payload }
    default:
      return state
  }
}

export default registrationReducer
