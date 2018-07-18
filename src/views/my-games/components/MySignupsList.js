/* @flow */
import React from 'react'
import { translate } from 'react-i18next'
import { Link } from 'react-router-dom'
import moment from 'moment'

type Props = {
  t: Function,
  signedGames: Array<any>,
}

const MySignupsList = (props: Props) => {
  const { signedGames, t } = props

  const GamesList = signedGames.map(game => {
    const formattedDate = moment(game.startTime).format('DD.M.YYYY HH:mm')

    return (
      <li key={game.id}>
        <Link to={`/games/${game.id}`}>
          {formattedDate}: {game.title} ({game.priority})
        </Link>
      </li>
    )
  })

  return (
    <div>
      <p>{t('signedGames')}</p>
      <ul>
        {signedGames.length === 0 && <span>{t('noSignedGames')}</span>}
        {GamesList}
      </ul>
    </div>
  )
}

export default translate()(MySignupsList)
