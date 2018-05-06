import { SUBMIT_REGISTRATION } from './registrationActions'

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
