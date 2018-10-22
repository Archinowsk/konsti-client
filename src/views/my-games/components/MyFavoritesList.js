/* @flow */
import React from 'react'
import { withNamespaces } from 'react-i18next'
import { Link } from 'react-router-dom'
import moment from 'moment'
import timeFormatter from 'utils/timeFormatter'

type Props = {
  t: Function,
  favoritedGames: Array<any>,
}

const MyFavoritesList = (props: Props) => {
  const { favoritedGames, t } = props

  // Sort games by time and name
  const sortedGames = favoritedGames.sort((a, b) => {
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
    <div className="my-favorites-list">
      <p>{t('favoritedGames')}</p>
      <ul>
        {favoritedGames.length === 0 && <span>{t('noFavoritedGames')}</span>}
        {GamesList}
      </ul>
    </div>
  )
}

export default withNamespaces()(MyFavoritesList)
