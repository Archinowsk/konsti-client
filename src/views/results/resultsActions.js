/* @flow */
import { getResults } from 'services/resultsServices'
import type { Results } from 'flow/result.flow'

export const SUBMIT_GET_RESULTS = 'SUBMIT_GET_RESULTS'

export const submitGetResults = (startTime: string) => {
  return async (dispatch: Function) => {
    let response = null
    try {
      response = await getResults(startTime)
    } catch (error) {
      console.log(`getResults error:`, error)
    }

    if (response && response.error) {
      return Promise.reject(response)
    }
    if (response && response.status === 'success') {
      dispatch(submitGetResultsAsync(response.results))
    }

    return response
  }
}

const submitGetResultsAsync = (results: Results) => {
  return {
    type: SUBMIT_GET_RESULTS,
    results,
  }
}
