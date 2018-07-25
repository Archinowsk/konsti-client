/* @flow */
import React from 'react'
import { translate } from 'react-i18next'
import { Link } from 'react-router-dom'
import timeFormatter from 'utils/timeFormatter'

type Props = {
  t: Function,
  signedGames: Array<any>,
}

const MySignupsList = (props: Props) => {
  const { signedGames, t } = props

  const GamesList = signedGames.map(game => {
    const formattedDate = timeFormatter.weekdayAndTime(game.details.startTime)

    console.log(game.startTime)
    console.log(formattedDate)
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

export default translate()(MySignupsList)
