/* @flow */
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import _ from 'lodash'
import timeFormatter from 'utils/timeFormatter'
import type { Game } from 'flow/game.flow'
import type { StatelessFunctionalComponent } from 'react'

type Props = {
  games: Array<Game>,
}

const AllGamesList: StatelessFunctionalComponent<Props> = (props: Props) => {
  const { games } = props
  const { t } = useTranslation()

  const buildGamesList = games => {
    const sortedGames = _.sortBy(games, [game => game.title.toLowerCase()])
    const groupedGames = _.groupBy(sortedGames, 'startTime')

    const GamesList = []

    for (const [startTime, games] of Object.entries(groupedGames)) {
      const formattedStartTime = timeFormatter.weekdayAndTime(startTime)
      const { signupStartTime, startTimeException } = timeFormatter.startTime(
        startTime
      )
      const { signupEndTime, endTimeException } = timeFormatter.endTime(
        startTime,
        ''
      )

      const title = (
        <p key={startTime} className='title'>
          {formattedStartTime} ({t('signupOpenBetween')} {signupStartTime}-
          {signupEndTime})
        </p>
      )

      GamesList.push(title)

      // Show exception warning if there are changes in time
      if (startTimeException || endTimeException) {
        const exception = (
          <p key={`${startTime}-exception`} className='exception'>
            {' '}
            {t('exceptionInTime')}
          </p>
        )

        GamesList.push(exception)
      }

      /* $FlowFixMe: property `@@iterator` is missing in  mixed [1] but exists in  `$Iterable` [2]. */
      for (let game of games) {
        const gameEntry = (
          <p key={game.gameId} className='games-list'>
            <Link to={`/games/${game.gameId}`}>{game.title}</Link>
          </p>
        )

        GamesList.push(gameEntry)
      }
    }

    return GamesList
  }

  const GamesList = buildGamesList(games)

  return <div className='games-list'>{GamesList}</div>
}

export default AllGamesList
