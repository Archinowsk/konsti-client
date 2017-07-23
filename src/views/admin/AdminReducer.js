import { SUBMIT_GAMES_UPDATE, SUBMIT_PLAYERS_ASSIGN } from './AdminActions';

const initialState = {
  updateResponse: { data: { errors: '' } },
  assignResponse: { data: { errors: '' } },
};

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case SUBMIT_GAMES_UPDATE:
      return { ...state, updateResponse: action.payload };
    case SUBMIT_PLAYERS_ASSIGN:
      return { ...state, assignResponse: action.payload };
    default:
      return state;
  }
};

export default loginReducer;
