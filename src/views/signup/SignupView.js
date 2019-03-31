/* @flow */
import React from 'react'
import { connect } from 'react-redux'
import { Route, Switch } from 'react-router-dom'
import SignupList from 'views/signup/components/SignupList'
import GameDetails from 'components/GameDetails'

type Props = {
  games: Array<any>,
}

type State = {
  loading: boolean,
}

const SignupView = (props: Props, state: State) => {
  const { games } = props

  return (
    <div className='signup-view'>
      <Switch>
        <Route
          exact
          path='/signup'
          render={props => <SignupList {...props} games={games} />}
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
