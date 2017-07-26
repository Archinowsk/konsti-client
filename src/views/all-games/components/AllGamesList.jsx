import React from 'react';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';
import { Link } from 'react-router-dom';
import moment from 'moment';

const AllGamesList = props => {
  const { games, t, blacklistedGames } = props;

  const visibleGames = [];
  // Remove hidden games
  for (let i = 0; i < games.length; i += 1) {
    let match = false;

    for (let j = 0; j < blacklistedGames.length; j += 1) {
      if (games[i].id === blacklistedGames[j].id) {
        match = true;
        break;
      }
    }
    if (!match) {
      visibleGames.push(games[i]);
    }
  }

  // Sort games by starting time and name
  const sortedGames = visibleGames.sort((a, b) => {
    const keyA = moment(a.date) + a.title;
    const keyB = moment(b.date) + b.title;
    if (keyA < keyB) return -1;
    if (keyA > keyB) return 1;
    return 0;
  });

  const GamesList = sortedGames.map((game, index, array) => {
    const formattedDate = moment.utc(game.date).format('DD.M.YYYY HH:mm');

    // First title
    if (index === 0) {
      return (
        <div key={game.id}>
          <p className="title">
            {formattedDate}
          </p>
          <p className="games-list">
            <Link to={`/games/${game.id}`}>
              {game.title}
            </Link>
          </p>
        </div>
      );
      // Set title if the previous starting time is diffenrent
    } else if (
      typeof array[index - 1] !== 'undefined' &&
      game.date !== array[index - 1].date
    ) {
      return (
        <div key={game.id}>
          <p className="title">
            {formattedDate}
          </p>
          <p className="games-list">
            <Link to={`/games/${game.id}`}>
              {game.title}
            </Link>
          </p>
        </div>
      );
    }
    // Don't set new title
    return (
      <div key={game.id}>
        <p className="games-list">
          <Link to={`/games/${game.id}`}>
            {game.title}
          </Link>
        </p>
      </div>
    );
  });

  return (
    <div>
      {GamesList}
    </div>
  );
};

AllGamesList.propTypes = {
  t: PropTypes.func.isRequired,
  games: PropTypes.array.isRequired,
  blacklistedGames: PropTypes.array.isRequired,
};

export default translate()(AllGamesList);
