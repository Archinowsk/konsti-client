/* @flow */
import React from 'react'
import { connect } from 'react-redux'
import { Route, Switch } from 'react-router-dom'
import SignupList from 'views/signup/components/SignupList'
import getOpenSignupTimes from 'utils/getOpenSignupTimes'
import type { Game } from 'flow/game.flow'
import type { StatelessFunctionalComponent } from 'react'

type Props = {
  games: $ReadOnlyArray<Game>,
}

/*
type State = {
  loading: boolean,
  signupTimes: $ReadOnlyArray<string>,
}
*/

const SignupView: StatelessFunctionalComponent<Props> = (props: Props) => {
  const { games } = props
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

const mapStateToProps = state => {
  return {
    games: state.allGames.games,
  }
}

export default connect(
  mapStateToProps,
  null
)(SignupView)
