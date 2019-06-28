/* @flow */
import React from 'react'
import { hot } from 'react-hot-loader/root'
import { useTranslation } from 'react-i18next'
import { useSelector, useStore } from 'react-redux'
import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faAngleUp,
  faAngleDown,
  faEye,
  faEyeSlash,
} from '@fortawesome/free-solid-svg-icons'
import { Routes } from 'Routes'
import { LanguageSelector } from 'components/LanguageSelector'
import { config } from 'config'
import { TimeSelector } from 'test/TimeSelector'
import { loadData } from 'utils/loadData'
import { Loading } from 'components/Loading'
import type { StatelessFunctionalComponent } from 'react'

const App: StatelessFunctionalComponent<{}> = () => {
  const appOpen: boolean = useSelector(state => state.admin.appOpen)
  const username: string = useSelector(state => state.login.username)
  const loggedIn: boolean = useSelector(state => state.login.loggedIn)
  const serial: string = useSelector(state => state.login.serial)

  const { t } = useTranslation()
  const store = useStore()

  const [loading, setLoading] = React.useState(true)
  ;(loading: boolean)

  React.useEffect(() => {
    setLoading(true)
    const fetchData = async () => {
      await loadData(store)
    }
    fetchData()
    setLoading(false)
  }, [])

  library.add(faAngleUp, faAngleDown, faEye, faEyeSlash)

  return (
    <React.Fragment>
      <header>
        {config.loadedSettings !== 'production' && <TimeSelector />}

        <h1>
          <a href='/' className='logo'>
            Konsti
          </a>
        </h1>
        <p>{t('header')}</p>
        <LanguageSelector />

        {loggedIn && (
          <span className='username'>
            {t('user')}: {username} | {t('code')}: {serial}
          </span>
        )}
      </header>

      <div className='body'>
        {loading && <Loading />}
        {!loading && !appOpen && (
          <div>
            <h2>{t('closingMessage')}</h2>
            <Routes onlyAdmin />
          </div>
        )}
        {!loading && appOpen && <Routes onlyAdmin={false} />}
      </div>
    </React.Fragment>
  )
}

export default hot(App)
