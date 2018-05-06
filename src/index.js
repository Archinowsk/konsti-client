// import '@babel/polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { I18nextProvider } from 'react-i18next'

// Styles
import './styles/style.scss'

// Root component
import App from './app/App'

// Initialized i18next instance
import i18n from './app/i18n'

// Redux store
import store from './app/store'

const rootElement = document.getElementById('main')

const render = () => {
  ReactDOM.render(
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>
        <App />
      </I18nextProvider>
    </Provider>,
    rootElement
  )
}

window.onload = () => {
  render()
}
