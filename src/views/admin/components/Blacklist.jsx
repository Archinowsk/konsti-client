import React from 'react';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';
import { Link } from 'react-router-dom';

const Blacklist = props => {
  const { blacklistedGames, t } = props;

  // Sort games by name
  const sortedGames = blacklistedGames.sort((a, b) => {
    const keyA = a.title;
    const keyB = b.title;
    if (keyA < keyB) return -1;
    if (keyA > keyB) return 1;
    return 0;
  });

  const GamesList = sortedGames.map(game =>
    <li key={game.id}>
      <Link to={`/games/${game.id}`}>
        {game.title}
      </Link>
    </li>
  );

  return (
    <div>
      <p>
        {t('blacklistedGames')}
      </p>
      <ul>
        {GamesList}
      </ul>
    </div>
  );
};

Blacklist.propTypes = {
  t: PropTypes.func.isRequired,
  blacklistedGames: PropTypes.array.isRequired,
};

export default translate()(Blacklist);
