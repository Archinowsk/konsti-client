/* @flow */
import React from 'react'
import { HashRouter, Route, Link, Switch, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { translate } from 'react-i18next'

// Views
import AllGames from './views/all-games/AllGamesView'
import Login from './views/login/LoginView'
import MyGames from './views/my-games/MyGamesView'
import Signup from './views/signup/SignupView'
// import Settings from './views/settings/SettingsView';
import Registration from './views/registration/RegistrationView'
import Admin from './views/admin/AdminView'
import AllSignups from './views/all-signups/AllSignupsView'

import LogoutButton from './components/LogoutButton'

type Props = {
  loggedIn: boolean,
  t: Function,
  userGroup: string,
}

const Routes = (props: Props) => {
  const { loggedIn, t, userGroup } = props

  if (!loggedIn) {
    return (
      <HashRouter>
        <div>
          <Link to="/games" className="router-link">
            {t('pages.allGames')}
          </Link>
          <Link to="/login" className="router-link">
            {t('button.login')}
          </Link>
          <Link to="/registration" className="router-link">
            {t('button.register')}
          </Link>

          <hr />

          <Switch>
            <Route exact path="/" component={AllGames} />
            <Route path="/login" component={Login} />
            <Route path="/registration" component={Registration} />
            <Route path="/games" component={AllGames} />
            <Redirect from="/*" to="/login" />
          </Switch>
        </div>
      </HashRouter>
    )
  }

  return (
    <HashRouter>
      <div>
        <Link to="/games" className="router-link">
          {t('pages.allGames')}
        </Link>

        {userGroup === 'user' && (
          <Link to="/mygames" className="router-link">
            {t('pages.myGames')}
          </Link>
        )}

        {(userGroup === 'user' || userGroup === 'admin') && (
          <Link to="/signup" className="router-link">
            {t('pages.signUp')}
          </Link>
        )}

        {(userGroup === 'user' || userGroup === 'admin') && (
          <Link to="/allsignups" className="router-link">
            {t('pages.allsignups')}
          </Link>
        )}

        {/*
          <Link to="/settings" className="router-link">
          {t('pages.settings')}
        </Link>
        */}
        {userGroup === 'admin' && (
          <Link to="/admin" className="router-link">
            {t('pages.admin')}
          </Link>
        )}

        <LogoutButton />

        <hr />

        <Switch>
          <Route exact path="/" component={AllGames} />
          <Route path="/games" component={AllGames} />
          <Route path="/mygames" component={MyGames} />
          <Route path="/signup" component={Signup} />
          <Route path="/allsignups" component={AllSignups} />

          {/* <Route path="/settings" component={Settings} /> */}
          <Route path="/admin" component={Admin} />
          <Redirect from="/*" to="/" />
        </Switch>
      </div>
    </HashRouter>
  )
}

const mapStateToProps = state => {
  return {
    loggedIn: state.login.loggedIn,
    userGroup: state.login.userGroup,
  }
}

export default translate()(connect(mapStateToProps)(Routes))
