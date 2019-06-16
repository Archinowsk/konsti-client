/* @flow */
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { submitSetTestTime } from 'views/admin/adminActions'
import timeFormatter from 'utils/timeFormatter'
import type { StatelessFunctionalComponent } from 'react'

export const TimeSelector: StatelessFunctionalComponent<{}> = () => {
  const testTime: string = useSelector(state => state.admin.testTime)

  const dispatch = useDispatch()

  const times = [
    '2018-07-27T12:00:00Z',
    '2018-07-27T13:00:00Z',
    '2018-07-27T14:00:00Z',
    '2018-07-27T15:00:00Z',
    '2018-07-27T16:00:00Z',
  ]

  dispatch(submitSetTestTime(times[0]))

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
        {timeFormatter.fullDate(time)}
      </button>
    )
  })

  return <div>{buttons}</div>
}
