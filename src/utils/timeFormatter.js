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
  let startTimeException = false

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

  const formattedTime = {
    signupStartTime: moment(signupStartTime).format('HH:mm'),
    startTimeException,
  }

  return formattedTime
}

const endTime = (startTime, customTime) => {
  let signupEndTime
  let endTimeException = false

  // Use custom signup end time
  if (customTime) {
    signupEndTime = moment(startTime).subtract(customTime, 'minutes')
  }
  // First signup will be open longer
  else if (
    moment(startTime)
      .subtract(1, 'hours')
      .isSame(moment(CONVENTION_START_TIME))
  ) {
    signupEndTime = moment(startTime).subtract(15, 'minutes')
    endTimeException = true
  }
  // Use default signup end time
  else {
    signupEndTime = moment(startTime).subtract(SIGNUP_END_TIME, 'minutes')
  }

  const formattedTime = {
    signupEndTime: moment(signupEndTime).format('HH:mm'),
    endTimeException,
  }

  return formattedTime
}

const weekdayAndTime = time => {
  return moment(time).format('dddd HH:mm')
}

const fullDate = time => {
  return moment(time).format('DD.M.YYYY HH:mm')
}

const timeOnly = time => {
  return moment(time).format('HH:mm')
}

const timeFormatter = { startTime, endTime, weekdayAndTime, fullDate, timeOnly }

export default timeFormatter
