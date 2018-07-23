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

// Hook up events with actions and Redux's dispatch method
const mapDispatchToProps = (dispatch: Function) => {
  return {
    onSubmitLogout: () => dispatch(submitLogout()),
  }
}

// Use connect method to hook up component with app state
export default connect(
  null,
  mapDispatchToProps
)(LogoutPage)
