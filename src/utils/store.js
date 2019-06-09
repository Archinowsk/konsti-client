/* @flow */
import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import config from 'config'

// Reducers
import { reducer as formReducer } from 'redux-form'
import allGamesReducer from 'views/all-games/allGamesReducer'
import loginReducer from 'views/login/loginReducer'
import myGamesReducer from 'views/my-games/myGamesReducer'
import signupReducer from 'views/signup/signupReducer'
import adminReducer from 'views/admin/adminReducer'
import resultsReducer from 'views/results/resultsReducer'
// import groupReducer from 'views/group/groupReducer'
import { SUBMIT_LOGOUT } from 'views/logout/logoutActions'

// Set reducers
const reducer = combineReducers({
  form: formReducer,
  allGames: allGamesReducer,
  login: loginReducer,
  myGames: myGamesReducer,
  signup: signupReducer,
  admin: adminReducer,
  results: resultsReducer,
  // group: groupReducer,
})

// Reducer to reset state
const rootReducer = (state, action) => {
  if (action.type === SUBMIT_LOGOUT) {
    state = undefined
  }

  return reducer(state, action)
}

// Set initial state
const initialState = {}
const middlewares = applyMiddleware(thunk)

const composeEnhancers = composeWithDevTools({
  trace: config.reduxTrace,
  traceLimit: 25,
})

const enhancer = composeEnhancers(middlewares)

// Create a Redux store object that holds the app state
/* $FlowFixMe: Redux flow-typed missing generics types */
const store = createStore(rootReducer, initialState, enhancer)

export const getStore = () => {
  return store
}

export default store
