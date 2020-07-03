import { postPlayerAssignment } from 'services/assignmentServices';
import { getResults } from 'services/resultsServices';
import { ResultsState } from 'typings/redux.typings';

export const SUBMIT_GET_RESULTS = 'SUBMIT_GET_RESULTS';

export const submitGetResults = (startTime: string): any => {
  return async (dispatch: Function): Promise<unknown> => {
    const getResultsResponse = await getResults(startTime);

    if (getResultsResponse?.status === 'error') {
      return await Promise.reject(getResultsResponse);
    }

    if (getResultsResponse?.status === 'success') {
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
    const assignResponse = await postPlayerAssignment(signupTime);

    if (assignResponse?.status === 'error') {
      return await Promise.reject(assignResponse);
    }

    if (assignResponse?.status === 'success') {
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
