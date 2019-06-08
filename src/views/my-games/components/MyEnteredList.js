/* @flow */
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import _ from 'lodash'
import timeFormatter from 'utils/timeFormatter'
import type { Signup } from 'flow/user.flow'
import type { StatelessFunctionalComponent } from 'react'

type Props = {
  enteredGames: Array<Signup>,
}

const MyEnteredList: StatelessFunctionalComponent<Props> = (props: Props) => {
  const { enteredGames } = props
  const { t } = useTranslation()

  const sortedGames = _.sortBy(enteredGames, [
    enteredGame => enteredGame.gameDetails.startTime,
    enteredGame => enteredGame.gameDetails.title.toLowerCase(),
  ])

  const GamesList = sortedGames.map(game => {
    const formattedDate = timeFormatter.weekdayAndTime(
      game.gameDetails.startTime
    )
    return (
      <li key={game.gameDetails.gameId}>
        <Link to={`/games/${game.gameDetails.gameId}`}>
          {formattedDate}: {game.gameDetails.title}
        </Link>
      </li>
    )
  })

  return (
    <div className='my-entered-games'>
      <p>{t('enteredGames')}</p>
      <ul>
        {enteredGames.length === 0 && <span>{t('noEnteredGames')}</span>}
        {GamesList}
        <p>{t('noSignupResultHint')}</p>
      </ul>
    </div>
  )
}

export default MyEnteredList
