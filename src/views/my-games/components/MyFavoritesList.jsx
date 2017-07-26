import React from 'react';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';
import { Link } from 'react-router-dom';

const MyFavoritesList = props => {
  const { favoritedGames, t } = props;

  const GamesList = favoritedGames.map(game =>
    <li key={game.id}>
      <Link to={`/games/${game.id}`}>
        {game.title}
      </Link>
    </li>
  );

  return (
    <div>
      <p>
        {t('favoritedGames')}
      </p>
      <ul>
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
