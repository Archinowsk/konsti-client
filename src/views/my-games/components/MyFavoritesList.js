/* @flow */
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import timeFormatter from 'utils/timeFormatter'
import { sortArrayByKey } from 'utils/sort'
import type { Game } from 'flow/game.flow'
import type { StatelessFunctionalComponent } from 'react'

type Props = {
  favoritedGames: Array<Game>,
}

const MyFavoritesList: StatelessFunctionalComponent<Props> = (props: Props) => {
  const { favoritedGames } = props
  const { t } = useTranslation()

  // Sort games by time and name
  const sortedGames = sortArrayByKey(favoritedGames, 'startTime', 'title')

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
    <div className='my-favorites-list'>
      <p>{t('favoritedGames')}</p>
      <ul>
        {favoritedGames.length === 0 && <span>{t('noFavoritedGames')}</span>}
        {GamesList}
      </ul>
    </div>
  )
}

export default MyFavoritesList
