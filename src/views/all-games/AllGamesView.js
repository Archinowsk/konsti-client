/* @flow */
import React, { Fragment } from 'react'
import { useSelector, useStore } from 'react-redux'
import { Route, Switch } from 'react-router-dom'
import GameDetails from 'components/GameDetails'
import { AllGamesList } from 'views/all-games/components/AllGamesList'
import { loadData } from 'utils/loadData'
import { Loading } from 'components/Loading'
import type { Game } from 'flow/game.flow'
import type { StatelessFunctionalComponent, Element } from 'react'

type Props = {}
export const AllGamesView: StatelessFunctionalComponent<Props> = (
  props: Props
): Element<typeof Fragment> => {
  const games: $ReadOnlyArray<Game> = useSelector(state => state.allGames.games)
  const hiddenGames: $ReadOnlyArray<Game> = useSelector(
    state => state.admin.hiddenGames
  )
  const store = useStore()

  const [loading, setLoading] = React.useState(true)
  ;(loading: boolean)

  React.useEffect(() => {
    const fetchData = async (): Promise<any> => {
      await loadData(store)
    }
    fetchData()
    setLoading(false)
  }, [store])

  // Remove hidden games
  const getVisibleGames = () => {
    if (!hiddenGames) return games
    const visibleGames = []
    for (const game of games) {
      let match = false
      for (const hiddenGame of hiddenGames) {
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
    <Fragment>
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
    </Fragment>
  )
}
