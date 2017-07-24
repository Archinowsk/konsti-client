import { SUBMIT_LOGIN, SUBMIT_LOGOUT } from './LoginActions';

const initialState = { username: '', loggedIn: false, jwtToken: '' };

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case SUBMIT_LOGIN:
      return {
        ...state,
        username: action.username,
        loggedIn: action.loggedIn,
        jwtToken: action.jwtToken,
      };
    case SUBMIT_LOGOUT:
      return {
        ...state,
        username: action.username,
        loggedIn: action.loggedIn,
        jwtToken: '',
      };
    default:
      return state;
  }
};

export default loginReducer;
