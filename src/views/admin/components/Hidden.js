/* @flow */
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { sortArrayByKey } from 'utils/sort'
import type { Game } from 'flow/game.flow'

type Props = {
  hiddenGames: Array<Game>,
}

const Hidden = (props: Props) => {
  const { hiddenGames } = props
  const { t } = useTranslation()

  const sortedGames = sortArrayByKey(hiddenGames, 'title')

  const GamesList = sortedGames.map(game => (
    <li key={game.gameId}>
      <Link to={`/games/${game.gameId}`}>{game.title}</Link>
    </li>
  ))

  return (
    <div className='hidden'>
      <p>{t('hiddenGames')}</p>
      <ul>
        {hiddenGames.length === 0 && <span>{t('noHiddenGames')}</span>}
        {GamesList}
      </ul>
    </div>
  )
}

export default Hidden
