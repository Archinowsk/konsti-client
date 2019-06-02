/* @flow */
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import _ from 'lodash'
import timeFormatter from 'utils/timeFormatter'
import type { Game } from 'flow/game.flow'
import type { StatelessFunctionalComponent } from 'react'

type Props = {
  favoritedGames: Array<Game>,
}

const MyFavoritesList: StatelessFunctionalComponent<Props> = (props: Props) => {
  const { favoritedGames } = props
  const { t } = useTranslation()

  const sortedGames = _.sortBy(favoritedGames, [
    favoritedGame => favoritedGame.startTime,
    favoritedGame => favoritedGame.title.toLowerCase(),
  ])

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
