/* @flow */
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import _ from 'lodash'
import type { Game } from 'flow/game.flow'
import type { StatelessFunctionalComponent } from 'react'

type Props = {
  hiddenGames: Array<Game>,
}

const Hidden: StatelessFunctionalComponent<Props> = (props: Props) => {
  const { hiddenGames } = props
  const { t } = useTranslation()

  const sortedGames = _.sortBy(hiddenGames, ['title'])

  const GamesList = sortedGames.map(game => (
    <li key={game.gameId}>
      <Link to={`/games/${game.gameId}`}>{game.title}</Link>
    </li>
  ))

  return (
    <div className='hidden'>
      <p>{t('hiddenGames')}</p>
      <ul>
        {!hiddenGames && <span>{t('noHiddenGames')}</span>}
        {GamesList}
      </ul>
    </div>
  )
}

export default Hidden
