import {
  postGamesUpdate,
  postPlayersAssign,
  postBlacklist,
  getSettings,
} from '../../app/api';

export const SUBMIT_GAMES_UPDATE = 'SUBMIT_GAMES_UPDATE';
export const SUBMIT_PLAYERS_ASSIGN = 'SUBMIT_PLAYERS_ASSIGN';
export const SUBMIT_UPDATE_BLACKLIST = 'SUBMIT_UPDATE_BLACKLIST';
export const SUBMIT_GET_SETTINGS = 'SUBMIT_GET_SETTINGS';

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

export const submitPlayersAssign = () => dispatch =>
  postPlayersAssign()
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

const submitGetUserAsync = blacklistedGames => {
  return {
    type: SUBMIT_GET_SETTINGS,
    blacklistedGames,
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
        dispatch(submitGetUserAsync(response.games.blacklistedGames));
      }
      return response;
    })
    .catch(error => {
      console.log(error);
    });
