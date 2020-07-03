import { postHidden } from 'services/hiddenServices';
import { getSettings, postToggleAppOpen } from 'services/settingsServices';
import { postSignupTime } from 'services/signuptimeServices';
import { Game } from 'typings/game.typings';
import { Settings } from 'typings/settings.typings';
import { GetSettings } from 'typings/redux.typings';
import { AppThunk } from 'typings/utils.typings';

export const SUBMIT_UPDATE_HIDDEN = 'SUBMIT_UPDATE_HIDDEN';
export const SUBMIT_GET_SETTINGS = 'SUBMIT_GET_SETTINGS';
export const SUBMIT_SELECT_SIGNUP_TIME = 'SUBMIT_SELECT_SIGNUP_TIME';
export const SUBMIT_SET_TEST_TIME = 'SUBMIT_SET_TEST_TIME';
export const SUBMIT_TOGGLE_APP_OPEN = 'SUBMIT_TOGGLE_APP_OPEN';
export const SUBMIT_RESPONSE_MESSAGE = 'SUBMIT_RESPONSE_MESSAGE';

export const submitUpdateHidden = (hiddenGames: readonly Game[]): AppThunk => {
  return async (dispatch): Promise<void> => {
    const updateHiddenResponse = await postHidden(hiddenGames);

    if (updateHiddenResponse?.status === 'error') {
      return await Promise.reject(updateHiddenResponse);
    }

    if (updateHiddenResponse?.status === 'success') {
      dispatch(submitUpdateHiddenAsync(updateHiddenResponse.hiddenGames));
    }
  };
};

const submitUpdateHiddenAsync = (hiddenGames: readonly Game[]): any => {
  return {
    type: SUBMIT_UPDATE_HIDDEN,
    hiddenGames,
  };
};

export const submitGetSettings = (): AppThunk => {
  return async (dispatch): Promise<void> => {
    const settingsResponse = await getSettings();

    if (settingsResponse?.status === 'error') {
      return await Promise.reject(settingsResponse);
    }

    if (settingsResponse?.status === 'success') {
      dispatch(
        submitGetSettingsAsync({
          hiddenGames: settingsResponse.hiddenGames,
          signupTime: settingsResponse.signupTime,
          appOpen: settingsResponse.appOpen,
        })
      );
    }
  };
};

const submitGetSettingsAsync = ({
  hiddenGames,
  signupTime,
  appOpen,
}: Settings): GetSettings => {
  return {
    type: SUBMIT_GET_SETTINGS,
    hiddenGames,
    signupTime,
    appOpen,
  };
};

export const submitSignupTime = (signupTime: string): AppThunk => {
  return async (dispatch): Promise<void> => {
    const signupTimeResponse = await postSignupTime(signupTime);

    if (signupTimeResponse?.status === 'error') {
      return await Promise.reject(signupTimeResponse);
    }

    if (signupTimeResponse?.status === 'success') {
      dispatch(submitSignupTimeAsync(signupTimeResponse.signupTime));
    }
  };
};

const submitSignupTimeAsync = (signupTime: string): any => {
  return {
    type: SUBMIT_SELECT_SIGNUP_TIME,
    signupTime,
  };
};

export const submitSetTestTime = (testTime: string): any => {
  return {
    type: SUBMIT_SET_TEST_TIME,
    testTime,
  };
};

export const submitToggleAppOpen = (appOpen: boolean): AppThunk => {
  return async (dispatch): Promise<void> => {
    const appOpenResponse = await postToggleAppOpen(appOpen);

    if (appOpenResponse?.status === 'error') {
      return await Promise.reject(appOpenResponse);
    }

    if (appOpenResponse?.status === 'success') {
      dispatch(submitToggleAppOpenAsync(appOpenResponse.appOpen));
    }
  };
};

const submitToggleAppOpenAsync = (appOpen: boolean): any => {
  return {
    type: SUBMIT_TOGGLE_APP_OPEN,
    appOpen,
  };
};

export const submitResponseMessageAsync = (responseMessage: string): any => {
  return {
    type: SUBMIT_RESPONSE_MESSAGE,
    responseMessage,
  };
};
