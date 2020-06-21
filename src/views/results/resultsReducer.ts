import { SUBMIT_GET_RESULTS } from 'views/results/resultsActions';
import { ResultsState } from 'typings/redux.typings';

const initialState = { startTime: '', result: [] };

export const resultsReducer = (
  state: ResultsState = initialState,
  action: any
): ResultsState => {
  switch (action.type) {
    case SUBMIT_GET_RESULTS:
      return { ...state, result: action.result, startTime: action.startTime };
    default:
      return state;
  }
};
