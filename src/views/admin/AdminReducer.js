import {
  SUBMIT_GAMES_UPDATE,
  SUBMIT_PLAYERS_ASSIGN,
  SUBMIT_UPDATE_BLACKLIST,
  SUBMIT_GET_SETTINGS,
} from './AdminActions';

const initialState = {
  updateResponse: { data: { errors: '' } },
  assignResponse: { data: { errors: '' } },
  blacklistedGames: [],
};

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case SUBMIT_GAMES_UPDATE:
      return { ...state, updateResponse: action.payload };
    case SUBMIT_PLAYERS_ASSIGN:
      return { ...state, assignResponse: action.payload };
    case SUBMIT_UPDATE_BLACKLIST:
      return { ...state, blacklistedGames: action.blacklistedGames };
    case SUBMIT_GET_SETTINGS:
      return { ...state, blacklistedGames: action.blacklistedGames };
    default:
      return state;
  }
};

export default loginReducer;
