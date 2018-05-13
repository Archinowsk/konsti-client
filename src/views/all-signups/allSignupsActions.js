import { getResults } from '../../utils/api'

export const SUBMIT_GET_RESULTS = 'SUBMIT_GET_RESULTS'

const submitGetResultsAsync = results => {
  return {
    type: SUBMIT_GET_RESULTS,
    results,
  }
}

export const submitGetResults = () => {
  return dispatch => {
    return getResults()
      .then(response => {
        console.log('submitGetResults() response')
        console.log(response)
        if (response.error) {
          return Promise.reject(response)
        }
        if (response.status === 'success') {
          dispatch(submitGetResultsAsync(response.results))
        }
        return response
      })
      .catch(error => {
        console.log(error)
        // dispatch(submitGetGamesAsync(error));
      })
  }
}
