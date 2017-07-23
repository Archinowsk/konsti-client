import React from 'react';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';
import { Link } from 'react-router-dom';

const MySignupsList = props => {
  const { signedGames, t } = props;

  const GamesList = signedGames.map(game =>
    <li key={game.id}>
      <Link to={`/games/${game.id}`}>
        {game.title}
      </Link>
    </li>
  );

  return (
    <div>
      <p>
        {t('signedGames')}
      </p>
      <ul>
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
