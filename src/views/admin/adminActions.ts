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
    let updateHiddenResponse;
    try {
      updateHiddenResponse = await postHidden(hiddenGames);
    } catch (error) {
      console.log(`submitUpdateHidden error:`, error);
    }

    if (updateHiddenResponse?.error) {
      return await Promise.reject(updateHiddenResponse);
    }
    if (updateHiddenResponse && updateHiddenResponse.status === 'success') {
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
    let settingsResponse;
    try {
      settingsResponse = await getSettings();
    } catch (error) {
      console.log(`getSettings error:`, error);
    }

    if (settingsResponse?.error) {
      return await Promise.reject(settingsResponse);
    }

    if (settingsResponse && settingsResponse.status === 'success') {
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
    let signupTimeResponse;
    try {
      signupTimeResponse = await postSignupTime(signupTime);
    } catch (error) {
      console.log(`postSignupTime error:`, error);
    }

    if (signupTimeResponse?.error) {
      return await Promise.reject(signupTimeResponse);
    }
    if (signupTimeResponse && signupTimeResponse.status === 'success') {
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
    let appOpenResponse;
    try {
      appOpenResponse = await postToggleAppOpen(appOpen);
    } catch (error) {
      console.log(`postAppOpen error:`, error);
    }

    if (appOpenResponse?.error) {
      return await Promise.reject(appOpenResponse);
    }
    if (appOpenResponse && appOpenResponse.status === 'success') {
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
