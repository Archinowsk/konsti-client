import { postPlayerAssignment } from 'services/assignmentServices';
import { getResults } from 'services/resultsServices';
import { ResultsState } from 'typings/redux.typings';

export const SUBMIT_GET_RESULTS = 'SUBMIT_GET_RESULTS';

export const submitGetResults = (startTime: string): any => {
  return async (dispatch: Function): Promise<unknown> => {
    let getResultsResponse;
    try {
      getResultsResponse = await getResults(startTime);
    } catch (error) {
      console.log(`getResults error:`, error);
    }

    if (getResultsResponse?.error) {
      return Promise.reject(getResultsResponse);
    }
    if (getResultsResponse && getResultsResponse.status === 'success') {
      dispatch(
        submitGetResultsAsync({
          result: getResultsResponse.results,
          startTime: getResultsResponse.startTime,
        })
      );
    }

    return getResultsResponse;
  };
};

export const submitPlayersAssign = (signupTime: string): any => {
  return async (dispatch: Function): Promise<unknown> => {
    let assignResponse;
    try {
      assignResponse = await postPlayerAssignment(signupTime);
    } catch (error) {
      console.log(`postPlayersAssign error:`, error);
    }

    if (assignResponse?.error) {
      return Promise.reject(assignResponse);
    }
    if (assignResponse && assignResponse.status === 'success') {
      dispatch(
        submitGetResultsAsync({
          result: assignResponse.results,
          startTime: assignResponse.startTime,
        })
      );
    }

    return assignResponse;
  };
};

const submitGetResultsAsync = (results: ResultsState): any => {
  return {
    type: SUBMIT_GET_RESULTS,
    result: results.result,
    startTime: results.startTime,
  };
};
