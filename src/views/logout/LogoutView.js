/* @flow */
import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { submitLogout } from 'views/login/loginActions'

type Props = {
  onSubmitLogout: Function,
}

const LogoutPage = (props: Props) => {
  const { onSubmitLogout } = props

  React.useEffect(() => {
    onSubmitLogout()
  })

  return <Redirect to='/' />
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
