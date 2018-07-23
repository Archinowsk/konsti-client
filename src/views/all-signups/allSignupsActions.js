/* @flow */
import { getResults } from 'services/resultsServices'

export const SUBMIT_GET_RESULTS = 'SUBMIT_GET_RESULTS'

const submitGetResultsAsync = results => {
  return {
    type: SUBMIT_GET_RESULTS,
    results,
  }
}

export const submitGetResults = () => {
  return async (dispatch: Function) => {
    let response = null
    try {
      response = await getResults()
      if (response && response.error) {
        return Promise.reject(response)
      }
      if (response && response.status && response.status === 'success') {
        dispatch(submitGetResultsAsync(response.results))
      }
      return response
    } catch (error) {
      console.log(error)
    }
  }
}
