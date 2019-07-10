/* @flow */
import React from 'react'
import {
  BrowserRouter,
  Route,
  NavLink,
  Switch,
  Redirect,
} from 'react-router-dom'
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
import type { UserGroup } from 'flow/user.flow'

type Props = {
  onlyAdmin: boolean,
}

export const Routes: StatelessFunctionalComponent<Props> = (props: Props) => {
  const { onlyAdmin } = props
  const loggedIn: boolean = useSelector(state => state.login.loggedIn)
  const userGroup: UserGroup = useSelector(state => state.login.userGroup)
  const { t } = useTranslation()

  if (onlyAdmin && !loggedIn) {
    return (
      <BrowserRouter>
        <React.Fragment>
          <div className='routes'>
            <NavLink to='/login' className='router-link'>
              {t('button.login')}
            </NavLink>
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
              <NavLink to='/admin' className='router-link'>
                {t('pages.admin')}
              </NavLink>
            )}
            {(userGroup === 'user' || userGroup === 'admin') && (
              <NavLink to='/logout' className='router-link'>
                {t('button.logout')}
              </NavLink>
            )}
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
            <NavLink to='/games' className='router-link'>
              {t('pages.allGames')}
            </NavLink>
            <NavLink to='/login' className='router-link'>
              {t('button.login')}
            </NavLink>
            <NavLink to='/registration' className='router-link'>
              {t('button.register')}
            </NavLink>
          </div>

          <Switch>
            <Route path='/login' component={LoginView} />
            <Route path='/registration' component={RegistrationView} />
            <Route path='/games' component={AllGamesView} />
            <Redirect from='/' to='/games' />
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
          <NavLink to='/games' className='router-link'>
            {t('pages.allGames')}
          </NavLink>
          {userGroup === 'user' && (
            <NavLink to='/mygames' className='router-link'>
              {t('pages.myGames')}
            </NavLink>
          )}
          {userGroup === 'user' && (
            <NavLink to='/signup' className='router-link'>
              {t('pages.signUp')}
            </NavLink>
          )}
          {(userGroup === 'user' || userGroup === 'admin') && (
            <NavLink to='/results' className='router-link'>
              {t('pages.results')}
            </NavLink>
          )}

          {userGroup === 'user' && (
            <NavLink to='/group' className='router-link'>
              {t('pages.group')}
            </NavLink>
          )}

          {userGroup === 'admin' && (
            <NavLink to='/admin' className='router-link'>
              {t('pages.admin')}
            </NavLink>
          )}
          {(userGroup === 'user' || userGroup === 'admin') && (
            <NavLink to='/logout' className='router-link'>
              {t('button.logout')}
            </NavLink>
          )}
        </div>
        <Switch>
          <Route path='/games' component={AllGamesView} />
          <Route path='/mygames' component={MyGamesView} />
          <Route path='/signup' component={SignupView} />
          <Route path='/results' component={ResultsView} />
          <Route path='/group' component={GroupView} />
          <Route path='/admin' component={AdminView} />
          <Route path='/logout' component={LogoutView} />
          <Redirect from='/' to='/games' />
          <Redirect from='/*' to='/' />
        </Switch>
      </React.Fragment>
    </BrowserRouter>
  )
}
