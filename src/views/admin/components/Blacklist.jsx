import React from 'react';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';
import { Link } from 'react-router-dom';

const Blacklist = props => {
  const { games, t } = props;

  const GamesList = games.map(game =>
    <li key={game.id}>
      <Link to={`/games/${game.id}`}>
        {game.title}
      </Link>
    </li>
  );

  return (
    <div>
      <p>Blacklisted games not visible on the app</p>
      <ul>
        {GamesList}
      </ul>
    </div>
  );
};

Blacklist.propTypes = {
  t: PropTypes.func.isRequired,
  games: PropTypes.array.isRequired,
};

export default translate()(Blacklist);
