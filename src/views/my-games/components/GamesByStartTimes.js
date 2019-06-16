/* @flow */
import React from 'react'
import { Link } from 'react-router-dom'
import timeFormatter from 'utils/timeFormatter'
import type { Signup } from 'flow/user.flow'
import type { StatelessFunctionalComponent } from 'react'

type Props = {
  signups: $ReadOnlyArray<Signup>,
  startTimes: $ReadOnlyArray<string>,
}

const GamesByStartTimes: StatelessFunctionalComponent<Props> = (
  props: Props
) => {
  const { signups, startTimes } = props

  const getGamesList = (startTime: string) => {
    return signups.map(signup => {
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

  return startTimes.map(startTime => {
    return (
      <div key={startTime}>
        <p className='bold'>{timeFormatter.weekdayAndTime(startTime)}</p>
        {getGamesList(startTime)}
      </div>
    )
  })
}

export default GamesByStartTimes
