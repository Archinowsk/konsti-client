/* @flow */
import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { submitLogout } from 'views/login/loginActions'

type Props = {
  onSubmitLogout: Function,
}

class LogoutPage extends React.Component<Props> {
  componentWillMount() {
    const { onSubmitLogout } = this.props
    onSubmitLogout()
  }

  render() {
    return <Redirect to="/" />
  }
}

const mapDispatchToProps = (dispatch: Function) => {
  return {
    onSubmitLogout: () => dispatch(submitLogout()),
  }
}

export default connect(
  null,
  mapDispatchToProps
)(LogoutPage)
