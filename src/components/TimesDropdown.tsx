import React, { FunctionComponent, ReactElement } from 'react';
import { useTranslation } from 'react-i18next';
import { timeFormatter } from 'utils/timeFormatter';

export interface Props {
  onChange: any;
  selectedTime: string;
  times: readonly string[];
}

// TODO: Only enable next open signup
// Check current time and enable new timestamp
// Show "signup starts xx:xx" on others
// Toggle to show upcoming gameslots or all gameslots

export const TimesDropdown: FunctionComponent<Props> = (
  props: Props
): ReactElement<'div'> => {
  const { times, onChange, selectedTime } = props;
  const { t } = useTranslation();

  const sortedTimes = times.map(sortedTime => {
    const formattedDate = timeFormatter.weekdayAndTime({
      time: sortedTime,
      capitalize: true,
    });
    return (
      <option value={sortedTime} key={sortedTime}>
        {formattedDate}
      </option>
    );
  });

  return (
    <div className='times-dropdown'>
      <select onChange={onChange} value={selectedTime}>
        <option value=''>{t('noActiveTimeSelected')}</option>
        {sortedTimes}
      </select>
    </div>
  );
};
