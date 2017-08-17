import {
  SUBMIT_GET_USER_GAMES,
  SUBMIT_UPDATE_FAVORITES,
  // SUBMIT_DEL_FAVORITE,
} from './MyGamesActions';

const initialState = {
  enteredGames: [],
  favoritedGames: [],
  signedGames: [],
};

const myGamesReducer = (state = initialState, action) => {
  switch (action.type) {
    case SUBMIT_GET_USER_GAMES:
      return {
        ...state,
        enteredGames: action.enteredGames,
        favoritedGames: action.favoritedGames,
        signedGames: action.signedGames,
      };
    case SUBMIT_UPDATE_FAVORITES:
      return {
        ...state,
        favoritedGames: action.favoritedGames,
        // selectedFavorites: [...state.selectedFavorites, action.favoriteData],
      };
    /*
    case SUBMIT_DEL_FAVORITE:
      return {
        ...state,
        selectedFavorites: [
          ...state.selectedFavorites.slice(0, action.gameIndex),
          ...state.selectedFavorites.slice(action.gameIndex + 1),
        ],
      };
    */
    default:
      return state;
  }
};

export default myGamesReducer;
