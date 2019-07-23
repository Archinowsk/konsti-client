/* @flow */
import moment from 'moment'
import { config } from 'config'
import { getStartTimes } from './getStartTimes'
import type { Game } from 'flow/game.flow'

export const getOpenStartTimes = (
  games: $ReadOnlyArray<Game>,
  testTime: string
) => {
  const startTimes = getStartTimes(games)

  const signupOpenDuration = config.SIGNUP_OPEN_TIME
  const signupEndMinutes = config.SIGNUP_END_TIME
  const conventionStartTime = config.CONVENTION_START_TIME

  let timeNow = moment()
  if (config.useTestTime) {
    timeNow = moment(testTime)
  }

  let earliestSignupTime = moment(timeNow)
    .add(signupEndMinutes, 'minutes')
    .endOf('hour')

  if (moment(earliestSignupTime).isBefore(moment(conventionStartTime))) {
    earliestSignupTime = moment(conventionStartTime)
  }

  const minutes = moment(timeNow).format('m')

  const lastSignupTime = moment(timeNow)
    .add(signupOpenDuration, 'hours')
    .subtract(minutes, 'minutes')
    .startOf('hour')

  const openSignupTimes = []
  for (const startTime of startTimes) {
    if (
      moment(startTime).isBetween(
        earliestSignupTime,
        lastSignupTime.add(1, 'minutes')
      )
    ) {
      openSignupTimes.push(startTime)
    }
  }

  return openSignupTimes
}
