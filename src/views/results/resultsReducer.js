/* @flow */
import { SUBMIT_GET_RESULTS } from 'views/results/resultsActions'
import type { ResultsState } from 'flow/redux.flow'

const initialState = { results: [] }

export const resultsReducer = (
  state: ResultsState = initialState,
  action: Function
) => {
  switch (action.type) {
    case SUBMIT_GET_RESULTS:
      return { ...state, results: action.results }
    default:
      return state
  }
}
