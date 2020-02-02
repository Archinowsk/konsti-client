import { api } from 'utils/api';
import { Feedback } from 'typings/feedback.typings';

export const postFeedback = async (feedbackData: Feedback): Promise<void> => {
  let response;
  try {
    response = await api.post('/feedback', { feedbackData });
  } catch (error) {
    if (error.message === 'Network Error') {
      console.log('Network error: no connection to server');
    } else {
      console.log(`postFeedback error:`, error);
    }
  }

  if ((response && response.status !== 200) || (response && !response.data)) {
    console.log('Response status !== 200, reject');
    return Promise.reject(response);
  }

  if (response) {
    return response.data;
  }
};
