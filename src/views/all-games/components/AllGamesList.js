/* @flow */
import React from 'react'
import { translate } from 'react-i18next'
import { Link } from 'react-router-dom'
import moment from 'moment'
import config from '/config'

type Props = {
  t: Function,
  games: Array<any>,
}

const AllGamesList = (props: Props) => {
  const { games, t } = props
  const { SIGNUP_OPEN_TIME, SIGNUP_END_TIME, CONVENTION_START_TIME } = config

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

    let signupStartTime = null
    // If signup time is before convention start time, show convention start time
    if (
      moment(game.startTime)
        .subtract(SIGNUP_OPEN_TIME, 'hours')
        .isBefore(moment(CONVENTION_START_TIME))
    ) {
      signupStartTime = moment(CONVENTION_START_TIME).format('HH:mm')
    } else {
      signupStartTime = moment(game.startTime)
        .subtract(SIGNUP_OPEN_TIME, 'hours')
        .format('HH:mm')
    }

    let signupEndTime = moment(game.startTime)
      .subtract(SIGNUP_END_TIME, 'minutes')
      .format('HH:mm')

    // First title
    if (index === 0) {
      signupEndTime = moment(game.startTime)
        .subtract(15, 'minutes')
        .format('HH:mm')

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
