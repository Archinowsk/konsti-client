/* @flow */
import React from 'react'
import { withNamespaces } from 'react-i18next'
import { Link } from 'react-router-dom'
import moment from 'moment'
import timeFormatter from 'utils/timeFormatter'

type Props = {
  t: Function,
  signedGames: Array<any>,
}

const MySignupsList = (props: Props) => {
  const { signedGames, t } = props

  // Sort games by time and name
  const sortedGames = signedGames.sort((a, b) => {
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
          {formattedDate}: {game.details.title} ({game.priority})
        </Link>
      </li>
    )
  })

  return (
    <div className="my-signups-list">
      <p>{t('signedGames')}</p>
      <ul>
        {signedGames.length === 0 && <span>{t('noSignedGames')}</span>}
        {GamesList}
      </ul>
    </div>
  )
}

export default withNamespaces()(MySignupsList)
