/* @flow */
import React, { Fragment } from 'react'
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
import { Header } from 'components/Header'
import { loadData } from 'utils/loadData'
import { Loading } from 'components/Loading'
import type { StatelessFunctionalComponent, Element } from 'react'

type Props = {}
const App: StatelessFunctionalComponent<Props> = (
  props: Props
): Element<typeof Fragment> => {
  const appOpen: boolean = useSelector(state => state.admin.appOpen)
  const { t } = useTranslation()
  const store = useStore()

  const [loading, setLoading] = React.useState(true)
  ;(loading: boolean)

  React.useEffect(() => {
    setLoading(true)
    const fetchData = async (): Promise<any> => {
      await loadData(store)
    }
    fetchData()
    setLoading(false)
  }, [store])

  library.add(faAngleUp, faAngleDown, faEye, faEyeSlash)

  return (
    <Fragment>
      <Header />
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
    </Fragment>
  )
}

export default hot(App)
