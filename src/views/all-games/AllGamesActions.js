import { getGames } from '../../app/api';

export const SUBMIT_GET_GAMES = 'SUBMIT_GET_GAMES';

const submitGetGamesAsync = games => {
  return {
    type: SUBMIT_GET_GAMES,
    games,
  };
};

export const submitGetGames = () => dispatch =>
  getGames()
    .then(response => {
      console.log('submitGetGames() response');
      console.log(response);
      if (response.error) {
        return Promise.reject(response);
      }
      if (response.status === 'success') {
        dispatch(submitGetGamesAsync(response.games));
      }
      return response;
    })
    .catch(error => {
      console.log(error);
      // dispatch(submitGetGamesAsync(error));
    });
