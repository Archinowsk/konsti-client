import {
  postGamesUpdate,
  postPlayersAssign,
  postBlacklist,
  getSettings,
  postSignupTime,
} from '../../app/api';

export const SUBMIT_GAMES_UPDATE = 'SUBMIT_GAMES_UPDATE';
export const SUBMIT_PLAYERS_ASSIGN = 'SUBMIT_PLAYERS_ASSIGN';
export const SUBMIT_UPDATE_BLACKLIST = 'SUBMIT_UPDATE_BLACKLIST';
export const SUBMIT_GET_SETTINGS = 'SUBMIT_GET_SETTINGS';
export const SUBMIT_SELECT_SIGNUP_TIME = 'SUBMIT_SELECT_SIGNUP_TIME';

const submitGamesUpdateAsync = updateResponse => {
  return {
    type: SUBMIT_GAMES_UPDATE,
    payload: updateResponse,
  };
};

export const submitGamesUpdate = loginInfo => dispatch =>
  postGamesUpdate(loginInfo)
    .then(response => {
      console.log('submitGamesUpdate() response');
      console.log(response);
      if (response.error) {
        return Promise.reject(response);
      }
      if (response.status === 'success') {
        dispatch(submitGamesUpdateAsync(response));
      }
      return response;
    })
    .catch(error => {
      console.log(error);
      // dispatch(submitGamesUpdateAsync(error));
    });

const submitPlayersAssignAsync = assignResponse => {
  return {
    type: SUBMIT_PLAYERS_ASSIGN,
    payload: assignResponse,
  };
};

export const submitPlayersAssign = signupTime => dispatch =>
  postPlayersAssign(signupTime)
    .then(response => {
      console.log('submitPlayersAssign() response');
      console.log(response);
      if (response.error) {
        return Promise.reject(response);
      }
      if (response.status === 'success') {
        dispatch(submitPlayersAssignAsync(response));
      }
      return response;
    })
    .catch(error => {
      dispatch(submitPlayersAssignAsync(error));
    });

const submitUpdateBlacklistAsync = blacklistedGames => {
  return {
    type: SUBMIT_UPDATE_BLACKLIST,
    blacklistedGames,
  };
};

export const submitUpdateBlacklist = blacklistData => dispatch =>
  postBlacklist(blacklistData)
    .then(response => {
      console.log('submitUpdateBlacklist() response');
      console.log(response);
      if (response.error) {
        return Promise.reject(response);
      }
      if (response.status === 'success') {
        dispatch(submitUpdateBlacklistAsync(blacklistData.blacklistedGames));
      }
      return response;
    })
    .catch(error => {
      console.log(error);
    });

const submitGetSettingsAsync = (blacklistedGames, signupTime) => {
  return {
    type: SUBMIT_GET_SETTINGS,
    blacklistedGames,
    signupTime,
  };
};

export const submitGetSettings = () => dispatch =>
  getSettings()
    .then(response => {
      console.log('submitGetSettings() response');
      console.log(response);
      if (response.error) {
        return Promise.reject(response);
      }
      if (response.status === 'success') {
        dispatch(
          submitGetSettingsAsync(
            response.games.blacklistedGames,
            response.signupTime
          )
        );
      }
      return response;
    })
    .catch(error => {
      console.log(error);
    });

const submitSignupTimeAsync = signupTime => {
  return {
    type: SUBMIT_SELECT_SIGNUP_TIME,
    signupTime,
  };
};

export const submitSignupTime = signupTime => dispatch =>
  postSignupTime(signupTime)
    .then(response => {
      console.log('submitSignupTime() response');
      console.log(response);
      if (response.error) {
        return Promise.reject(response);
      }
      if (response.status === 'success') {
        dispatch(submitSignupTimeAsync(signupTime));
      }
      return response;
    })
    .catch(error => {
      console.log(error);
    });
