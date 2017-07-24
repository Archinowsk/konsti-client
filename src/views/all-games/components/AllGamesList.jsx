import React from 'react';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';
import { Link } from 'react-router-dom';

const AllGamesList = props => {
  const { games, t } = props;

  // const sortedGames = [];

  games.sort((a, b) => {
    const keyA = new Date(a.updated_at);
    const keyB = new Date(b.updated_at);
    // Compare the 2 dates
    if (keyA < keyB) return -1;
    if (keyA > keyB) return 1;
    return 0;
  });

  console.log(games);

  const GamesList = games.map(game =>
    <li key={game.id}>
      <Link to={`/games/${game.id}`}>
        {game.title}
      </Link>
    </li>
  );

  return (
    <div>
      <ul>
        {GamesList}
      </ul>
    </div>
  );
};

AllGamesList.propTypes = {
  t: PropTypes.func.isRequired,
  games: PropTypes.array.isRequired,
};

export default translate()(AllGamesList);
