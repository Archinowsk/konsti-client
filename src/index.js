/* @flow */
import '@babel/polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

// Styles
import 'styles/style.scss'

// Root component
import App from 'App'

// Initialized i18next instance
import 'utils/i18n'

// Redux store
import store from 'utils/store'

const rootElement = document.getElementById('main')

const render = () => {
  if (!rootElement) return

  ReactDOM.render(
    // <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>,
    // </React.StrictMode>,
    rootElement
  )
}

window.onload = () => {
  render()
}
