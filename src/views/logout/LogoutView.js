// @flow
import React from 'react';
import { useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { submitLogout } from 'views/logout/logoutActions';
import type { StatelessFunctionalComponent, Element } from 'react';

type Props = {};

export const LogoutView: StatelessFunctionalComponent<Props> = (
  props: Props
): Element<typeof Redirect> => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(submitLogout());
  });

  return <Redirect to='/' />;
};
