import moment from 'moment'
import config from 'config'

const getStartTimes = games => {
  const startTimes = []

  for (let game of games) {
    startTimes.push(game.startTime)
  }

  const sortedTimes = [...new Set(startTimes)].sort()

  const signupOpenDuration = config.SIGNUP_OPEN_TIME
  const signupEndMinutes = config.SIGNUP_END_TIME

  let timeNow = moment()
  if (config.env === 'development' || config.staging === true) {
    timeNow = moment(config.CONVENTION_START_TIME)
      .add(1, 'hours')
      .add(40, 'minutes')
  }

  // console.log('timeNow', moment(timeNow).format())

  // 16:20 -> 17:00, 18:00, 19:00 20:00
  // 16:40 -> 18:00, 19:00, 20:00
  // 17:10 -> 18:00, 19:00, 20:00, 21:00

  const earliestSignupTime = moment(timeNow)
    .add(signupEndMinutes, 'minutes')
    .endOf('hour')

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

export default getStartTimes
