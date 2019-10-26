// @flow
import { postPlayerAssignment } from 'services/assignmentServices'
import { getResults } from 'services/resultsServices'
import type { ResultsState } from 'flow/redux.flow'

export const SUBMIT_GET_RESULTS = 'SUBMIT_GET_RESULTS'

export const submitGetResults = (startTime: string): Object => {
  return async (dispatch: Function): Promise<any> => {
    let getResultsResponse = null
    try {
      getResultsResponse = await getResults(startTime)
    } catch (error) {
      console.log(`getResults error:`, error)
    }

    if (getResultsResponse && getResultsResponse.error) {
      return Promise.reject(getResultsResponse)
    }
    if (getResultsResponse && getResultsResponse.status === 'success') {
      dispatch(
        submitGetResultsAsync({
          result: getResultsResponse.results.result,
          startTime: getResultsResponse.results.startTime,
        })
      )
    }

    return getResultsResponse
  }
}

export const submitPlayersAssign = (signupTime: string): Object => {
  return async (dispatch: Function): Promise<any> => {
    let assignResponse = null
    try {
      assignResponse = await postPlayerAssignment(signupTime)
    } catch (error) {
      console.log(`postPlayersAssign error:`, error)
    }

    if (assignResponse && assignResponse.error) {
      return Promise.reject(assignResponse)
    }
    if (assignResponse && assignResponse.status === 'success') {
      dispatch(
        submitGetResultsAsync({
          result: assignResponse.results,
          startTime: assignResponse.startTime,
        })
      )
    }

    return assignResponse
  }
}

const submitGetResultsAsync = (results: ResultsState): Object => {
  return {
    type: SUBMIT_GET_RESULTS,
    result: results.result,
    startTime: results.startTime,
  }
}
