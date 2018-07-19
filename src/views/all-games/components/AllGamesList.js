/* @flow */
import React from 'react'
import { translate } from 'react-i18next'
import { Link } from 'react-router-dom'
import moment from 'moment'
import timeFormatter from 'utils/timeFormatter'

type Props = {
  t: Function,
  games: Array<any>,
}

const AllGamesList = (props: Props) => {
  const { games, t } = props

  // Sort games by starting time and name
  const sortedGames = games.sort((a, b) => {
    const keyA = moment(a.startTime) + a.title
    const keyB = moment(b.startTime) + b.title
    if (keyA < keyB) return -1
    if (keyA > keyB) return 1
    return 0
  })

  const GamesList = sortedGames.map((game, index, array) => {
    const formattedStartTime = moment(game.startTime).format('DD.M.YYYY HH:mm')

    const signupStartTime = timeFormatter.startTime(game.startTime)
    const signupEndTime = timeFormatter.endTime(game.startTime)

    // First title
    if (index === 0) {
      return (
        <div key={game.id}>
          <p className="title">
            {formattedStartTime} ({t('signupOpenBetween')} {signupStartTime}-{
              signupEndTime
            })
          </p>
          <p className="exception"> {t('exceptionInTime')}</p>
          <p className="games-list">
            <Link to={`/games/${game.id}`}>{game.title}</Link>
          </p>
        </div>
      )
      // Set title if the previous starting time is diffenrent
    } else if (
      typeof array[index - 1] !== 'undefined' &&
      game.startTime !== array[index - 1].startTime
    ) {
      return (
        <div key={game.id}>
          <p className="title">
            {formattedStartTime} ({t('signupOpenBetween')} {signupStartTime}-{
              signupEndTime
            })
          </p>
          <p className="games-list">
            <Link to={`/games/${game.id}`}>{game.title}</Link>
          </p>
        </div>
      )
    }
    // Don't set new title
    return (
      <div key={game.id}>
        <p className="games-list">
          <Link to={`/games/${game.id}`}>{game.title}</Link>
        </p>
      </div>
    )
  })

  return <div>{GamesList}</div>
}

export default translate()(AllGamesList)
