/* @flow */
import '@babel/polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

// Styles
import 'styles/style.css'

// Root component
import App from 'App'

// Initialized i18next instance
import 'utils/i18n'

// Redux store
import store from 'utils/store'

if (process.env.NODE_ENV === 'development') {
  const whyDidYouRender = require('@welldone-software/why-did-you-render')
  whyDidYouRender(React /*, { include: [/(.*?)/] } */)
}

const rootElement = document.getElementById('main')

// Suspend fallback element
const loader = <div>Loading...</div>

const render = () => {
  if (!rootElement) return

  ReactDOM.render(
    // <React.StrictMode>
    <Provider store={store}>
      <React.Suspense fallback={loader}>
        <App />
      </React.Suspense>
    </Provider>,
    // </React.StrictMode>,
    rootElement
  )
}

window.onload = () => {
  render()
}
