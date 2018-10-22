/* @flow */
import React from 'react'
import { connect } from 'react-redux'
import { withNamespaces } from 'react-i18next'
import { getData } from 'utils/store'
import Loading from 'components/Loading'

type Props = {
  t: Function,
}

type State = {
  loading: boolean,
}

class MyGamesView extends React.Component<Props, State> {
  state = {
    loading: true,
  }

  componentDidMount = async () => {
    await getData()
    this.setState({ loading: false })
  }

  render() {
    const { t } = this.props
    const { loading } = this.state

    return (
      <div className="settings-view">
        {loading && <Loading />}
        {!loading && <p>{t('settings')}</p>}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {}
}

export default withNamespaces()(
  connect(
    mapStateToProps,
    null
  )(MyGamesView)
)
