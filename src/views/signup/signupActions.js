// @flow
import { postSignup } from 'services/signupServices';
import type { Signup, SignupData } from 'flow/user.flow';

export const SUBMIT_SIGNUP_TIME = 'SUBMIT_SELECT_SIGNUPTIME';
export const SUBMIT_SELECTED_GAMES = 'SUBMIT_SELECTED_GAMES';
export const SUBMIT_SIGNED_GAMES = 'SUBMIT_SIGNED_GAMES';
export const UPDATE_UNSAVED_CHANGES_STATUS = 'UPDATE_UNSAVED_CHANGES_STATUS';

export const submitSignup = (signupData: SignupData): Object => {
  return async (dispatch: Function): Promise<any> => {
    let signupResponse = null;
    try {
      signupResponse = await postSignup(signupData);
    } catch (error) {
      console.log(`postSignup error:`, error);
    }

    if (signupResponse && signupResponse.status === 'success') {
      dispatch(submitSignupAsync(signupResponse.signedGames));
    }

    return signupResponse;
  };
};

const submitSignupAsync = (signedGames: $ReadOnlyArray<Signup>): Object => {
  return {
    type: SUBMIT_SIGNED_GAMES,
    signedGames,
  };
};

export const submitSignupTime = (signupTime: string): Object => {
  return {
    type: SUBMIT_SIGNUP_TIME,
    signupTime,
  };
};

export const submitSelectedGames = (
  selectedGames: $ReadOnlyArray<Signup>
): Object => {
  return {
    type: SUBMIT_SELECTED_GAMES,
    selectedGames,
  };
};

export const updateUnsavedChangesStatus = (status: boolean): Object => {
  return {
    type: UPDATE_UNSAVED_CHANGES_STATUS,
    unsavedChanges: status,
  };
};
