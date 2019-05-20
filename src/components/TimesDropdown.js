/* @flow */
import React from 'react'
import { useTranslation } from 'react-i18next'
import timeFormatter from 'utils/timeFormatter'
import type { Game } from 'flow/game.flow'
import type { StatelessFunctionalComponent } from 'react'

export type Props = {
  games: Array<Game>,
  onChange: Function,
  signupTime: string,
}

// TODO: Only enable next open signup
// Check current time and enable new timestamp
// Show "signup starts xx:xx" on others
// Toggle to show upcoming gameslots or all gameslots

const TimesDropdown: StatelessFunctionalComponent<Props> = (props: Props) => {
  const { games, onChange, signupTime } = props
  const { t } = useTranslation()

  const startTimes = []
  games.forEach(game => {
    startTimes.push(game.startTime)
  })

  const sortedTimes = [...new Set(startTimes)].sort()

  const times = sortedTimes.map(sortedTime => {
    const formattedDate = timeFormatter.weekdayAndTime(sortedTime)
    return (
      <option value={sortedTime} key={sortedTime}>
        {formattedDate}
      </option>
    )
  })

  return (
    <div className='times-dropdown'>
      <select onChange={onChange} value={signupTime}>
        <option value='2000-01-01T23:59:00.000Z'>
          {t('noSignupSelected')}
        </option>
        {times}
      </select>
    </div>
  )
}

export default TimesDropdown
