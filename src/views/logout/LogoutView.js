/* @flow */
import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { submitLogout } from 'views/login/loginActions'
import type { StatelessFunctionalComponent } from 'react'

type Props = {
  onSubmitLogout: Function,
}

const LogoutPage: StatelessFunctionalComponent<Props> = (props: Props) => {
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
