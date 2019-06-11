/* @flow */
import React from 'react'
import { useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { submitLogout } from 'views/logout/logoutActions'
import type { StatelessFunctionalComponent } from 'react'

const LogoutPage: StatelessFunctionalComponent<{}> = () => {
  const dispatch = useDispatch()

  React.useEffect(() => {
    dispatch(submitLogout())
  })

  return <Redirect to='/' />
}

export default LogoutPage
