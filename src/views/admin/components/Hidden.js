/* @flow */
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

type Props = {
  hiddenGames: Array<any>,
}

const Hidden = (props: Props) => {
  const { hiddenGames } = props
  const { t } = useTranslation()

  // Sort games by name
  const sortedGames = hiddenGames.sort((a, b) => {
    const keyA = a.title.toLowerCase()
    const keyB = b.title.toLowerCase()
    if (keyA < keyB) return -1
    if (keyA > keyB) return 1
    return 0
  })

  const GamesList = sortedGames.map(game => (
    <li key={game.id}>
      <Link to={`/games/${game.id}`}>{game.title}</Link>
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
