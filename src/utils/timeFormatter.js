import moment from 'moment'
import config from 'config'

const {
  SIGNUP_OPEN_TIME,
  SIGNUP_END_TIME,
  CONVENTION_START_TIME,
  DAY_START_TIME,
} = config

const startTime = startTime => {
  let signupStartTime = null

  // Signup starts before convention
  if (
    moment(startTime)
      .subtract(SIGNUP_OPEN_TIME, 'hours')
      .isBefore(moment(CONVENTION_START_TIME))
  ) {
    signupStartTime = moment(CONVENTION_START_TIME)
  }
  // Set earliest signup hour for a day
  else if (
    moment(startTime)
      .subtract(SIGNUP_OPEN_TIME, 'hours')
      .isBefore(moment(startTime).hours(DAY_START_TIME))
  ) {
    signupStartTime = moment(startTime).hours(DAY_START_TIME)
  }
  // Don't modifty signup start time
  else {
    signupStartTime = moment(startTime).subtract(SIGNUP_OPEN_TIME, 'hours')
  }

  return moment(signupStartTime).format('HH:mm')
}

const endTime = (startTime, customTime) => {
  let signupEndTime
  // Use custom signup end time
  if (customTime) {
    signupEndTime = moment(startTime).subtract(customTime, 'minutes')
  }
  // Use default signup end time
  else {
    signupEndTime = moment(startTime).subtract(SIGNUP_END_TIME, 'minutes')
  }
  return moment(signupEndTime).format('HH:mm')
}

const timeFormatter = { startTime, endTime }

export default timeFormatter
