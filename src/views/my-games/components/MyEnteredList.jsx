import React from 'react';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';
import { Link } from 'react-router-dom';

const MyEnteredList = props => {
  const { enteredGames, t } = props;

  const GamesList = enteredGames.map(game =>
    <li key={game.id}>
      <Link to={`/games/${game.id}`}>
        {game.title}
      </Link>
    </li>
  );

  return (
    <div>
      <p>
        {t('enteredGames')}
      </p>
      <ul>
        {GamesList}
      </ul>
    </div>
  );
};

MyEnteredList.propTypes = {
  t: PropTypes.func.isRequired,
  enteredGames: PropTypes.array.isRequired,
};

export default translate()(MyEnteredList);
