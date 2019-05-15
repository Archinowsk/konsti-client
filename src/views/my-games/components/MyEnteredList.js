/* @flow */
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import timeFormatter from 'utils/timeFormatter'
import { sortArrayByKey } from 'utils/sort'
import type { Game } from 'flow/game.flow'
import type { StatelessFunctionalComponent } from 'react'

type Props = {
  enteredGames: Array<Game>,
}

const MyEnteredList: StatelessFunctionalComponent<Props> = (props: Props) => {
  const { enteredGames } = props
  const { t } = useTranslation()

  // Sort games by time and name
  const sortedGames = sortArrayByKey(enteredGames, 'startTime', 'title')

  const GamesList = sortedGames.map(game => {
    const formattedDate = timeFormatter.weekdayAndTime(game.startTime)
    return (
      <li key={game.gameId}>
        <Link to={`/games/${game.gameId}`}>
          {formattedDate}: {game.title}
        </Link>
      </li>
    )
  })

  return (
    <div className='my-entered-games'>
      <p>{t('enteredGames')}</p>
      <ul>
        {enteredGames.length === 0 && <span>{t('noEnteredGames')}</span>}
        {GamesList}
        <p>{t('noSignupResultHint')}</p>
      </ul>
    </div>
  )
}

export default MyEnteredList
