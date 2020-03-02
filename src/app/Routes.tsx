import React, { FC, ReactElement } from 'react';
import { Route, NavLink, Switch, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { AllGamesView } from 'views/all-games/AllGamesView';
import { GameDetails } from 'views/all-games/components/GameDetails';
import { LoginView } from 'views/login/LoginView';
import { MyGamesView } from 'views/my-games/MyGamesView';
import { SignupView } from 'views/signup/SignupView';
import { RegistrationView } from 'views/registration/RegistrationView';
import { AdminView } from 'views/admin/AdminView';
import { ResultsView } from 'views/results/ResultsView';
import { LogoutView } from 'views/logout/LogoutView';
import { GroupView } from 'views/group/GroupView';
import { HelperView } from 'views/helper/HelperView';

import { UserGroup } from 'typings/user.typings';
import { RootState } from 'typings/redux.typings';

export interface Props {
  onlyAdminLoginAllowed: boolean;
}

export const Routes: FC<Props> = (props: Props): ReactElement => {
  const { onlyAdminLoginAllowed } = props;
  const loggedIn: boolean = useSelector(
    (state: RootState) => state.login.loggedIn
  );
  const userGroup: UserGroup = useSelector(
    (state: RootState) => state.login.userGroup
  );
  const { t } = useTranslation();

  if (onlyAdminLoginAllowed) {
    if (!loggedIn) {
      return (
        <>
          <div className='routes'>
            <NavLink to='/login' className='router-link'>
              {t('button.login')}
            </NavLink>
          </div>
          <Switch>
            <Route path='/login'>
              <LoginView />
            </Route>
            <Redirect from='/*' to='/' />
          </Switch>
        </>
      );
    }

    return (
      <>
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
          <Route path='/admin'>
            <AdminView />
          </Route>
          <Route path='/logout'>
            <LogoutView />
          </Route>
          <Redirect from='/*' to='/' />
        </Switch>
      </>
    );
  }

  if (loggedIn) {
    return (
      <>
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

          {(userGroup === 'user' ||
            userGroup === 'admin' ||
            userGroup === 'help') && (
            <NavLink to='/results' className='router-link'>
              {t('pages.results')}
            </NavLink>
          )}

          {userGroup === 'user' && (
            <NavLink to='/group' className='router-link'>
              {t('pages.group')}
            </NavLink>
          )}

          {(userGroup === 'help' || userGroup === 'admin') && (
            <NavLink to='/help' className='router-link'>
              {t('button.helper')}
            </NavLink>
          )}

          {userGroup === 'admin' && (
            <NavLink to='/admin' className='router-link'>
              {t('pages.admin')}
            </NavLink>
          )}

          {(userGroup === 'user' ||
            userGroup === 'admin' ||
            userGroup === 'help') && (
            <NavLink to='/logout' className='router-link'>
              {t('button.logout')}
            </NavLink>
          )}
        </div>
        <Switch>
          <Route path='/games/:gameId'>
            <GameDetails />
          </Route>
          <Route path='/games'>
            <AllGamesView />
          </Route>
          <Route path='/mygames'>
            <MyGamesView />
          </Route>
          <Route path='/signup'>
            <SignupView />
          </Route>
          <Route path='/results'>
            <ResultsView />
          </Route>
          <Route path='/group'>
            <GroupView />
          </Route>
          <Route path='/admin'>
            <AdminView />
          </Route>
          <Route path='/logout'>
            <LogoutView />
          </Route>
          <Route path='/help'>
            <HelperView />
          </Route>
          <Redirect from='/' to='/games' />
          <Redirect from='/*' to='/' />
        </Switch>
      </>
    );
  }

  return (
    <>
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
        <Route path='/login'>
          <LoginView />
        </Route>
        <Route path='/registration'>
          <RegistrationView />
        </Route>
        <Route path='/games/:gameId'>
          <GameDetails />
        </Route>
        <Route path='/games'>
          <AllGamesView />
        </Route>
        <Redirect from='/' to='/games' />
        <Redirect from='/*' to='/login' />
      </Switch>
    </>
  );
};
