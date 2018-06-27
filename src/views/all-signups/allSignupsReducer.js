/* @flow */
import { SUBMIT_GET_RESULTS } from '~/views/all-signups/allSignupsActions'

const initialState = { results: [] }

const allSignupsReducer = (state: Object = initialState, action: Function) => {
  switch (action.type) {
    case SUBMIT_GET_RESULTS:
      return { ...state, results: action.results }
    default:
      return state
  }
}

export default allSignupsReducer
