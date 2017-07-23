import { SUBMIT_LOGIN, SUBMIT_LOGOUT } from './LoginActions';

const initialState = { username: '', loggedIn: false };

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case SUBMIT_LOGIN:
      return { ...state, username: action.username, loggedIn: action.loggedIn };
    case SUBMIT_LOGOUT:
      return { ...state, username: action.username, loggedIn: action.loggedIn };
    default:
      return state;
  }
};

export default loginReducer;
