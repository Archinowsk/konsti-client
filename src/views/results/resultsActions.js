/* @flow */
import { postPlayersAssign } from 'services/playersServices'
import { getResults } from 'services/resultsServices'
import type { Results } from 'flow/result.flow'

export const SUBMIT_GET_RESULTS = 'SUBMIT_GET_RESULTS'

export const submitGetResults = (startTime: string) => {
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
      dispatch(submitGetResultsAsync(getResultsResponse.results))
    }

    return getResultsResponse
  }
}

export const submitPlayersAssign = (signupTime: string) => {
  return async (dispatch: Function): Promise<any> => {
    let assignResponse = null
    try {
      assignResponse = await postPlayersAssign(signupTime)
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

const submitGetResultsAsync = (results: Results) => {
  return {
    type: SUBMIT_GET_RESULTS,
    results,
  }
}
