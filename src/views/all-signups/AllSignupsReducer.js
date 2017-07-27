import { SUBMIT_GET_RESULTS } from './AllSignupsActions';

const initialState = { results: [] };

const allSignupsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SUBMIT_GET_RESULTS:
      return { ...state, results: action.results };
    default:
      return state;
  }
};

export default allSignupsReducer;
