/* @flow */
import React from 'react'
import { connect } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { getStore } from 'utils/store'
import loadData from 'utils/loadData'
import Loading from 'components/Loading'

type Props = {}

type State = {
  loading: boolean,
}

const MyGamesView = (props: Props, state: State) => {
  const [loading, setLoading] = React.useState(true)
  const { t } = useTranslation()

  React.useEffect(() => {
    const fetchData = async () => {
      await loadData(getStore())
    }
    fetchData()
    setLoading(false)
  }, [])

  return (
    <div className='settings-view'>
      {loading && <Loading />}
      {!loading && <p>{t('settings')}</p>}
    </div>
  )
}

const mapStateToProps = state => {
  return {}
}

export default connect(
  mapStateToProps,
  null
)(MyGamesView)
