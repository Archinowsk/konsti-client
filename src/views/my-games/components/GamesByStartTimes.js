/* @flow */
import React from 'react'
import { Link } from 'react-router-dom'
import { timeFormatter } from 'utils/timeFormatter'
import type { Game } from 'flow/game.flow'
import type { StatelessFunctionalComponent } from 'react'

type Props = {|
  games: $ReadOnlyArray<Game>,
  startTimes: $ReadOnlyArray<string>,
|}

export const GamesByStartTimes: StatelessFunctionalComponent<Props> = (
  props: Props
) => {
  const { games, startTimes } = props

  const getGamesList = (startTime: string) => {
    return games.map(game => {
      if (game.startTime === startTime) {
        return (
          <p key={game.gameId} className='game-details-list'>
            <Link to={`/games/${game.gameId}`}>{game.title} </Link>
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
