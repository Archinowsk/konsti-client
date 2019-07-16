/* @flow */
import React, { Fragment } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import _ from 'lodash'
import { timeFormatter } from 'utils/timeFormatter'
import type { Game } from 'flow/game.flow'
import type { StatelessFunctionalComponent, Element } from 'react'

export type Props = {|
  games: $ReadOnlyArray<Game>,
|}

export const AllGamesList: StatelessFunctionalComponent<Props> = (
  props: Props
): Element<'div'> => {
  const { games } = props
  const { t } = useTranslation()

  const buildGamesList = games => {
    const sortedGames = _.sortBy(games, [
      game => game.startTime,
      game => game.title.toLowerCase(),
    ])

    const groupedGames = _.groupBy(sortedGames, 'startTime')

    const GamesList = []

    for (const [startTime, games] of Object.entries(groupedGames)) {
      const formattedStartTime = timeFormatter.weekdayAndTime(startTime)
      const signupStartTime = timeFormatter.startTime(startTime)
      const signupEndTime = timeFormatter.endTime(startTime)

      const title = (
        <p key={startTime} className='title'>
          {formattedStartTime} ({t('signupOpenBetween')} {signupStartTime}-
          {signupEndTime})
        </p>
      )

      GamesList.push(title)

      /* $FlowFixMe: property `@@iterator` is missing in mixed [1] but exists in `$Iterable` [2]. */
      for (const game of games) {
        const gameEntry = (
          <div key={game.gameId} className='games-list'>
            <Link to={`/games/${game.gameId}`}>{game.title}</Link>{' '}
            <p className='game-list-short-description'>
              {game.shortDescription}
            </p>
          </div>
        )

        GamesList.push(gameEntry)
      }
    }

    return GamesList
  }

  const GamesList = buildGamesList(games)

  return (
    <div className='games-list'>
      {games.length === 0 && <h3>{t('programNotReleased')}</h3>}
      {games.length !== 0 && <Fragment>{GamesList}</Fragment>}
    </div>
  )
}
