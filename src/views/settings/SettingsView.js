/* @flow */
import React from 'react'
import { connect } from 'react-redux'
import { withTranslation } from 'react-i18next'
import { getData } from 'utils/store'
import Loading from 'components/Loading'

type Props = {
  t: Function,
}

type State = {
  loading: boolean,
}

const MyGamesView = (props: Props, state: State) => {
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    const fetchData = async () => {
      await getData()
    }
    fetchData()
    setLoading(false)
  }, [])

  const { t } = props

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

export default withTranslation()(
  connect(
    mapStateToProps,
    null
  )(MyGamesView)
)
