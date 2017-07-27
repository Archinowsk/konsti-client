import React from 'react';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';
import { Link } from 'react-router-dom';
import moment from 'moment';

const MySignupsList = props => {
  const { signedGames, t } = props;

  // Sort games by time and name
  const sortedGames = signedGames.sort((a, b) => {
    const keyA = moment(a.date) + a.title;
    const keyB = moment(b.date) + b.title;
    if (keyA < keyB) return -1;
    if (keyA > keyB) return 1;
    return 0;
  });

  const GamesList = signedGames.map(game => {
    const formattedDate = moment.utc(game.date).format('DD.M.YYYY HH:mm');

    return (
      <li key={game.id}>
        <Link to={`/games/${game.id}`}>
          {formattedDate}: {game.title} ({game.priority})
        </Link>
      </li>
    );
  });

  return (
    <div>
      <p>
        {t('signedGames')}
      </p>
      <ul>
        {signedGames.length === 0 &&
          <span>
            {t('noSignedGames')}
          </span>}
        {GamesList}
      </ul>
    </div>
  );
};

MySignupsList.propTypes = {
  t: PropTypes.func.isRequired,
  signedGames: PropTypes.array.isRequired,
};

export default translate()(MySignupsList);
