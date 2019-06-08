/* @flow */
import { SUBMIT_GET_RESULTS } from 'views/results/resultsActions'
import type { Result } from 'flow/result.flow'

type State = {
  results: Array<Result>,
}

const initialState = { results: [] }

const resultsReducer = (state: State = initialState, action: Function) => {
  switch (action.type) {
    case SUBMIT_GET_RESULTS:
      return { ...state, results: action.results }
    default:
      return state
  }
}

export default resultsReducer
