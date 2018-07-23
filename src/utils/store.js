/* @flow */
import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'

// Reducers
import { reducer as formReducer } from 'redux-form'
import allGamesReducer from 'views/all-games/allGamesReducer'
import loginReducer from 'views/login/loginReducer'
import myGamesReducer from 'views/my-games/myGamesReducer'
import settingsReducer from 'views/settings/settingsReducer'
import signupReducer from 'views/signup/signupReducer'
import adminReducer from 'views/admin/adminReducer'
import allSignupsReducer from 'views/all-signups/allSignupsReducer'

import { SUBMIT_LOGOUT } from 'views/login/loginActions'

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

const isProduction = process.env.NODE_ENV === 'production'
let enhancer

const middlewares = applyMiddleware(thunk)

if (isProduction) {
  enhancer = compose(middlewares)
} else {
  enhancer = compose(
    middlewares,
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
}

// Create a Redux store object that holds the app state
const store = createStore(rootReducer, initialState, enhancer)

export default store
