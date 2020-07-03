import { postSignup } from 'services/signupServices';
import { Signup, SignupData } from 'typings/user.typings';

export const SUBMIT_SIGNUP_TIME = 'SUBMIT_SELECT_SIGNUPTIME';
export const SUBMIT_SELECTED_GAMES = 'SUBMIT_SELECTED_GAMES';
export const SUBMIT_SIGNED_GAMES = 'SUBMIT_SIGNED_GAMES';
export const UPDATE_UNSAVED_CHANGES_STATUS = 'UPDATE_UNSAVED_CHANGES_STATUS';

export const submitSignup = (signupData: SignupData): any => {
  return async (dispatch: Function): Promise<unknown> => {
    const signupResponse = await postSignup(signupData);

    if (signupResponse?.status === 'error') {
      return await Promise.reject(signupResponse);
    }

    if (signupResponse?.status === 'success') {
      dispatch(submitSignupAsync(signupResponse.signedGames));
    }

    return signupResponse;
  };
};

const submitSignupAsync = (signedGames: readonly Signup[]): any => {
  return {
    type: SUBMIT_SIGNED_GAMES,
    signedGames,
  };
};

export const submitSignupTime = (signupTime: string): any => {
  return {
    type: SUBMIT_SIGNUP_TIME,
    signupTime,
  };
};

export const submitSelectedGames = (selectedGames: readonly Signup[]): any => {
  return {
    type: SUBMIT_SELECTED_GAMES,
    selectedGames,
  };
};

export const updateUnsavedChangesStatus = (status: boolean): any => {
  return {
    type: UPDATE_UNSAVED_CHANGES_STATUS,
    unsavedChanges: status,
  };
};
