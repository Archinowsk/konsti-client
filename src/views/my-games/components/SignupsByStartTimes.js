/* @flow */
import React from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import timeFormatter from 'utils/timeFormatter'
import type { Signup, EmptySignup } from 'flow/user.flow'
import type { StatelessFunctionalComponent } from 'react'

type Props = {|
  signups: $ReadOnlyArray<Signup | EmptySignup>,
  startTimes: $ReadOnlyArray<string>,
|}

const SignupsByStartTimes: StatelessFunctionalComponent<Props> = (
  props: Props
) => {
  const { signups, startTimes } = props
  const { t } = useTranslation()

  const getGamesList = (startTime: string) => {
    return signups.map(signup => {
      if (signup.time === startTime) {
        if (!signup.gameDetails) {
          return (
            <p key={signup.time} className='game-details-list'>
              {t('noSignupResult')}
            </p>
          )
        } else {
          return (
            <p key={signup.gameDetails.gameId} className='game-details-list'>
              <Link to={`/games/${signup.gameDetails.gameId}`}>
                {signup.gameDetails.title}{' '}
                {signup.priority !== 0 && <span>({signup.priority})</span>}
              </Link>
            </p>
          )
        }
      }
    })
  }

  return startTimes.map(startTime => {
    return (
      <div key={startTime}>
        <p className='bold'>{timeFormatter.weekdayAndTime(startTime)}</p>
        {getGamesList(startTime)}
      </div>
    )
  })
}

export default SignupsByStartTimes
