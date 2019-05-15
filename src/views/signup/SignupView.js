/* @flow */
import React from 'react'
import { connect } from 'react-redux'
import { Route, Switch } from 'react-router-dom'
import SignupList from 'views/signup/components/SignupList'
import GameDetails from 'components/GameDetails'
import getOpenSignupTimes from 'utils/getOpenSignupTimes'
import type { Game } from 'flow/game.flow'
import type { StatelessFunctionalComponent } from 'react'

type Props = {
  games: Array<Game>,
}

type State = {
  loading: boolean,
  signupTimes: Array<string>,
}

const SignupView: StatelessFunctionalComponent<Props> = (
  props: Props,
  state: State
) => {
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
          render={props => (
            <SignupList {...props} games={games} signupTimes={signupTimes} />
          )}
        />
        <Route
          exact
          path='/games/:id'
          render={props => <GameDetails {...props} />}
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
