import { postGamesUpdate, postPlayersAssign } from '../../app/api';

export const SUBMIT_GAMES_UPDATE = 'SUBMIT_GAMES_UPDATE';
export const SUBMIT_PLAYERS_ASSIGN = 'SUBMIT_PLAYERS_ASSIGN';

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
      return undefined;
    })
    .catch(error => {
      dispatch(submitPlayersAssignAsync(error));
    });
