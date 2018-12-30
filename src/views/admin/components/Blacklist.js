/* @flow */
import React from 'react'
import { withNamespaces } from 'react-i18next'
import { Link } from 'react-router-dom'

type Props = {
  t: Function,
  blacklistedGames: Array<any>,
}

const Blacklist = (props: Props) => {
  const { blacklistedGames, t } = props

  // Sort games by name
  const sortedGames = blacklistedGames.sort((a, b) => {
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
    <div className='blacklist'>
      <p>{t('blacklistedGames')}</p>
      <ul>
        {blacklistedGames.length === 0 && (
          <span>{t('noBlacklistedGames')}</span>
        )}
        {GamesList}
      </ul>
    </div>
  )
}

export default withNamespaces()(Blacklist)
