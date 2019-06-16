/* @flow */
import React from 'react'
import { useTranslation } from 'react-i18next'
import _ from 'lodash'
import { getStartTimes } from 'utils/getStartTimes'
import GamesByStartTimes from './GamesByStartTimes'
import type { Game } from 'flow/game.flow'
import type { StatelessFunctionalComponent } from 'react'

type Props = {
  favoritedGames: $ReadOnlyArray<Game>,
}

const MyFavoritesList: StatelessFunctionalComponent<Props> = (props: Props) => {
  const { favoritedGames } = props
  const { t } = useTranslation()

  const sortedGames = _.sortBy(favoritedGames, [
    favoritedGame => favoritedGame.startTime,
    favoritedGame => favoritedGame.title.toLowerCase(),
  ])

  const startTimes = getStartTimes(favoritedGames)

  const signups = sortedGames.map(sortedGame => {
    return {
      gameDetails: sortedGame,
      priority: 0,
      time: '',
    }
  })

  return (
    <div className='my-favorites-list'>
      <h3>{t('favoritedGames')}</h3>
      <div className='my-favorites-games'>
        {favoritedGames.length === 0 && <span>{t('noFavoritedGames')}</span>}
        {favoritedGames.length !== 0 && (
          <GamesByStartTimes signups={signups} startTimes={startTimes} />
        )}
      </div>
    </div>
  )
}

export default MyFavoritesList
