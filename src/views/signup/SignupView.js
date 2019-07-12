/* @flow */
import React from 'react'
import { useSelector } from 'react-redux'
import { Route, Switch } from 'react-router-dom'
import { SignupList } from 'views/signup/components/SignupList'
import { getOpenStartTimes } from 'utils/getOpenStartTimes'
import type { Game } from 'flow/game.flow'
import type { StatelessFunctionalComponent, Element } from 'react'

type Props = {}

export const SignupView: StatelessFunctionalComponent<Props> = (
  props: Props
): Element<'div'> => {
  const games: $ReadOnlyArray<Game> = useSelector(state => state.allGames.games)
  const testTime: string = useSelector(state => state.admin.testTime)

  const [signupTimes, setSignupTimes] = React.useState([])
  ;(signupTimes: $ReadOnlyArray<string>)

  React.useEffect(() => {
    setSignupTimes(getOpenStartTimes(games, testTime))
  }, [games, testTime])

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
