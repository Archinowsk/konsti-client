/* @flow */
import React from 'react'
import { translate } from 'react-i18next'
import { connect } from 'react-redux'
import { Route, Switch } from 'react-router-dom'
import GameDetails from 'components/GameDetails'
import { submitGetSettings } from 'views/admin/adminActions'
import { submitGetUser } from 'views/my-games/myGamesActions'
import { submitGetGames } from 'views/all-games/allGamesActions'
import AllGamesList from 'views/all-games/components/AllGamesList'

type Props = {
  t: Function,
  onSubmitGetGames: Function,
  games: Array<any>,
  blacklistedGames: Array<any>,
  onSubmitGetSettings: Function,
  username: string,
  onSubmitGetUser: Function,
}

class AllGamesView extends React.Component<Props> {
  componentDidMount() {
    this.props.onSubmitGetGames()
    this.props.onSubmitGetSettings()
  }

  render() {
    const { games, t, blacklistedGames } = this.props

    if (!games || games.length === 0) {
      return <p>{t('loading')}</p>
    }

    // Remove hidden games
    const visibleGames = []
    for (let i = 0; i < games.length; i += 1) {
      let match = false
      for (let j = 0; j < blacklistedGames.length; j += 1) {
        if (games[i].id === blacklistedGames[j].id) {
          match = true
          break
        }
      }
      if (!match) {
        visibleGames.push(games[i])
      }
    }

    return (
      <div>
        <Switch>
          <Route
            exact
            path="/"
            render={props => <AllGamesList {...props} games={visibleGames} />}
          />
          <Route
            exact
            path="/games"
            render={props => <AllGamesList {...props} games={visibleGames} />}
          />
          <Route
            path="/games/:id"
            render={props => <GameDetails {...props} games={visibleGames} />}
          />
        </Switch>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    games: state.allGames.games,
    blacklistedGames: state.admin.blacklistedGames,
    signedGames: state.myGames.signedGames,
    username: state.login.username,
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
  )(AllGamesView)
)
