// import '@babel/polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { I18nextProvider } from 'react-i18next'
import { AppContainer } from 'react-hot-loader'

// Styles
import './styles/style.scss'

// Root component
import Layout from './app/Layout'

// Initialized i18next instance
import i18n from './app/i18n'

// Redux store
import store from './app/store'

const rootElement = document.getElementById('main')

const render = () => {
  ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        <I18nextProvider i18n={i18n}>
          <Layout />
        </I18nextProvider>
      </Provider>
    </AppContainer>,
    rootElement
  )

  if (module.hot) {
    module.hot.accept('./app/Layout', () => {
      ReactDOM.render(
        <AppContainer>
          <Provider store={store}>
            <I18nextProvider i18n={i18n}>
              <Layout />
            </I18nextProvider>
          </Provider>
        </AppContainer>,
        rootElement
      )
    })
  }
}

window.onload = () => {
  render()
}
