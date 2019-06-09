/* @flow */
import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { submitLogout } from 'views/logout/logoutActions'
import type { StatelessFunctionalComponent } from 'react'

type Props = {
  submitLogout: Function,
}

const LogoutPage: StatelessFunctionalComponent<Props> = (props: Props) => {
  const { submitLogout } = props

  React.useEffect(() => {
    submitLogout()
  })

  return <Redirect to='/' />
}

export default connect(
  null,
  { submitLogout }
)(LogoutPage)
