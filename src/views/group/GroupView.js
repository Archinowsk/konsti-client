/* @flow */
import React from 'react'
import { translate } from 'react-i18next'
import { connect } from 'react-redux'
import { getData } from 'utils/store'
import Loading from 'components/Loading'

type Props = {
  t: Function,
}

type State = {
  loading: boolean,
}

class GroupView extends React.Component<Props, State> {
  state = { loading: true }

  componentDidMount = async () => {
    await getData()
    this.setState({ loading: false })
  }

  render() {
    const { t } = this.props
    const { loading } = this.state

    return (
      <div className="group-view">
        {loading && <Loading />}
        {!loading && <p className="page-title">{t('pages.group')}</p>}
      </div>
    )
  }
}

const mapStateToProps = (state: Object) => {
  return {}
}

const mapDispatchToProps = (dispatch: Function) => {
  return {}
}

export default translate()(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(GroupView)
)
