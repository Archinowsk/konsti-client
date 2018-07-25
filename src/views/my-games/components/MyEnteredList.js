/* @flow */
import React from 'react'
import { translate } from 'react-i18next'
import { Link } from 'react-router-dom'
import moment from 'moment'
import timeFormatter from 'utils/timeFormatter'

type Props = {
  t: Function,
  enteredGames: Array<any>,
}

const MyEnteredList = (props: Props) => {
  const { enteredGames, t } = props

  // Sort games by time and name
  const sortedGames = enteredGames.sort((a, b) => {
    const keyA = moment(a.details.startTime) + a.details.title.toLowerCase()
    const keyB = moment(b.details.startTime) + b.details.title.toLowerCase()
    if (keyA < keyB) return -1
    if (keyA > keyB) return 1
    return 0
  })

  const GamesList = sortedGames.map(game => {
    const formattedDate = timeFormatter.weekdayAndTime(game.details.startTime)

    return (
      <li key={game.id}>
        <Link to={`/games/${game.id}`}>
          {formattedDate}: {game.details.title}
        </Link>
      </li>
    )
  })

  return (
    <div className="my-entered-games">
      <p>{t('enteredGames')}</p>
      <ul>
        {enteredGames.length === 0 && <span>{t('noEnteredGames')}</span>}
        {GamesList}
      </ul>
    </div>
  )
}

export default translate()(MyEnteredList)
