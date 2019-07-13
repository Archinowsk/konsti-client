/* @flow */
import React, { Fragment } from 'react'
import { useSelector } from 'react-redux'
import { Route, Switch } from 'react-router-dom'
import GameDetails from 'components/GameDetails'
import { AllGamesList } from 'views/all-games/components/AllGamesList'
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
      <Switch>
        <Route
          exact
          path='/games'
          render={() => <AllGamesList games={visibleGames} />}
        />
        <Route path='/games/:id' render={() => <GameDetails />} />
      </Switch>
    </Fragment>
  )
}
