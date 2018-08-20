import moment from 'moment'
import config from 'config'

const getOpenSignupTimes = games => {
  const startTimes = []

  for (let game of games) {
    startTimes.push(game.startTime)
  }

  const sortedTimes = [...new Set(startTimes)].sort()

  // console.log('sortedTimes', sortedTimes)

  const signupOpenDuration = config.SIGNUP_OPEN_TIME
  const signupEndMinutes = config.SIGNUP_END_TIME
  const conventionStartTime = config.CONVENTION_START_TIME

  let timeNow = moment()
  if (config.env === 'development' || config.staging) {
    timeNow = moment(config.TIME_NOW)
    console.log('set testing time: ', moment(timeNow).format())
  }

  // console.log(moment(timeNow).format())

  // console.log('timeNow', moment(timeNow).format())

  // 16:20 -> 17:00, 18:00, 19:00 20:00
  // 16:40 -> 18:00, 19:00, 20:00
  // 17:10 -> 18:00, 19:00, 20:00, 21:00

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

  // console.log('earliestSignupTime', moment(earliestSignupTime).format())
  // console.log('lastSignupTime', moment(lastSignupTime).format())

  const openSignupTimes = []
  for (let sortedTime of sortedTimes) {
    if (
      moment(sortedTime).isBetween(
        earliestSignupTime,
        lastSignupTime.add(1, 'minutes')
      )
    ) {
      // console.log(moment(sortedTime).format())
      openSignupTimes.push(sortedTime)
    }
  }

  return openSignupTimes
}

export default getOpenSignupTimes
