/* @flow */
import { api } from 'utils/api'
import { getJWT } from 'utils/getJWT'
import type { Feedback } from 'flow/feedback.flow'

export const postFeedback = async (feedbackData: Feedback): Promise<any> => {
  api.defaults.headers.common.Authorization = `Bearer ${getJWT()}`

  let response = null
  try {
    response = await api.post('/feedback', { feedbackData })
  } catch (error) {
    if (error.message === 'Network Error') {
      console.log('Network error: no connection to server')
    } else {
      console.log(`postFeedback error:`, error)
    }
  }

  if ((response && response.status !== 200) || (response && !response.data)) {
    console.log('Response status !== 200, reject')
    return Promise.reject(response)
  }

  if (response) {
    return response.data
  }
}
