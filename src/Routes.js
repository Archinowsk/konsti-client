/* @flow */
import React from 'react'
import { BrowserRouter, Route, Link, Switch, Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import type { StatelessFunctionalComponent } from 'react'
import { AllGamesView } from 'views/all-games/AllGamesView'
import { LoginView } from 'views/login/LoginView'
import { MyGamesView } from 'views/my-games/MyGamesView'
import { SignupView } from 'views/signup/SignupView'
import { RegistrationView } from 'views/registration/RegistrationView'
import { AdminView } from 'views/admin/AdminView'
import { ResultsView } from 'views/results/ResultsView'
import { LogoutView } from 'views/logout/LogoutView'
import { GroupView } from 'views/group/GroupView'

type Props = {
  onlyAdmin: boolean,
}

export const Routes: StatelessFunctionalComponent<Props> = (props: Props) => {
  const { onlyAdmin } = props
  const loggedIn: boolean = useSelector(state => state.login.loggedIn)
  const userGroup: string = useSelector(state => state.login.userGroup)
  const { t } = useTranslation()

  if (onlyAdmin && !loggedIn) {
    return (
      <BrowserRouter>
        <React.Fragment>
          <div className='routes'>
            <Link to='/login' className='router-link'>
              {t('button.login')}
            </Link>
            <hr />
          </div>
          <Switch>
            <Route path='/login' component={LoginView} />
            <Redirect from='/*' to='/' />
          </Switch>
        </React.Fragment>
      </BrowserRouter>
    )
  }

  if (onlyAdmin && loggedIn) {
    return (
      <BrowserRouter>
        <React.Fragment>
          <div className='routes'>
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
            <Route path='/admin' component={AdminView} />
            <Route path='/logout' component={LogoutView} />
            <Redirect from='/*' to='/' />
          </Switch>
        </React.Fragment>
      </BrowserRouter>
    )
  }

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
            <Route exact path='/' component={AllGamesView} />
            <Route path='/login' component={LoginView} />
            <Route path='/registration' component={RegistrationView} />
            <Route path='/games' component={AllGamesView} />
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
          <Route exact path='/' component={AllGamesView} />
          <Route path='/games' component={AllGamesView} />
          <Route path='/mygames' component={MyGamesView} />
          <Route path='/signup' component={SignupView} />
          <Route path='/results' component={ResultsView} />
          <Route path='/group' component={GroupView} />
          <Route path='/admin' component={AdminView} />
          <Route path='/logout' component={LogoutView} />
          <Redirect from='/*' to='/' />
        </Switch>
      </React.Fragment>
    </BrowserRouter>
  )
}
