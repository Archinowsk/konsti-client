/* @flow */
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import moment from 'moment'
import timeFormatter from 'utils/timeFormatter'

type Props = {
  enteredGames: Array<Object>,
}

const MyEnteredList = (props: Props) => {
  const { enteredGames } = props
  const { t } = useTranslation()

  // Sort games by time and name
  const sortedGames = enteredGames.sort((a, b) => {
    const keyA = moment(a.startTime) + a.title.toLowerCase()
    const keyB = moment(b.startTime) + b.title.toLowerCase()
    if (keyA < keyB) return -1
    if (keyA > keyB) return 1
    return 0
  })

  const GamesList = sortedGames.map(game => {
    const formattedDate = timeFormatter.weekdayAndTime(game.startTime)
    return (
      <li key={game.id}>
        <Link to={`/games/${game.id}`}>
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
