// @flow
import { clearSession } from 'utils/localStorage';

export const SUBMIT_LOGOUT = 'SUBMIT_LOGOUT';

export const submitLogout = (): Object => {
  clearSession();
  return {
    type: SUBMIT_LOGOUT,
  };
};
