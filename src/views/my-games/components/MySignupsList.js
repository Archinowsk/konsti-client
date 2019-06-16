/* @flow */
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import _ from 'lodash'
import timeFormatter from 'utils/timeFormatter'
import { getStartTimes } from 'utils/getStartTimes'
import type { Signup } from 'flow/user.flow'
import type { StatelessFunctionalComponent } from 'react'

type Props = {
  signedGames: $ReadOnlyArray<Signup>,
}

const MySignupsList: StatelessFunctionalComponent<Props> = (props: Props) => {
  const { signedGames } = props
  const { t } = useTranslation()

  const sortedSignups = _.sortBy(signedGames, [
    signedGame => signedGame.gameDetails.startTime,
    signedGame => signedGame.priority,
  ])

  const startTimes = getStartTimes(
    signedGames.map(signedGame => signedGame.gameDetails)
  )

  const getGamesList = (startTime: string) => {
    return sortedSignups.map(signup => {
      if (signup.gameDetails.startTime === startTime) {
        return (
          <p
            key={signup.gameDetails.gameId}
            className='my-signups-game-details'
          >
            <Link to={`/games/${signup.gameDetails.gameId}`}>
              {signup.gameDetails.title} ({signup.priority})
            </Link>
          </p>
        )
      }
    })
  }

  const GamesByStartTimes = startTimes.map(startTime => {
    return (
      <div key={startTime}>
        <p className='bold'>{timeFormatter.weekdayAndTime(startTime)}</p>
        {getGamesList(startTime)}
      </div>
    )
  })

  return (
    <div className='my-signups-list'>
      <h3>{t('signedGames')}</h3>
      <div className='my-signups-games'>
        {signedGames.length === 0 && <span>{t('noSignedGames')}</span>}
        {GamesByStartTimes}
      </div>
    </div>
  )
}

export default MySignupsList
