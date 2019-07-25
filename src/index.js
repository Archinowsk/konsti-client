/* @flow */
import 'core-js/stable'
import 'regenerator-runtime/runtime'
import React, { Suspense, lazy } from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import moment from 'moment'
import loaderImage from '../assets/loading.gif'
import { config } from 'config'
import { getLanguage } from 'utils/localStorage'

// Styles
import 'styles/index.css'

// Initialized i18next instance
import 'utils/i18n'

// Redux store
import { store } from 'utils/store'

moment.locale(getLanguage())

// Root component
const App = lazy(() => import('App'))

const { enableAxe, enableWhyDidYouRender } = config

if (enableWhyDidYouRender && process.env.NODE_ENV === 'development') {
  const whyDidYouRender = require('@welldone-software/why-did-you-render')
  whyDidYouRender(React, { include: [/(.*?)/] })
}

if (enableAxe && process.env.NODE_ENV === 'development') {
  const axe = require('react-axe')
  axe(React, ReactDOM, 1000)
}

const rootElement = document.getElementById('main')

// Suspend fallback element
const loader = (
  <div className='loading'>
    <img alt='Loading...' src={loaderImage} />
  </div>
)

const render = () => {
  if (!rootElement) return

  ReactDOM.render(
    // <React.StrictMode>
    <Provider store={store}>
      <Suspense fallback={loader}>
        <App />
      </Suspense>
    </Provider>,
    // </React.StrictMode>,
    rootElement
  )
}

window.onload = () => {
  render()
}
