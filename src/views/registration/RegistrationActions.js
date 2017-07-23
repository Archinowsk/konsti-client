import { postRegistration } from '../../app/api';
import { submitLogin } from '../login/LoginActions';

export const SUBMIT_REGISTRATION = 'SUBMIT_REGISTRATION';

const submitRegistrationAsync = registrationResponse => {
  return {
    type: SUBMIT_REGISTRATION,
    payload: registrationResponse,
  };
};

export const submitRegistration = registrationData => dispatch =>
  postRegistration(registrationData)
    .then(response => {
      console.log('sent registration data');
      console.log(registrationData);
      console.log('submitRegistration() response');
      console.log(response);
      if (response.error) {
        return Promise.reject(response);
      }
      if (response.status === 'success') {
        dispatch(submitRegistrationAsync(true));
        dispatch(submitLogin(registrationData));
      }
      return undefined;
    })
    .catch(error => {
      dispatch(submitRegistrationAsync(error));
    });
