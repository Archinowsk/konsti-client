/* @flow */
import '@babel/polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { I18nextProvider } from 'react-i18next'

// Styles
import 'styles/style.scss'

// Root component
import App from 'App'

// Initialized i18next instance
import i18n from 'utils/i18n'

// Redux store
import store from 'utils/store'

const rootElement = document.getElementById('main')

const render = () => {
  if (!rootElement) return

  ReactDOM.render(
    // $FlowFixMe: React Flow typings are not updated to React 16.3 yet
    // <React.StrictMode>
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>
        <App />
      </I18nextProvider>
    </Provider>,
    // </React.StrictMode>,
    rootElement
  )
}

window.onload = () => {
  render()
}
