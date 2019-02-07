/* @flow */
import React from 'react'
import { withTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import moment from 'moment'
import timeFormatter from 'utils/timeFormatter'
// import config from 'config'

type Props = {
  t: Function,
  enteredGames: Array<Object>,
  // signedGames: Array<Object>,
}

const MyEnteredList = (props: Props) => {
  const { enteredGames, /* signedGames, */ t } = props

  // TODO: Check for regression
  // Sort games by time and name
  const sortedGames = enteredGames.sort((a, b) => {
    const keyA = moment(a.details.startTime) + a.details.title.toLowerCase()
    const keyB = moment(b.details.startTime) + b.details.title.toLowerCase()
    if (keyA < keyB) return -1
    if (keyA > keyB) return 1
    return 0
  })

  const GamesList = sortedGames.map(game => {
    const formattedDate = timeFormatter.weekdayAndTime(game.details.startTime)
    return (
      <li key={game.id}>
        <Link to={`/games/${game.id}`}>
          {formattedDate}: {game.details.title}
        </Link>
      </li>
    )
  })

  // Check if user has signed games matching signup result time but no result
  // => user didn't get into any games
  /*
  const checkIfNoEntry = () => {
    let timeNow = moment()
    if (config.env === 'development' || config.staging) {
      timeNow = moment(config.TIME_NOW)
      console.log('set testing time', moment(timeNow).format())
    }

    const signupEndTime = moment(timeNow).subtract(config.SIGNUP_END_TIME)

    const enteredStartTimes = []
    enteredGames.forEach(enteredGame => {
      enteredStartTimes.push(enteredGame.time)
    })
    const sortedEnteredTimes = [...new Set(enteredStartTimes)].sort()

    console.log('sortedEnteredTimes', sortedEnteredTimes)

    const signedStartTimes = []
    signedGames.forEach(signedGame => {
      signedStartTimes.push(signedGame.time)
    })
    const sortedSignedTimes = [...new Set(signedStartTimes)].sort()

    console.log('sortedSignedTimes', sortedSignedTimes)

    let missedList = []
    for (let sortedSignedTime of sortedSignedTimes) {
      if (moment(sortedSignedTime).isBefore(signupEndTime)) {
        const timeFound = sortedEnteredTimes.find(time => {
          return time === sortedSignedTime
        })
        console.log('timeFound', timeFound)
        console.log(sortedSignedTime)
        if (!timeFound) {
          missedList.push(
            <p key={sortedSignedTime}>
              {t('noSignupResult')}{' '}
              {timeFormatter.weekdayAndTime(sortedSignedTime)}
            </p>
          )
        }
      }
    }
    return missedList
  }
  */

  // const missedList = checkIfNoEntry()

  return (
    <div className='my-entered-games'>
      <p>{t('enteredGames')}</p>
      <ul>
        {enteredGames.length === 0 && <span>{t('noEnteredGames')}</span>}
        {GamesList}
        <p>{t('noSignupResultHint')}</p>

        {/*
        {enteredGames.length === 0 &&
          missedList.length === 0 && <span>{t('noEnteredGames')}</span>}
        {missedList.length !== 0 && (
          <div>
            {missedList}
            <p>{t('noSignupResultHint')}</p>
          </div>
        )}
        {GamesList}
        */}
      </ul>
    </div>
  )
}

export default withTranslation()(MyEnteredList)
