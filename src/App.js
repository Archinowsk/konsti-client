/* @flow */
import React, { Fragment } from 'react'
import { hot } from 'react-hot-loader/root'
import { useTranslation } from 'react-i18next'
import { useSelector, useStore } from 'react-redux'
import { Routes } from 'Routes'
import { Header } from 'components/Header'
import { loadPublicData, loadLoggedInData } from 'utils/loadData'
import { Loading } from 'components/Loading'
import { getIconLibrary } from 'utils/icons'
import type { StatelessFunctionalComponent, Element } from 'react'

type Props = {}

const App: StatelessFunctionalComponent<Props> = (
  props: Props
): Element<typeof Fragment> => {
  const appOpen: boolean = useSelector(state => state.admin.appOpen)
  const loggedIn: boolean = useSelector(state => state.login.loggedIn)
  const { t } = useTranslation()
  const store = useStore()

  const [loading, setLoading] = React.useState(true)
  ;(loading: boolean)

  React.useEffect(() => {
    setLoading(true)
    const fetchPublicData = async (): Promise<any> => {
      await loadPublicData(store)
      if (loggedIn) await loadLoggedInData(store)
      setLoading(false)
    }
    fetchPublicData()
  }, [store, loggedIn])

  getIconLibrary()

  return (
    <Fragment>
      <Header />

      {loading && <Loading />}

      {!loading && !appOpen && (
        <Fragment>
          <h2>{t('closingMessage')}</h2>
          <Routes onlyAdmin />
        </Fragment>
      )}

      {!loading && appOpen && (
        <Fragment>
          <Routes onlyAdmin={false} />
        </Fragment>
      )}
    </Fragment>
  )
}

export default hot(App)
