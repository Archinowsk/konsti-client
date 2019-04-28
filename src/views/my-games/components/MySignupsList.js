/* @flow */
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import timeFormatter from 'utils/timeFormatter'
import { sortArrayByKey } from 'utils/sort'
import type { Game } from 'flow/game.flow'

type Props = {
  signedGames: Array<Game>,
}

const MySignupsList = (props: Props) => {
  const { signedGames } = props
  const { t } = useTranslation()

  // Sort games by time and name
  const sortedGames = sortArrayByKey(signedGames, 'startTime', 'title')

  const GamesList = sortedGames.map(game => {
    const formattedDate = timeFormatter.weekdayAndTime(game.startTime)

    return (
      <li key={game.gameId}>
        <Link to={`/games/${game.gameId}`}>
          {formattedDate}: {game.title} ({game.priority})
        </Link>
      </li>
    )
  })

  return (
    <div className='my-signups-list'>
      <p>{t('signedGames')}</p>
      <ul>
        {signedGames.length === 0 && <span>{t('noSignedGames')}</span>}
        {GamesList}
      </ul>
    </div>
  )
}

export default MySignupsList
