/* @flow */
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import _ from 'lodash'
import timeFormatter from 'utils/timeFormatter'
import type { GameWithPriority } from 'flow/game.flow'
import type { StatelessFunctionalComponent } from 'react'

type Props = {
  signedGames: Array<GameWithPriority>,
}

const MySignupsList: StatelessFunctionalComponent<Props> = (props: Props) => {
  const { signedGames } = props
  const { t } = useTranslation()

  const sortedSignups = _.sortBy(signedGames, [
    'gameDetails.startTime',
    'priority',
  ])

  const GamesList = sortedSignups.map(signup => {
    const formattedDate = timeFormatter.weekdayAndTime(
      signup.gameDetails.startTime
    )

    return (
      <li key={signup.gameDetails.gameId}>
        <Link to={`/games/${signup.gameDetails.gameId}`}>
          {formattedDate}: {signup.gameDetails.title} ({signup.priority})
        </Link>
      </li>
    )
  })

  return (
    <div className='my-signups-list'>
      <p>{t('signedGames')}</p>
      <ul>
        {signedGames.length === 0 && <span>{t('noSignedGames')}</span>}
        {GamesList}
      </ul>
    </div>
  )
}

export default MySignupsList
