import React from 'react';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';
import { Link } from 'react-router-dom';
import moment from 'moment';

const MyFavoritesList = props => {
  const { favoritedGames, t } = props;

  // Sort games by time and name
  const sortedGames = favoritedGames.sort((a, b) => {
    const keyA = moment(a.date) + a.title;
    const keyB = moment(b.date) + b.title;
    if (keyA < keyB) return -1;
    if (keyA > keyB) return 1;
    return 0;
  });

  const GamesList = sortedGames.map(game => {
    const formattedDate = moment.utc(game.date).format('DD.M.YYYY HH:mm');

    return (
      <li key={game.id}>
        <Link to={`/games/${game.id}`}>
          {formattedDate}: {game.title}
        </Link>
      </li>
    );
  });

  return (
    <div>
      <p>
        {t('favoritedGames')}
      </p>
      <ul>
        {favoritedGames.length === 0 &&
          <span>
            {t('noFavoritedGames')}
          </span>}
        {GamesList}
      </ul>
    </div>
  );
};

MyFavoritesList.propTypes = {
  t: PropTypes.func.isRequired,
  favoritedGames: PropTypes.array.isRequired,
};

export default translate()(MyFavoritesList);
