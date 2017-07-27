import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

// Reducers
import { reducer as formReducer } from 'redux-form';
import allGamesReducer from '../views/all-games/AllGamesReducer';
import loginReducer from '../views/login/LoginReducer';
import myGamesReducer from '../views/my-games/MyGamesReducer';
import settingsReducer from '../views/settings/SettingsReducer';
import signupReducer from '../views/signup/SignupReducer';
import adminReducer from '../views/admin/AdminReducer';
import allSignupsReducer from '../views/all-signups/AllSignupsReducer';

// Set reducers
const reducer = combineReducers({
  form: formReducer,
  allGames: allGamesReducer,
  login: loginReducer,
  myGames: myGamesReducer,
  settings: settingsReducer,
  signup: signupReducer,
  admin: adminReducer,
  allSignups: allSignupsReducer,
});

// Set initial state
const initialState = {};

const isProduction = process.env.NODE_ENV === 'production';
let enhancer;

const middlewares = applyMiddleware(thunk);

if (isProduction) {
  enhancer = compose(middlewares);
} else {
  enhancer = compose(
    middlewares,
    window.devToolsExtension ? window.devToolsExtension() : f => f
  );
}

// Create a Redux store object that holds the app state
const store = createStore(reducer, initialState, enhancer);

export default store;
