/* @flow */
import moment from 'moment'
import { config } from 'config'
import type { Game } from 'flow/game.flow'
import type { Signup } from 'flow/user.flow'

export const getUpcomingGames = (
  games: $ReadOnlyArray<Game>,
  testTime: string
): $ReadOnlyArray<Game> => {
  const { useTestTime } = config
  const timeNow = useTestTime ? moment(testTime) : moment()

  const upcomingGames = games.filter(game =>
    moment(game.startTime).isAfter(timeNow)
  )

  return upcomingGames
}

export const getUpcomingSignedGames = (
  signedGames: $ReadOnlyArray<Signup>,
  testTime: string
): $ReadOnlyArray<Signup> => {
  const { useTestTime } = config
  const timeNow = useTestTime ? moment(testTime) : moment()

  // console.log('timeNow', timeNow.subtract(1, 'hours').format())
  const upcomingGames = signedGames.filter(signedGame => {
    // console.log('starttime', moment(signedGame.gameDetails.startTime).format())
    console.log('timenow', timeNow.format())
    return moment(signedGame.gameDetails.startTime)
      .add(1, 'hours')
      .isAfter(timeNow)
  })

  return upcomingGames
}

export const getUpcomingEnteredGames = (
  enteredGames: $ReadOnlyArray<Signup>,
  testTime: string
): $ReadOnlyArray<Signup> => {
  const { useTestTime } = config
  const timeNow = useTestTime ? moment(testTime) : moment()

  const upcomingGames = enteredGames.filter(enteredGame =>
    moment(enteredGame.gameDetails.startTime)
      .add(1, 'hours')
      .isAfter(timeNow)
  )

  return upcomingGames
}

export const getUpcomingFavorites = (
  favoritedGames: $ReadOnlyArray<Game>,
  testTime: string
): $ReadOnlyArray<Game> => {
  const { useTestTime } = config
  const timeNow = useTestTime ? moment(testTime) : moment()

  const upcomingGames = favoritedGames.filter(favoritedGame =>
    moment(favoritedGame.startTime)
      .add(1, 'hours')
      .isAfter(timeNow)
  )

  return upcomingGames
}
