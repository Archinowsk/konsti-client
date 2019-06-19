/* @flow */
import React from 'react'
import { useTranslation } from 'react-i18next'
import { timeFormatter } from 'utils/timeFormatter'
import type { StatelessFunctionalComponent } from 'react'

export type Props = {|
  onChange: Function,
  selectedTime: string,
  times: $ReadOnlyArray<string>,
|}

// TODO: Only enable next open signup
// Check current time and enable new timestamp
// Show "signup starts xx:xx" on others
// Toggle to show upcoming gameslots or all gameslots

export const TimesDropdown: StatelessFunctionalComponent<Props> = (
  props: Props
) => {
  const { times, onChange, selectedTime } = props
  const { t } = useTranslation()

  const sortedTimes = times.map(sortedTime => {
    const formattedDate = timeFormatter.weekdayAndTime(sortedTime)
    return (
      <option value={sortedTime} key={sortedTime}>
        {formattedDate}
      </option>
    )
  })

  return (
    <div className='times-dropdown'>
      <select onChange={onChange} value={selectedTime}>
        <option value='2000-01-01T23:59:00.000Z'>
          {t('noSignupSelected')}
        </option>
        {sortedTimes}
      </select>
    </div>
  )
}
