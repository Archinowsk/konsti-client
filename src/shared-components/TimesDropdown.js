import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { translate } from 'react-i18next';

// TODO: Only enable next open signup
// Check current time and enable new timestamp
// Show "signup starts xx:xx" on others
// Toggle to show upcoming gameslots or all gameslots

const TimesDropdown = props => {
  const { games, t, onChange, date } = props;
  const startTimes = [];

  games.forEach(game => {
    startTimes.push(game.date);
  });

  const sortedTimes = [...new Set(startTimes)].sort();

  const times = sortedTimes.map(sortedTime => {
    const formattedDate = moment.utc(sortedTime).format('DD.M.YYYY HH:mm');
    return (
      <option value={sortedTime} key={sortedTime}>
        {formattedDate}
      </option>
    );
  });

  return (
    <div>
      <select onChange={onChange} value={date}>
        <option>
          {t('selectTime')}
        </option>
        <option value="2000-01-01T23:59:00.000Z">
          {t('noSignupSelected')}
        </option>
        {times}
      </select>
    </div>
  );
};

TimesDropdown.propTypes = {
  games: PropTypes.array.isRequired,
  t: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  date: PropTypes.string.isRequired,
};

export default translate()(TimesDropdown);
