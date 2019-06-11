/* @flow */
import React from 'react'
import { useSelector } from 'react-redux'
import { Route, Switch } from 'react-router-dom'
import SignupList from 'views/signup/components/SignupList'
import getOpenSignupTimes from 'utils/getOpenSignupTimes'
import type { Game } from 'flow/game.flow'
import type { StatelessFunctionalComponent } from 'react'

/*
type State = {
  loading: boolean,
  signupTimes: $ReadOnlyArray<string>,
}
*/

const SignupView: StatelessFunctionalComponent<{}> = () => {
  const games: $ReadOnlyArray<Game> = useSelector(state => state.allGames.games)

  const [signupTimes, setSignupTimes] = React.useState([])

  React.useEffect(() => {
    setSignupTimes(getOpenSignupTimes(games))
  }, [])

  return (
    <div className='signup-view'>
      <Switch>
        <Route
          exact
          path='/signup'
          render={() => <SignupList games={games} signupTimes={signupTimes} />}
        />
      </Switch>
    </div>
  )
}

export default SignupView
