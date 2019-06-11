/* @flow */
import React from 'react'
import { BrowserRouter, Route, Link, Switch, Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import type { StatelessFunctionalComponent } from 'react'

// Views
import AllGames from 'views/all-games/AllGamesView'
import Login from 'views/login/LoginView'
import MyGames from 'views/my-games/MyGamesView'
import Signup from 'views/signup/SignupView'
import Registration from 'views/registration/RegistrationView'
import Admin from 'views/admin/AdminView'
import Results from 'views/results/ResultsView'
import Logout from 'views/logout/LogoutView'
import Group from 'views/group/GroupView'

const Routes: StatelessFunctionalComponent<{}> = () => {
  const loggedIn: boolean = useSelector(state => state.login.loggedIn)
  const userGroup: string = useSelector(state => state.login.userGroup)
  const { t } = useTranslation()

  if (!loggedIn) {
    return (
      <BrowserRouter>
        <React.Fragment>
          <div className='routes'>
            <Link to='/games' className='router-link'>
              {t('pages.allGames')}
            </Link>
            <Link to='/login' className='router-link'>
              {t('button.login')}
            </Link>
            <Link to='/registration' className='router-link'>
              {t('button.register')}
            </Link>

            <hr />
          </div>

          <Switch>
            <Route exact path='/' component={AllGames} />
            <Route path='/login' component={Login} />
            <Route path='/registration' component={Registration} />
            <Route path='/games' component={AllGames} />
            <Redirect from='/*' to='/login' />
          </Switch>
        </React.Fragment>
      </BrowserRouter>
    )
  }

  return (
    <BrowserRouter>
      <React.Fragment>
        <div className='routes'>
          <Link to='/games' className='router-link'>
            {t('pages.allGames')}
          </Link>
          {userGroup === 'user' && (
            <Link to='/mygames' className='router-link'>
              {t('pages.myGames')}
            </Link>
          )}
          {userGroup === 'user' && (
            <Link to='/signup' className='router-link'>
              {t('pages.signUp')}
            </Link>
          )}
          {(userGroup === 'user' || userGroup === 'admin') && (
            <Link to='/results' className='router-link'>
              {t('pages.results')}
            </Link>
          )}

          {userGroup === 'user' && (
            <Link to='/group' className='router-link'>
              {t('pages.group')}
            </Link>
          )}

          {userGroup === 'admin' && (
            <Link to='/admin' className='router-link'>
              {t('pages.admin')}
            </Link>
          )}
          {(userGroup === 'user' || userGroup === 'admin') && (
            <Link to='/logout' className='router-link'>
              {t('button.logout')}
            </Link>
          )}
          <hr />
        </div>
        <Switch>
          <Route exact path='/' component={AllGames} />
          <Route path='/games' component={AllGames} />
          <Route path='/mygames' component={MyGames} />
          <Route path='/signup' component={Signup} />
          <Route path='/results' component={Results} />
          <Route path='/group' component={Group} />
          <Route path='/admin' component={Admin} />
          <Route path='/logout' component={Logout} />
          <Redirect from='/*' to='/' />
        </Switch>
      </React.Fragment>
    </BrowserRouter>
  )
}

export default Routes
