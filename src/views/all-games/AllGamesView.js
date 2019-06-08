/* @flow */
import React from 'react'
import { connect } from 'react-redux'
import { Route, Switch } from 'react-router-dom'
import GameDetails from 'components/GameDetails'
import AllGamesList from 'views/all-games/components/AllGamesList'
import { getStore } from 'utils/store'
import loadData from 'utils/loadData'
import Loading from 'components/Loading'
import type { Game } from 'flow/game.flow'
import type { StatelessFunctionalComponent } from 'react'

type Props = {
  games: $ReadOnlyArray<Game>,
  hiddenGames: $ReadOnlyArray<Game>,
}

/*
type State = {
  loading: boolean,
}
*/

const AllGamesView: StatelessFunctionalComponent<Props> = (props: Props) => {
  const { games, hiddenGames } = props
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    const fetchData = async () => {
      await loadData(getStore())
    }
    fetchData()
    setLoading(false)
  }, [])

  // Remove hidden games
  const getVisibleGames = () => {
    if (!hiddenGames) return games
    const visibleGames = []
    for (let game of games) {
      let match = false
      for (let hiddenGame of hiddenGames) {
        if (game.gameId === hiddenGame.gameId) {
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

  const visibleGames = getVisibleGames()

  return (
    <div className='all-games-view'>
      {loading && <Loading />}
      {!loading && (
        <Switch>
          <Route
            exact
            path='/'
            render={props => <AllGamesList {...props} games={visibleGames} />}
          />
          <Route
            exact
            path='/games'
            render={props => <AllGamesList {...props} games={visibleGames} />}
          />
          <Route
            path='/games/:id'
            render={props => <GameDetails {...props} games={visibleGames} />}
          />
        </Switch>
      )}
    </div>
  )
}

const mapStateToProps = state => {
  return {
    games: state.allGames.games,
    hiddenGames: state.admin.hiddenGames,
  }
}

export default connect(
  mapStateToProps,
  null
)(AllGamesView)
