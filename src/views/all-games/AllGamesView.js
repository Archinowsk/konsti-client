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
import addGameInfoById from 'utils/addGameInfoById'

type Props = {
  t: Function,
  onSubmitGetGames: Function,
  games: Array<any>,
  blacklistedGames: Array<any>,
  onSubmitGetSettings: Function,
  username: string,
  onSubmitGetUser: Function,
  loggedIn: boolean,
  myGamesLoaded: boolean,
  adminSettingsLoaded: boolean,
  myGames: Object,
}

type State = {
  loading: boolean,
}

class AllGamesView extends React.Component<Props, State> {
  state = { loading: true }

  componentDidMount = async () => {
    const {
      onSubmitGetGames,
      onSubmitGetUser,
      onSubmitGetSettings,
      username,
      loggedIn,
      myGamesLoaded,
      adminSettingsLoaded,
    } = this.props

    // Load games data if not loaded
    await onSubmitGetGames()

    if (loggedIn) {
      // Load user data
      if (!myGamesLoaded) {
        await onSubmitGetUser(username)
      }
      // Load settings data
      if (!adminSettingsLoaded) {
        await onSubmitGetSettings()
      }
    }

    this.setState({ loading: false })
  }

  // Remove hidden games
  getVisibleGames = () => {
    const { games, blacklistedGames } = this.props

    const visibleGames = []
    for (let game of games) {
      let match = false
      for (let blacklistedGame of blacklistedGames) {
        if (game.id === blacklistedGame.id) {
          match = true
          break
        }
      }
      if (!match) {
        visibleGames.push(game)
      }
    }
    return visibleGames
  }

  render() {
    const { t, games, myGames } = this.props
    const { loading } = this.state

    addGameInfoById({ games, myGames })

    const visibleGames = this.getVisibleGames()

    return (
      <div className="all-games-view">
        {loading && <p>{t('loading')}</p>}
        {!loading && (
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
        )}
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
    loggedIn: state.login.loggedIn,
    myGamesLoaded: state.myGames.myGamesLoaded,
    adminSettingsLoaded: state.admin.adminSettingsLoaded,
    myGames: state.myGames,
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
