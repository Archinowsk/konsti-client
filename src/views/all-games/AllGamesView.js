/* @flow */
import React, { Fragment } from 'react'
import { useSelector } from 'react-redux'
import { Route, Switch } from 'react-router-dom'
import moment from 'moment'
import GameDetails from 'views/all-games/components/GameDetails'
import { AllGamesList } from 'views/all-games/components/AllGamesList'
import { config } from 'config'
import type { Game } from 'flow/game.flow'
import type { StatelessFunctionalComponent, Element } from 'react'

type Props = {}

export const AllGamesView: StatelessFunctionalComponent<Props> = (
  props: Props
): Element<typeof Fragment> => {
  const { useTestTime } = config

  const games: $ReadOnlyArray<Game> = useSelector(state => state.allGames.games)
  const testTime: string = useSelector(state => state.admin.testTime)
  const hiddenGames: $ReadOnlyArray<Game> = useSelector(
    state => state.admin.hiddenGames
  )

  const [showAllGames, setShowAllGames] = React.useState(false)
  ;(showAllGames: boolean)

  const getVisibleGames = (): $ReadOnlyArray<Game> => {
    let timeNow = moment()
    if (useTestTime) {
      timeNow = moment(testTime)
    }

    const visibleGames = games.filter(game => {
      const hidden = hiddenGames.find(
        hiddenGame => game.gameId === hiddenGame.gameId
      )
      if (!hidden) return game
    })

    if (showAllGames) return visibleGames

    const upcomingGames = visibleGames.filter(visibleGame =>
      moment(visibleGame.startTime).isAfter(timeNow)
    )

    return upcomingGames
  }

  return (
    <Fragment>
      <Switch>
        <Route
          exact
          path='/games'
          render={() => (
            <Fragment>
              <div className='all-games-toggle-visibiliy'>
                <button
                  onClick={() => setShowAllGames(false)}
                  disabled={!showAllGames}
                >
                  Upcoming games
                </button>
                <button
                  onClick={() => setShowAllGames(true)}
                  disabled={showAllGames}
                >
                  All games
                </button>
              </div>
              <AllGamesList games={getVisibleGames()} />
            </Fragment>
          )}
        />
        <Route path='/games/:id' render={() => <GameDetails />} />
      </Switch>
    </Fragment>
  )
}
