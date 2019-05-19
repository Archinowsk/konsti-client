/* @flow */
import { SUBMIT_GET_RESULTS } from 'views/results/resultsActions'

const initialState = { results: [] }

const resultsReducer = (state: Object = initialState, action: Function) => {
  switch (action.type) {
    case SUBMIT_GET_RESULTS:
      return { ...state, results: action.results }
    default:
      return state
  }
}

export default resultsReducer
