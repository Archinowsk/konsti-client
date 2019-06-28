/* @flow */
import React from 'react'
import { useSelector } from 'react-redux'
import { Route, Switch } from 'react-router-dom'
import { SignupList } from 'views/signup/components/SignupList'
import { getOpenStartTimes } from 'utils/getOpenStartTimes'
import type { Game } from 'flow/game.flow'
import type { StatelessFunctionalComponent } from 'react'

export const SignupView: StatelessFunctionalComponent<{}> = () => {
  const games: $ReadOnlyArray<Game> = useSelector(state => state.allGames.games)
  const testTime: string = useSelector(state => state.admin.testTime)

  const [signupTimes, setSignupTimes] = React.useState([])
  ;(signupTimes: $ReadOnlyArray<string>)

  React.useEffect(() => {
    setSignupTimes(getOpenStartTimes(games, testTime))
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
