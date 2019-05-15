/* @flow */
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import timeFormatter from 'utils/timeFormatter'
import { sortArrayByKey } from 'utils/sort'
import type { Game } from 'flow/game.flow'
import type { StatelessFunctionalComponent } from 'react'

type Props = {
  games: Array<Game>,
}

const AllGamesList: StatelessFunctionalComponent<Props> = (props: Props) => {
  const { games } = props
  const { t } = useTranslation()

  // Sort games by starting time and name
  const sortGames = games => {
    const sortedGames = {}
    Object.keys(games)
      .sort()
      .forEach(key => {
        sortedGames[key] = sortArrayByKey(games[key], 'title')
      })

    return sortedGames
  }

  const buildGamesList = games => {
    // Group all unique starting times
    const groupedGames = games.reduce((acc, sortedGame) => {
      acc[sortedGame['startTime']] = acc[sortedGame['startTime']] || []
      acc[sortedGame['startTime']].push(sortedGame)
      return acc
    }, {})

    const sortedGames = sortGames(groupedGames)

    const GamesList = []

    for (const [startTime, games] of Object.entries(sortedGames)) {
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
