/* @flow */
import React from 'react'
import { connect } from 'react-redux'
import { Route, Switch } from 'react-router-dom'
import { translate } from 'react-i18next'

import { submitGetGames } from '~/views/all-games/allGamesActions'
import { submitGetSettings } from '~/views/admin/adminActions'
import { submitGetUser } from '~/views/my-games/myGamesActions'
import SignupList from '~/views/signup/components/SignupList'
import GameDetails from '~/components/GameDetails'

type Props = {
  t: Function,
  onSubmitGetGames: Function,
  onSubmitGetSettings: Function,
  games: Array<any>,
  onSubmitGetUser: Function,
  username: string,
  signedGames: Array<any>,
}

class SignupView extends React.Component<Props> {
  props: Props
  componentDidMount() {
    /*
    if (!this.props.games || this.props.games.length === 0) {
      this.props.onSubmitGetGames();
    }
    */
    this.props.onSubmitGetGames()
    this.props.onSubmitGetSettings()
    this.props.onSubmitGetUser(this.props.username)
  }

  render() {
    const { games, t, signedGames } = this.props

    if (!games || games.length === 0) {
      return <p>{t('loading')}</p>
    }

    if (!signedGames || signedGames === 0) {
      return <p>{t('loading')}</p>
    }

    return (
      <div>
        <Switch>
          <Route
            exact
            path="/signup"
            render={props => <SignupList {...props} games={games} />}
          />
          <Route
            exact
            path="/games/:id"
            render={props => <GameDetails {...props} />}
          />
        </Switch>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    games: state.allGames.games,
    username: state.login.username,
    signedGames: state.myGames.signedGames,
  }
}

const mapDispatchToProps = (dispatch: Function) => {
  return {
    onSubmitGetGames: () => dispatch(submitGetGames()),
    onSubmitGetSettings: () => dispatch(submitGetSettings()),
    onSubmitGetUser: username => dispatch(submitGetUser(username)),
  }
}

export default translate()(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(SignupView)
)
