import { postHidden } from 'services/hiddenServices';
import { getSettings, postToggleAppOpen } from 'services/settingsServices';
import { postSignupTime } from 'services/signuptimeServices';
import { Game } from 'typings/game.typings';
import { Settings } from 'typings/settings.typings';
import { GetSettings } from 'typings/redux.typings';

export const SUBMIT_UPDATE_HIDDEN = 'SUBMIT_UPDATE_HIDDEN';
export const SUBMIT_GET_SETTINGS = 'SUBMIT_GET_SETTINGS';
export const SUBMIT_SELECT_SIGNUP_TIME = 'SUBMIT_SELECT_SIGNUP_TIME';
export const SUBMIT_SET_TEST_TIME = 'SUBMIT_SET_TEST_TIME';
export const SUBMIT_TOGGLE_APP_OPEN = 'SUBMIT_TOGGLE_APP_OPEN';

export const submitUpdateHidden = (hiddenGames: readonly Game[]): any => {
  return async (dispatch: Function): Promise<unknown> => {
    const updateHiddenResponse = await postHidden(hiddenGames);

    if (updateHiddenResponse?.status === 'error') {
      return await Promise.reject(updateHiddenResponse);
    }

    if (updateHiddenResponse?.status === 'success') {
      dispatch(submitUpdateHiddenAsync(updateHiddenResponse.hiddenGames));
    }

    return updateHiddenResponse;
  };
};

const submitUpdateHiddenAsync = (hiddenGames: readonly Game[]): any => {
  return {
    type: SUBMIT_UPDATE_HIDDEN,
    hiddenGames,
  };
};

export const submitGetSettings = (): any => {
  return async (dispatch: Function): Promise<unknown> => {
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

    return settingsResponse;
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

export const submitSignupTime = (signupTime: string): any => {
  return async (dispatch: Function): Promise<unknown> => {
    const signupTimeResponse = await postSignupTime(signupTime);

    if (signupTimeResponse?.status === 'error') {
      return await Promise.reject(signupTimeResponse);
    }

    if (signupTimeResponse?.status === 'success') {
      dispatch(submitSignupTimeAsync(signupTimeResponse.signupTime));
    }

    return signupTimeResponse;
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

export const submitToggleAppOpen = (appOpen: boolean): any => {
  return async (dispatch: Function): Promise<unknown> => {
    const appOpenResponse = await postToggleAppOpen(appOpen);

    if (appOpenResponse?.status === 'error') {
      return await Promise.reject(appOpenResponse);
    }

    if (appOpenResponse?.status === 'success') {
      dispatch(submitToggleAppOpenAsync(appOpenResponse.appOpen));
    }

    return appOpenResponse;
  };
};

const submitToggleAppOpenAsync = (appOpen: boolean): any => {
  return {
    type: SUBMIT_TOGGLE_APP_OPEN,
    appOpen,
  };
};
