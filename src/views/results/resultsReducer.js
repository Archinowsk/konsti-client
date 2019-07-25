/* @flow */
import { SUBMIT_GET_RESULTS } from 'views/results/resultsActions'
import type { ResultsState } from 'flow/redux.flow'

const initialState = { startTime: '', result: [] }

export const resultsReducer = (
  state: ResultsState = initialState,
  action: Function
) => {
  switch (action.type) {
    case SUBMIT_GET_RESULTS:
      return { ...state, result: action.result, startTime: action.startTime }
    default:
      return state
  }
}
