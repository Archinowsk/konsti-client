/* @flow */
import React from 'react'
import { useSelector } from 'react-redux'
import { Route, Switch } from 'react-router-dom'
import GameDetails from 'components/GameDetails'
import AllGamesList from 'views/all-games/components/AllGamesList'
import { getStore } from 'utils/store'
import loadData from 'utils/loadData'
import Loading from 'components/Loading'
import type { Game } from 'flow/game.flow'
import type { StatelessFunctionalComponent } from 'react'

/*
type State = {
  loading: boolean,
}
*/

const AllGamesView: StatelessFunctionalComponent<{}> = () => {
  const games: $ReadOnlyArray<Game> = useSelector(state => state.allGames.games)
  const hiddenGames: $ReadOnlyArray<Game> = useSelector(
    state => state.admin.hiddenGames
  )

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
            render={() => <AllGamesList games={visibleGames} />}
          />
          <Route
            exact
            path='/games'
            render={() => <AllGamesList games={visibleGames} />}
          />
          <Route path='/games/:id' render={() => <GameDetails />} />
        </Switch>
      )}
    </div>
  )
}

export default AllGamesView
