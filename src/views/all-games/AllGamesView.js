/* @flow */
import React from 'react'
import { translate } from 'react-i18next'
import { connect } from 'react-redux'
import { Route, Switch } from 'react-router-dom'
import GameDetails from 'components/GameDetails'
import AllGamesList from 'views/all-games/components/AllGamesList'
import addGameInfoById from 'utils/addGameInfoById'
import { getData } from 'utils/store'

type Props = {
  t: Function,
  games: Array<any>,
  blacklistedGames: Array<any>,
  myGames: Object,
}

type State = {
  loading: boolean,
}

class AllGamesView extends React.Component<Props, State> {
  state = { loading: true }

  componentDidMount = async () => {
    await getData()
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
    myGames: state.myGames,
  }
}

export default translate()(
  connect(
    mapStateToProps,
    null
  )(AllGamesView)
)
