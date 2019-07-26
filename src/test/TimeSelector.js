/* @flow */
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import _ from 'lodash'
import moment from 'moment'
import { submitSetTestTime } from 'views/admin/adminActions'
import { timeFormatter } from 'utils/timeFormatter'
import { config } from 'config'
import type { StatelessFunctionalComponent, Element } from 'react'

type Props = {}

export const TimeSelector: StatelessFunctionalComponent<Props> = (
  props: Props
): Element<'div'> => {
  const testTime: string = useSelector(state => state.admin.testTime)

  const dispatch = useDispatch()

  const { CONVENTION_START_TIME } = config
  const times = [
    moment(CONVENTION_START_TIME)
      .subtract(2, 'hours')
      .format(),
    moment(CONVENTION_START_TIME).format(),
    moment(CONVENTION_START_TIME)
      .add(45, 'minutes')
      .format(),
    moment(CONVENTION_START_TIME)
      .add(1, 'hours')
      .add(45, 'minutes')
      .format(),
    moment(CONVENTION_START_TIME)
      .add(2, 'hours')
      .add(45, 'minutes')
      .format(),
    moment(CONVENTION_START_TIME)
      .add(3, 'hours')
      .add(45, 'minutes')
      .format(),
    moment(CONVENTION_START_TIME)
      .add(5, 'hours')
      .add(45, 'minutes')
      .format(),
    moment(CONVENTION_START_TIME)
      .add(15, 'hours')
      .add(45, 'minutes')
      .format(),
    moment(CONVENTION_START_TIME)
      .add(16, 'hours')
      .add(45, 'minutes')
      .format(),
  ]

  React.useEffect(() => {
    if (!testTime) dispatch(submitSetTestTime(_.first(times)))
  })

  const setTestTime = event => {
    dispatch(submitSetTestTime(event.target.value))
  }

  const isActive = isActive => (isActive ? 'active' : '')

  const buttons = times.map(time => {
    return (
      <button
        key={time}
        value={time}
        onClick={setTestTime}
        className={`button-${time} ${isActive(time === testTime)}`}
        disabled={time === testTime}
      >
        {timeFormatter.dateAndTime(time)}
      </button>
    )
  })

  return <div className='time-selector'>{buttons}</div>
}
